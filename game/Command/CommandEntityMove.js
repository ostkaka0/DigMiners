
CommandEntityMove = function(entityId, direction, x, y) {
    this.entityId = entityId;
    this.direction = direction;
    this.x = x;
    this.y = y;
}

CommandEntityMove.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    movement.direction = this.direction;
    physicsBody.setPos([this.x, this.y]);
}

CommandEntityMove.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.direction);
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
}

CommandEntityMove.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.direction = deserializeV2(byteArray, index);
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
}

CommandEntityMove.prototype.getSerializationSize = function() {
    return 20;
}
