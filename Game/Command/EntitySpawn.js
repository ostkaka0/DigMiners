




var CommandEntitySpawn = function(entity, entityId, teamId) {
    this.entity = entity;
    this.entityId = entityId;
}
global.CommandEntitySpawn = CommandEntitySpawn;
TypeRegister.add(RegisterCommand, CommandEntitySpawn);

CommandEntitySpawn.prototype.execute = function() {
    if (World.entities.objects[this.entityId])
        World.entities.remove(World.entities.objects[this.entityId]);
    World.entities.add(this.entity, this.entityId);
}

CommandEntitySpawn.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.numComponents);
    Object.keys(this.entity).forEach(function(key) {
        var component = this.entity[key];
        if (!component || !component.serialize) return;
        Serialize.int32(byteArray, index, component.id);
        component.serialize(byteArray, index);
    }.bind(this));
}

CommandEntitySpawn.prototype.deserialize = function(byteArray, index) {
    var entityId = Deserialize.int32(byteArray, index);
    var numComponents = Deserialize.int32(byteArray, index);
    var entity = {};
    for (var i = 0; i < numComponents; ++i) {

        var componentId = Deserialize.int32(byteArray, index);
        var componentType = RegisterEntity[componentId];
        var componentName = componentType.prototype.name;
        entity[componentName] = new componentType();
        entity[componentName].deserialize(byteArray, index);
    }
    this.entityId = entityId;
    this.entity = entity;
}

CommandEntitySpawn.prototype.getSerializationSize = function() {
    var size = 8; // Entity-id, numComponents
    this.numComponents = 0;
    Object.keys(this.entity).forEach(function(component) {
        component = this.entity[component];
        if (!component || !component.serialize) return;
        size += 4 + component.getSerializationSize(); // component-id
        ++this.numComponents;
    }.bind(this));
    return size;
}
