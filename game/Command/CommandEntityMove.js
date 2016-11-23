
CommandEntityMove = function(entityId, direction, pos) {
    this.entityId = entityId;
    this.direction = direction;
    if (pos)
        this.pos = v2.cloneFix(pos);
}

CommandEntityMove.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    movement.direction = this.direction;
    movement.rotationDirection = this.direction;
    physicsBody.setPos([this.x, this.y]);
}

CommandEntityMove.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeV2(byteArray, index, this.direction);
    serializeV2(byteArray, index, this.pos);
}

CommandEntityMove.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.direction = deserializeV2(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
}

CommandEntityMove.prototype.getSerializationSize = function() {
    return 20;
}
