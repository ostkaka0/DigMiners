ObjectWorld = function () {
    this.objectArray = [];
    this.objects = {};
    this.objectsToCreate = [];
    this.objectsToDestroy = [];
    this.onRemove = null;
}

ObjectWorld.prototype.add = function (object, id) {
    object.isActive = false;
    object.id = id;

    this.objectsToCreate.push(object);
    return object;
}

ObjectWorld.prototype.remove = function (object) {
    this.objectsToDestroy.push(object);
}

ObjectWorld.prototype.update = function () {
    var that = this;
    // Destroy objects
    this.objectsToDestroy.forEach(function (object) {
        delete that.objects[object.id];
        object.isActive = false;
        if (that.onRemove)
            that.onRemove(object);
    });
    this.objectsToDestroy.length = 0;

    // Create objects
    this.objectsToCreate.forEach(function (object) {
        that.objects[object.id] = object;
        object.isActive = true;
    });
    this.objectsToCreate.length = 0;

    // Update this.objects
    this.objectArray.length = 0;
    for (var id in this.objects) {
        this.objectArray.push(this.objects[id]);
    }
}
