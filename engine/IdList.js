IdList = function(firstId) {
    this.nextId = firstId || 1;
    this.freeIdList = [];
}

IdList.prototype.next = function() {
    if (this.freeIdList.length > 0)
        return this.freeIdList.pop();
    else
        return ++this.nextId;
}

IdList.prototype.remove = function(id) {
    this.freeIdList.push(id);
}