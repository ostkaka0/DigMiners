
CommandKeyStatusUpdate = function(entityId, key, pressed) {
    this.entityId = entityId;
    this.key = key;
    this.pressed = pressed;
}

CommandKeyStatusUpdate.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.keyStatuses[this.key] = this.pressed;
}

CommandKeyStatusUpdate.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt8(byteArray, index, this.key);
    serializeInt8(byteArray, index, (this.pressed == true ? 1 : 0));
}

CommandKeyStatusUpdate.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.key = deserializeInt8(byteArray, index);
    var pressed = deserializeInt8(byteArray, index);
    pressed = (pressed == 1 ? true : false);
    this.pressed = pressed;
}

CommandKeyStatusUpdate.prototype.getSerializationSize = function() {
    return 6;
}
