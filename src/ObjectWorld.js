var ObjectWorld = function() {
    this.objectArray = [];
    this.objects = {};
    this.nextId = 1;
    this.freeIdList = [];
    this.objectsToCreate = [];
    this.objectsToDestroy = [];
}

ObjectWorld.prototype.add = function(object) {
    if (!object) object = {};
    object.isActive = false;
    if (this.freeIdList.length > 0)
        object.id = freeIdList.pop();
    else
        object.id = this.nextId++;
    this.objectsToCreate.push(object);
    return object;
}

ObjectWorld.prototype.remove = function(object) {
    this.objectsToDestroy.push(object);
}

ObjectWorld.prototype.update = function() {
    var that = this;
    // Destroy objects
    this.objectsToDestroy.forEach(function(object){
        delete that.objects[object.id];
        that.freeIdList.push(object.id);
        object.isActive = false;
    });
    this.objectsToDestroy.length = 0;

    // Create objects
    this.objectsToCreate.forEach(function(object){
        that.objects[object.id] = object;
        object.isActive = true;
    });
    this.objectsToCreate.length = 0;

    // Update this.objects
    this.objectArray.length = 0;
    for(var id in this.objects) {
        this.objectArray.push(this.objects[id]);
    }
}
