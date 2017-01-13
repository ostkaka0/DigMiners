

CommandEntityLookAtEntity = function(entityId, targetEntityId) {
    this.entityId = entityId;
    this.targetEntityId = targetEntityId;
}

CommandEntityLookAtEntity.prototype.execute = function() {
    var entity = gameData.entityWorld.objects[this.entityId];
    var targetEntity = gameData.entityWorld.objects[this.targetEntityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.entityLookTarget = targetEntity;
}

CommandEntityLookAtEntity.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.targetEntityId);
}

CommandEntityLookAtEntity.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.targetEntityId = deserializeInt32(byteArray, index);
}

CommandEntityLookAtEntity.prototype.getSerializationSize = function() {
    return 8;
}
