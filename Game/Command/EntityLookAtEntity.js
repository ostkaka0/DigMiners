



var CommandEntityLookAtEntity = function(entityId, targetEntityId) {
    this.entityId = entityId;
    this.targetEntityId = targetEntityId;
}
global.CommandEntityLookAtEntity = CommandEntityLookAtEntity;
TypeRegister.add(RegisterCommand, CommandEntityLookAtEntity);

CommandEntityLookAtEntity.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    var targetEntity = World.entities.objects[this.targetEntityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.entityLookTarget = targetEntity;
}

CommandEntityLookAtEntity.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.targetEntityId);
}

CommandEntityLookAtEntity.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.targetEntityId = Deserialize.int32(byteArray, index);
}

CommandEntityLookAtEntity.prototype.getSerializationSize = function() {
    return 8;
}