
CommandKeyStatusUpdate = function(entityId, key, pressed, pos) {
    this.entityId = entityId;
    this.key = key;
    this.pressed = pressed;
    this.pos = pos;
}

CommandKeyStatusUpdate.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.keyStatuses[this.key] = this.pressed;

    var direction = v2.create(0, 0);
    if (movement.keyStatuses[Keys.UP] && !movement.keyStatuses[Keys.DOWN])
        direction[1] += 1.0;
    else if (movement.keyStatuses[Keys.DOWN] && !movement.keyStatuses[Keys.UP])
        direction[1] -= 1.0;

    if (movement.keyStatuses[Keys.RIGHT] && !movement.keyStatuses[Keys.LEFT])
        direction[0] += 1.0;
    else if (movement.keyStatuses[Keys.LEFT] && !movement.keyStatuses[Keys.RIGHT])
        direction[0] -= 1.0;

    movement.direction = direction;
    movement.rotationDirection = direction;
    physicsBody.setPos(this.pos);
}

CommandKeyStatusUpdate.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt8(byteArray, index, this.key);
    serializeInt8(byteArray, index, (this.pressed == true ? 1 : 0));
    serializeV2(byteArray, index, this.pos);
}

CommandKeyStatusUpdate.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.key = deserializeInt8(byteArray, index);
    var pressed = deserializeInt8(byteArray, index);
    pressed = (pressed == 1 ? true : false);
    this.pressed = pressed;
    this.pos = deserializeV2(byteArray, index, this.pos);
}

CommandKeyStatusUpdate.prototype.getSerializationSize = function() {
    return 14;
}
