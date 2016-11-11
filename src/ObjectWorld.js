ObjectWorld = function() {
    this.objectArray = [];
    this.objects = {};
    this.objectsToCreate = [];
    this.objectsToDestroy = [];
    this.onAdd = [];
    this.onRemove = [];
}

ObjectWorld.prototype.add = function(object, id) {
    object.isActive = false;
    object.id = id;
    object.destroy = function() {
        Object.keys(this).forEach(function(key) {
            var component = this[key];
            if (!component || !component.destroy) return;
            component.destroy(this);
        }.bind(this));
    }.bind(object);

    this.objects[object.id] = object;
    this.objectsToCreate.push(object);
    return object;
}

ObjectWorld.prototype.remove = function(object) {
    delete this.objects[object.id];
    this.objectsToDestroy.push(object);
}

ObjectWorld.prototype.update = function() {
    var that = this;
    // Destroy objects
    this.objectsToDestroy.forEach(function(object) {
        object.isActive = false;
        this.onRemove.forEach(function(func) {
            func(object);
        }.bind(this));
        object.destroy();
    }.bind(this));
    this.objectsToDestroy.length = 0;

    // Create objects
    this.objectsToCreate.forEach(function(object) {
        object.isActive = true;
        this.onAdd.forEach(function(func) {
            func(object);
        }.bind(this));
    }.bind(this));
    this.objectsToCreate.length = 0;

    // Update this.objects
    this.objectArray.length = 0;
    for (var id in this.objects) {
        this.objectArray.push(this.objects[id]);
    }
}
