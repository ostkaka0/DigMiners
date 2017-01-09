ObjectWorld = function(useDestroyFunc) {
    this.useDestroyFunc = useDestroyFunc;
    this.objectArray = [];
    this.objects = {};
    this.onAdd = {};
    this.onRemove = {};
}

ObjectWorld.prototype.add = function(object, id) {
    object.isActive = false;
    object.id = id;
    if (this.useDestroyFunc) {
        object.destroy = function() {
            Object.keys(this).forEach(function(key) {
                var component = this[key];
                if (!component || !component.destroy) return;
                component.destroy(this);
            }.bind(this));
        }.bind(object);
    }

    this.objects[object.id] = object;
    object.isActive = true;
    Object.keys(this.onAdd).forEach(function(key) {
        this.onAdd[key](object);
    }.bind(this));
    return object;
}

ObjectWorld.prototype.remove = function(object) {
    if (!object) return;
    this.removeById(object.id);
}

ObjectWorld.prototype.removeById = function(id) {
    var object = this.objects[id];
    if (!object) return;
    object.isActive = false;
    Object.keys(this.onRemove).forEach(function(key) {
        this.onRemove[key](object);
    }.bind(this));
    if (this.useDestroyFunc)
        object.destroy();
    delete this.objects[id];
}


ObjectWorld.prototype.update = function() {
    // Update this.objects
    this.objectArray.length = 0;
    for (var id in this.objects) {
        this.objectArray.push(this.objects[id]);
    }
}
