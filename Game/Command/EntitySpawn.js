




var CommandEntitySpawn = function(gameData, entity, entityId, templateId) {
    this.entity = entity;
    this.entityId = entityId;
    this.templateId = templateId;
}
global.CommandEntitySpawn = CommandEntitySpawn;
TypeRegister.add(RegisterCommand, CommandEntitySpawn);

CommandEntitySpawn.prototype.execute = function() {
    if (World.entities.objects[this.entityId])
        World.entities.remove(World.entities.objects[this.entityId]);
    World.entities.add(this.entity, this.entityId);
    console.log("Entity spawn:", this.entity);
}

CommandEntitySpawn.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.templateId);
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
    var templateId = Deserialize.int32(byteArray, index);
    var numComponents = Deserialize.int32(byteArray, index);
    var entity = new EntityTemplateRegister[templateId]();
    for (var i = 0; i < numComponents; ++i) {

        var componentId = Deserialize.int32(byteArray, index);
        var componentType = RegisterEntity[componentId];
        var componentName = componentType.prototype.name;
        if (!entity[componentName])
            entity[componentName] = new componentType();
        entity[componentName].deserialize(byteArray, index, gameData);
    }
    this.entityId = entityId;
    this.templateId = templateId;
    this.entity = entity;
}

CommandEntitySpawn.prototype.getSerializationSize = function() {
    var size = 12; // Entity-id, template-id, numComponents
    this.numComponents = 0;
    Object.keys(this.entity).forEach(function(component) {
        component = this.entity[component];
        if (!component || !component.serialize) return;
        size += 4 + component.getSerializationSize(); // component-id
        ++this.numComponents;
    }.bind(this));
    return size;
}
