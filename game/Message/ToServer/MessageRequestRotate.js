
MessageRequestRotate = function(direction) {
    this.direction = direction;
}

MessageRequestRotate.prototype.execute = function(gameData, player) {
    if (!this.direction) return;
    var entity = gameData.entityWorld.objects[player.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    var direction = v2.create(0, 0);
    v2.normalize(this.direction, direction);
    movement.rotationDirection = direction;
    sendCommand(new CommandEntityRotate(entity.id, direction));
}

MessageRequestRotate.prototype.send = function(socket) {
    socket.emit(this.idString, this.direction);
}

MessageRequestRotate.prototype.receive = function(gameData, data) {
    this.direction = data;
}
