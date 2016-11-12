
CommandEntitySpawn = function(gameData, entity, entityId) {
    this.entity = entity;
    this.entityId = entityId;
}

CommandEntitySpawn.prototype.execute = function(gameData) {
    if(gameData.entityWorld.objects[this.entityId])
        gameData.entityWorld.remove(gameData.entityWorld.objects[this.entityId]);
    gameData.entityWorld.add(this.entity, this.entityId);
}

CommandEntitySpawn.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.numComponents);
    forIn(this, this.entity, function(key) {
        var component = this.entity[key];
        if(!component.serialize) return;
        serializeInt32(byteArray, index, component.id);
        component.serialize(byteArray, index);
    });
}

CommandEntitySpawn.prototype.deserialize = function(byteArray, index) {
    var entityId = deserializeInt32(byteArray, index);
    var numComponents = deserializeInt32(byteArray, index);
    var entity = {};
    for(var i = 0; i < numComponents; ++i) {
        var componentId = deserializeInt32(byteArray, index);
        var ComponentType = gameData.componentTypes[componentId];
        var componentName = ComponentType.prototype.name;
        entity[componentName] = new ComponentType();
        entity[componentName].deserialize(byteArray, index, gameData);      
    }
    this.entityId = entityId;
    this.entity = entity;
}

CommandEntitySpawn.prototype.getSerializationSize = function() {
    var size = 8; // Entity-id, numComponents
    this.numComponents = 0;
    forIn(this, this.entity, function(component) {
        component = this.entity[component];
        if(!component.serialize) return;
        size += 4 + component.getSerializationSize(); // component-id
        ++this.numComponents;
    });
    //console.log("total size " + size);
    return size;
}