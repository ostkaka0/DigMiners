import Quadtree from "Engine/Quadtree.js";
import IdList from "Engine/IdList.js";
import v2 from "Engine/Core/v2.js";

var PointWorld = function(size) {
    this.size = size;
    this.quadtree = new Quadtree();
    this.nodeParents = [0]; // Find parent node from node
    this.nodeArrays = [null];
    this.idList = new IdList(0);
    // TODO: pointNodes // Get node from point
    this.posArray = [];
    this.radiusArray = [];
}
export default PointWorld;

PointWorld.maxNodePoints = 4; // Max points per node / page

PointWorld.prototype.getRadius = function(pointId) {
    return this.radiusArray[pointId];
}

PointWorld.prototype.getPos = function(pointId) {
    return [this.posArray[2 * pointId + 0], this.posArray[2 * pointId + 1]];
}

PointWorld.prototype.add = function(pos, radius) {
    var pointId = this.idList.next();
    this._expand(this.idList.nextId);
    this.posArray[2 * pointId + 0] = pos[0];
    this.posArray[2 * pointId + 1] = pos[1];
    this.radiusArray[pointId] = radius;
    this._insertToTree(pos, radius, pointId);
    return pointId;
}

PointWorld.prototype.remove = function(pointId) {
    this._eraseFromTree(pointId, this.getPos(pointId), this.getRadius(pointId));
    this.idList.removeSorted(pointId);
}

PointWorld.prototype.movePoint = function(pointId, pos, radius) {
    this._eraseFromTree(pointId, this.getPos(pointId), this.getRadius(pointId));
    this.posArray[2 * pointId + 0] = pos[0];
    this.posArray[2 * pointId + 1] = pos[1];
    this.radiusArray[pointId] = radius;
    this._insertToTree(pos, radius, pointId);
}

PointWorld.prototype.forEach = function(callback) {
    this.idList.forEach(callback);
}

PointWorld.prototype.findInRadius = function(points, pos, radius, node = 0, nodePos = [0, 0, 0]) {
    var nodeArray = this.nodeArrays[node >> 2];
    if (nodeArray) {
        for (var i = 0; i < nodeArray.length; i++) {
            var pointId = nodeArray[i];
            var pointPos = this.getPos(pointId);
            var pointRadius = this.getRadius(pointId);
            var disSquared = v2.sqrDistance(pos, pointPos);
            if (disSquared < radius * radius + 2 * radius * pointRadius + pointRadius * pointRadius)
                points.push(pointId);
        }
    }

    for (var i = 0; i < 4; i++) {
        var child = this.quadtree.array[node | i];
        if (!child) return;

        var childPos = Quadtree.calcChildPos(nodePos, i);
        var scale = Math.pow(2, -childPos[2]);
        var delta = [this.size * (-1 + 2 * childPos[0] * scale), this.size * (-1 + 2 * childPos[1] * scale)];
        v2.sub(delta, pos, delta);
        delta = [Math.abs(delta[0] - 0.5) + 0.5, Math.abs(delta[1] - 0.5) + 0.5];
        var disSquared = v2.sqrLength(delta);
        var pointRadius = 2.0 * this.size  * scale;
        if (0.5*Math.sqrt(disSquared) > radius + pointRadius)//if (disSquared >= radius * radius + 2 * radius * pointRadius + pointRadius * pointRadius)
            continue;

        this.findInRadius(points, pos, radius, child, childPos);
    }
}

PointWorld.prototype._expand = function(size) {
    while(this.radiusArray.length < size) {
        this.posArray.push(0);
        this.posArray.push(0);
        this.radiusArray.push(0);
    }
}

PointWorld.prototype._findNodeV2 = function(refNodePos, node, pos, radius) {
    var nodeSize = this.size/2;
    var localV2Pos = [pos[0] / 2.0 / this.size + 0.5, pos[1] / 2.0 / this.size + 0.5]

    //var index = (((0.5 + otherPos[0] / 2 / this.size - nodePos[0]) * (1 << nodePos[2]) < 0.5)? 0 : 1) | (((0.5 + otherPos[1] / 2 / this.size - nodePos[1]) * (1 << nodePos[2]) < 0.5)? 0 : 2);

    while(true) {
        if (radius >= nodeSize) break;
        if (this.quadtree.isLeaf(node)) break;

        var index = ((localV2Pos[0] < 0.5)? 0 : 1) | ((localV2Pos[1] < 0.5)? 0 : 2);
        var child = this.quadtree.array[node | index];
        if (!child) return;
        node = child;
        nodeSize /= 2;
        refNodePos[0] *= 2;
        refNodePos[1] *= 2;
        refNodePos[2]++;

        if (index & 1) {
            localV2Pos[0] -= 0.5;
            refNodePos[0]++;
        }
        if (index & 2) {
            localV2Pos[1] -= 0.5;
            refNodePos[1]++;
        }
        v2.mul(2, localV2Pos, localV2Pos);
    }
    return node;
}

PointWorld.prototype._insertToTree = function(pos, radius, pointId) {
    var nodePos = [0, 0, 0];
    var node = this._findNodeV2(nodePos, 0, pos, radius);
    var nodeArray = this.nodeArrays[node >> 2];

    if (!nodeArray) {
        this.nodeArrays[node >> 2] = [pointId];
        return;
    }
    nodeArray.push(pointId);

    ////////////////////////////////////////////////////////
    // Split node:
    ////////////////////////////////////////////////////////

    // Deny split
    if (nodeArray.length <= PointWorld.maxNodePoints || this.quadtree.isBranch(node) || nodePos[2] == 32)
        return;

    // Deny split when too large
    var nodeSize = this.size / 2 * Math.pow(2, -nodePos[2]);
    for (var i = 0; true; i++) {
        if (i == nodeArray.length) return; // Don't split
        var radius = this.getRadius(nodeArray[i]);
        if (radius < nodeSize) break; // Split
    }

    // Split:
    this.quadtree.insertChildren(node);
    while (this.nodeParents.length < (this.quadtree.array.length >> 2)) this.nodeParents.push(0);
    while (this.nodeArrays.length < (this.quadtree.array.length >> 2)) this.nodeArrays.push(null);
    for (var i = 0; i < 4; i++)
        this.nodeParents[this.quadtree.array[node | i] >> 2] = node;
    this.nodeArrays[node >> 2] = null;

    for (var i = 0; i < nodeArray.length; i++) {
        var otherPointId = nodeArray[i];
        var otherRadius = this.getRadius(otherPointId);
        var otherPos = this.getPos(otherPointId);
        this._insertToTree(otherPos, otherRadius, otherPointId);
    }
}

/*PointWorld.prototype._countPoints = function(node) {
    var nodeArray = this.nodeArrays[node >> 2];
    var numPoints = (nodeArray)? nodeArray.length : 0;
    for (var i = 0; i < 4; i++) {
        var child = this.quadtree[node | i];
        if (child)
            numPoints += this._countPoints(child);
    }
    return numPoints;
}*/

PointWorld.prototype._mergeParent = function(childToMerge) {
    // Deny merge of root
    if (!childToMerge) return;

    var parent = this.nodeParents[childToMerge >> 2];

    // Deny merge of grandparents, only parents should merge
    for (var i = 0; i < 4; i++) {
        if (this.quadtree.isBranch(this.quadtree.array[parent | i]) && !this.quadtree.array[this.quadtree.array[parent | i]])
            console.error("Something WEIRD");
        if (this.quadtree.isBranch(this.quadtree.array[parent | i]))
            return;

    }

    // Count the number of points, deny merge when too many
    var parentArray = this.nodeArrays[parent >> 2];
    var numPoints = (parentArray)? parentArray.length : 0;
    //if (numPoints > PointWorld.maxNodePoints) return;
    for (var i = 0; i < 4; i++) {
        var child = this.quadtree.array[parent | i];
        var childArray = this.nodeArrays[child >> 2];
        if (!childArray || childArray.length == 0) continue;
        numPoints += childArray.length;
        if (numPoints > PointWorld.maxNodePoints) return;
    }

    // Finally merge the children
    for (var i = 0; i < 4; i++) {
        var child = this.quadtree.array[parent | i];
        var childArray = this.nodeArrays[child >> 2];
        if (!childArray) continue;
        if (parentArray == null)
            this.nodeArrays[parent >> 2] = childArray;
        else
            this.nodeArrays[parent >> 2] = parentArray.concat(childArray);
        parentArray = this.nodeArrays[parent >> 2];
        this.nodeArrays[child >> 2] = null;
    }
    this.quadtree.eraseChildren(parent);
    /*var erasedNodes = [];
    this.quadtree.eraseChildren(parent, erasedNodes);
    for (var i = 0; i < erasedNodes.length; i++) {
        var child = erasedNodes[i];
        var childArray = this.nodeArrays[child >> 2];
        if (!childArray) continue;
        if (parentArray == null)
            this.nodeArrays[parent >> 2] = childArray;
        else
            this.nodeArrays[parent >> 2] = parentArray.concat(childArray);
        parentArray = this.nodeArrays[parent >> 2];
        this.nodeArrays[child >> 2] = null;
    }*/

    // Merge grandParent
    this._mergeParent(parent);
}

PointWorld.prototype._eraseFromTree = function(pointId, pos, radius) {
    var nodePos = [0, 0, 0];
    var node = this._findNodeV2(nodePos, 0, pos, radius);
    var nodeArray = this.nodeArrays[node >> 2];
    if (nodeArray.length == 1) {
        this.nodeArrays[node >> 2] = null;
    } else {
        for (var i = 0; true; i++) {
            if (i == nodeArray.length)
                throw Error("Could not find node!!!");
            if (nodeArray[i] != pointId) continue;
            nodeArray.splice(i, 1);
            break;
        }
    }

    this._mergeParent(node);
}
