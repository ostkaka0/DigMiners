var IdList = require("engine/IdList.js");

module.exports = class {
    constructor() {
        this.array = [0, 0, 0, 0];
        this.idList = new IdList(1);
    }

    static posToIndex(pos) {
         return ((pos[0] >> pos[2]) % 2) + 2 * ((pos[1] >> pos[2]) % 2);
    }

    static calcChildPos(pos, dir) {
        if (pos[2] >= 32 || pos[2] < 0)
            console.error("Invalid lod");
        if (dir < 0 || dir >= 4)
            console.error("Invalid branch direction");
        return [2 * pos[0] + (dir & 1), 2 * pos[1] + ((dir >> 1) & 1), pos[2] + 1];

    }

    static calcParentPos(pos) {
        if (pos[2] > 32 || pos[2] <= 0)
            console.error("Invalid lod");
        return [pos[0] >> 1, pos[1] >> 1, pos[2] - 1];
    }

    static posToV2(pos) {
        if (pos[2] > 32 || pos[2] < 0)
            console.error("Invalid lod");
        var scale = 1.0 / Math.pow(2, pos[2]);
        return [pos[0] * scale, pos[1] * scale];
    }

    isLeaf(node) {
        if (node >= this.array.length || node < 0)
            console.error("Invalid node");
        return !(this.array[node | 0] || this.array[node | 1] ||
                 this.array[node | 2] || this.array[node | 3]);
    }

    isBranch(node) {
        if (node >= this.array.length || node < 0)
            console.error("Invalid node");
        return (this.array[node | 0] && this.array[node | 1] &&
                this.array[node | 2] && this.array[node | 3]);
    }

    findNodeIndex(pos, node) {
        node = node || 0;
        if (pos[2] > 32 || pos[2] < 0)
            console.error("Invalid lod");
        if (node >= this.array.length || node < 0)
            console.error("Invalid node");
        if (pos[2] == 0) return -1;
        pos = [pos[0], pos[1], pos[2] - 1];

        var index = this.constructor.posToIndex(pos);
        var child = this.array[node | index];
        if (child == 0) return -1;
        if (child == node)
            console.error("Child equals parent");
        if (pos[2] == 0)
            return node | index;
        return this.findNodeIndex(pos, child);
    }

    findNode(pos, node) {
        if (pos[2] == 0) return node || 0;
        return this.array[this.findNodeIndex(pos, node)];
    }

    forEach(callback, pos, node) {
        pos = pos || [0, 0, 0];
        node = node || 0;
        callback(pos, node);
        for (var i = 0; i < 4; i++) {
            var child = this.array[node | i];
            if (child)
                this.forEach(callback, this.constructor.calcChildPos(pos, i), child);
        }
    }

    expand(size) {
        while(this.array.length < size)
            this.array.push(0);
    }

    eraseChildren(node, erasedNodes) {
        if (node >= this.array.length || node < 0 || node % 4 != 0)
            console.error("Invalild node");

        for (var i = 0; i < 4; i++) {
            var child = this.array[node | i];
            if (child == 0) continue;
            if (child == node) console.error("Child equals parent");
            if (erasedNodes)
                erasedNodes.push(child);
            this.idList.remove(child >> 2);
            this.array[node | i] = 0;
            this.eraseChildren(child, erasedNodes);
        }
    }

    eraseNode(nodeIndex, erasedNodes) {
        if (nodeIndex >= this.array.length || nodeIndex <= 0)
            console.error("Invalid node index");
        var node = this.array[nodeIndex];
        if (node >= this.array.length || node < 0 || node % 4 != 0)
            console.error("Invalid node");
        if ((node >> 2) == (nodeIndex >> 2))
            console.error("node equals nodeIndex");
        this.eraseChildren(node, erasedNodes);
        if (erasedNodes)
            erasedNodes.push(node);
        this.idList.remove(node / 4 >> 0);
        this.array[nodeIndex] = 0;
    }

    insertChildren(node, erasedNodes) {
        if (node >= this.array.length || node < 0 || node % 4 != 0)
            console.error("Invalid node");
        this.eraseChildren(node, erasedNodes);
        for (var i = 0; i < 4; i++) {
            var child = 4 * this.idList.next();
            this.expand(child + 4);
            if (child == node)
                console.error("Child equals parent");
            this.array[node | i] = child;
        }
    }

    insertNode(pos, node, erasedNodes) {
        pos = pos || [0, 0, 0];
        node = node || 0;
        if (node >= this.array.length || node < 0 || node % 4 != 0)
            console.error("Invalid node");
        if (pos[2] > 32 || pos[2] < 0)
            console.log("Invalid lod");

        if (pos[2] == 0) {
            this.eraseChildren(node, erasedNodes);
            return node;
        }
        pos = [pos[0], pos[1], pos[2] - 1];
        var index = this.constructor.posToIndex(pos);
        if (this.array[node | index] == 0) {
            var child = 4 * this.idList.next();
            this.expand(child + 4);
            if (child == node)
                console.error("Child equals parent");
            this.array[node | index] = child;
        }
        if (node == this.array[node | index])
            console.error("Child equals parent");
        return this.insertNode(pos, this.array[node | index], erasedNodes);
    }
} // class
