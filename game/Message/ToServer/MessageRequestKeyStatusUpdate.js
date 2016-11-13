
Keys = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
    SPACEBAR: 4
}

MessageRequestKeyStatusUpdate = function(key, pressed) {
    this.key = key;
    this.pressed = pressed;
}

MessageRequestKeyStatusUpdate.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[player.entityId];
    if (!entity) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    var movement = entity.movement;
    if (!movement) return;

    // Copy key statuses
    var keyStatuses = {};
    var keys = Object.keys(movement.keyStatuses);
    keys.forEach(function(key) {
        keyStatuses[key] = movement.keyStatuses[key];
    });
    // Apply this status update to the copy
    keyStatuses[this.key] = this.pressed;

    // Use copy to determine move direction
    var direction = v2.create(0, 0);
    if (keyStatuses[Keys.UP])
        direction[1] = 1.0;
    else if (keyStatuses[Keys.DOWN])
        direction[1] = -1.0;

    if (keyStatuses[Keys.RIGHT])
        direction[0] = 1.0;
    else if (keyStatuses[Keys.LEFT])
        direction[0] = -1.0;

    // Key status will be properly applied in CommandKeyStatusUpdate
    sendCommand(new CommandKeyStatusUpdate(player.entityId, this.key, this.pressed));
    sendCommand(new CommandEntityMove(player.entityId, direction, physicsBody.pos[0], physicsBody.pos[1]));
}

MessageRequestKeyStatusUpdate.prototype.send = function(socket) {
    socket.emit(this.idString, [this.key, this.pressed]);
}

MessageRequestKeyStatusUpdate.prototype.receive = function(gameData, data) {
    this.key = data[0];
    this.pressed = data[1];
}