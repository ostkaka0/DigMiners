var binarySearch = require("Engine/Core/BinarySearch.js")

module.exports = class {
    constructor(firstId) {
        this.firstId = firstId || 1;
        this.nextId = this.firstId;
        this.freeIdList = [];
    }

    next() {
        if (this.freeIdList.length > 0)
            return this.freeIdList.pop();
        else
            return this.nextId++;
    }

    remove(id) {
        this.freeIdList.push(id);
    }

    removeSorted(id) {
        var index = binarySearch(this.freeIdList, id, function(a, b) { return a - b; });
        this.freeIdList.splice(index, 0, id);
    }

    forEach(callback) {
        var freeId = this.freeIdList[0];
        if (freeId > this.freeIdList[this.freeIdList.length - 1])
            console.error("IdList must be sorted!");
        var freeIdIndex = 0;
        for (var id = this.firstId; id < this.nextId; id++) {
            if (id == freeId) {
                freeIdIndex++;
                freeId = this.freeIdList[freeIdIndex];
                continue;
            }
            callback(id);
        }
    }
}
