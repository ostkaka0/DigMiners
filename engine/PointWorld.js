
PointWorld = function(size) {
    this.size = size;
    this.quadtree = new Quadtree();
    this.nodeParents = [0]; // Find parent node from node
    this.nodeArrays = [null];
    this.idList = new IdList(0);
    // TODO: pointNodes // Get node from point
    this.posArray = [];
    this.radiusArray = [];
}

PointWorld.maxNodePoints = 4; // Max points per node / page

PointWorld.prototype.getRadius = function(pointId) {
    return this.radiusArray[pointId];
}

PointWorld.prototype.getPos = function(pointId) {
    return [this.posArray[2 * pointId + 0], this.posArray[2 * pointId + 1]];
}

PointWorld.prototype.add = function(pos, radius) {
    pointId = this.idList.next();
    this._expand(pointId);
    this.posArray[2 * pointId + 0] = pos[0];
    this.posArray[2 * pointId + 1] = pos[1];
    this.radiusArray[pointId] = radius;
    this._insertToTree(pos, radius, pointId);
    return pointId;
    
    /*var nodePos = [0, 0, 0];
    var node = 0;
    var nodeSize = this.size * 2;
    var localV2Pos = [pos[0] / 2.0 / this.size + 0.5, pos[1] / 2.0 / this.size + 0.5]
    
    while(true) {
        if (4 * radius > nodeSize) break;
        if (this.quadtree.isChild(node);
        
        var index = ((localV2Pos[0] < 0.5)? 0 : 1) + ((localV2Pos[1] < 0.5)? 0 : 2);
        var child = this.quadtree.array[node | index];
        if (!child) return;
        node = child;
        
        v2.mul(2, nodePos);
        nodeSize /= 2;
        
        var index = 0;
        if (index & 1) {
            index += 1;
            nodePos[0] += 1;
            localV2Pos[0] -= 0.5;
        }
        if (index & 2) {
            index += 2;
            nodePos[1] += 1;
            localV2Pos[1] -= 0.5;
        }
        v2.mul(2, localV2Pos, localV2Pos);
    }*/
    
}

PointWorld.prototype.remove = function(pointId) {
    this._eraseFromTree(pointId);
    this.idList.remove(pointId);
}

PointWorld.prototype.movePoint = function(pointId, pos, radius) {
    
}

PointWorld.prototype.findInRadius = function(pos, radius) {
    
}

PointWorld.prototype.searchNearest = function(pos, callback) {
    
}

PointWorld.prototype._expand = function(size) {
    while(this.radiusArray.length < size) {
        this.posArray.push(0);
        this.posArray.push(0);
        this.radiusArray.push(0);
    }
}

PointWorld.prototype._findNodeV2 = function(pos, radius, outNodePos) {
    var node = 0;
    var nodeSize = this.size * 2;
    var localV2Pos = [pos[0] / 2.0 / this.size + 0.5, pos[1] / 2.0 / this.size + 0.5]
    var nodePos = [0, 0, 0];
    
    while(true) {
        if (4 * radius > nodeSize) break;
        if (this.quadtree.isLeaf(node)) break;
        
        var index = ((localV2Pos[0] < 0.5)? 0 : 1) | ((localV2Pos[1] < 0.5)? 0 : 2);
        var child = this.quadtree.array[node | index];
        if (!child) return;
        node = child;
        nodeSize /= 2;
        nodePos = [2 * nodePos[0], 2 * nodePos[1], nodePos[2] + 1]
        
        if (index & 1) {
            localV2Pos[0] -= 0.5;
            nodePos[0]++;
        }
        if (index & 2) {
            localV2Pos[1] -= 0.5;
            nodePos[1]++;
        }
        v2.mul(2, localV2Pos, localV2Pos);
    }
    if (outNodePos != null) {
        outNodePos[0] = nodePos[0];
        outNodePos[1] = nodePos[1];
        outNodePos[2] = nodePos[2];
    }
    return node;
}

PointWorld.prototype._insertToTree = function(pos, radius, pointId) {
    var nodePos = [0, 0, 0];
    var node = this._findNodeV2(pos, radius, nodePos);
    var nodeArray = this.nodeArrays[node >> 2];
    
    console.log(nodePos);
    if (!nodeArray) {
        this.nodeArrays[node >> 2] = [pointId];
        return;
    }
    nodeArray.push(pointId);
    if (nodeArray.length > PointWorld.maxNodePoints && this.quadtree.isLeaf(node) && nodePos[2] < 32) {
        this.quadtree.insertChildren(node);
        while (this.nodeParents.length < this.quadtree.array.length >> 2) this.nodeParents.push(0);
        while (this.nodeArrays.length < this.quadtree.array.length >> 2) this.nodeArrays.push(null);
        for (var i = 0; i < 8; i++)
            this.nodeParents[this.quadtree.array[node | i] >> 2] = node;
        this.nodeArrays[node >> 2] = null;
        
        for (var i = 0; i < nodeArray.length; i++) {
            var otherPointId = nodeArray[i];
            var otherRadius = this.getRadius(otherPointId);
            var otherPos = this.getPos(otherPointId);
            this._insertToTree(otherPos, otherRadius, otherPointId);
        }
    }
}

PointWorld.prototype._countPoints = function(node) {
    var nodeArray = this.nodeArrays[node >> 2];
    var numPoints = (nodeArray)? nodeArray.length : 0;
    for (var i = 0; i < 4; i++) {
        var child = this.quadtree[node | i];
        if (child)
            numPoints += this._countPoints(child);
    }
    return numPoints;
}

PointWorld.prototype._mergeParent = function(childToMerge) {
    // Deny merge of root
    if (!childToMerge) return;
    var parent = this.nodeParents[childToMerge >> 2];
    if (!childToMerge) return
    
    var parentArray = this.nodeArrays[node >> 2];
    
    // Count the number of points, deny merge if too many
    var numPoints = this._countPoints(parent);
    if (numPoints > PointWorld.maxNodePoints) return;
    /*parentArray.length;
    if (numPoints > PointWorld.maxNodePoints) return;
    for (var i = 0; i < 4; i++) {
        var child = this.quadtree.array[parent | i];
        var childArray = this.nodeArrays[child >> 2];
        numPoints += childArray.length;
        if (numPoints > PointWorld.maxNodePoints) return;
    }*/
    
    // Actually merge the children
    var erasedNodes = [];
    this.quadtree.eraseChildren(parent, erasedNodes);
    for (var i = 0; i < erasedNodes.length; i++) {
        var node = erasedNodes[i];
        var nodeArray = this.nodeArrays[node >> 2];
        if (!nodeArray) continue;
        parentArray.concat(nodeArray);
        this.nodeArrays[node >> 2] = null;
    }
    
    // Merge grandParent
    this._merge(node);
}

PointWorld.prototype._eraseFromTree = function(pointId, pos, radius) {
    var node = this._findNodeV2(pos, radius);
    var nodeArray = this.nodeArrays[node >> 2];
    for (var i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i] != pointId) continue;
        nodeArray.splice(i, 1);
        // TODO: Merge parents, use this.nodeParents
        
        break;
    }
    this._mergeParent(node);
}

