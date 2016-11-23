
CommandEntityRotate = function(entityId, direction) {
    this.entityId = entityId;
    this.direction = direction;
}

CommandEntityRotate.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.rotationDirection = this.direction;
}

CommandEntityRotate.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.direction);
}

CommandEntityRotate.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.direction = deserializeV2(byteArray, index);
}

CommandEntityRotate.prototype.getSerializationSize = function() {
    return 12;
}
