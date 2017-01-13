
MessageRequestRotate = function(deltaWorldCursorPos) {
    this.deltaWorldCursorPos = deltaWorldCursorPos;
    //this.direction = direction;
}

MessageRequestRotate.prototype.execute = function(gameData, player) {
    if (!this.deltaWorldCursorPos) return;
    if (player.entityId == null) return;
    var entity = gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    if (v2.length(this.deltaWorldCursorPos) < 0.1) return;
    
    // Calculate direction:
    var pos = entity.physicsBody.getPos();
    var direction = [0, 0];
    v2.normalize(this.deltaWorldCursorPos, direction);
    var diffLen = 2*v2.length(this.deltaWorldCursorPos);
    if (diffLen < 0.1) return;
    var armLength = 0.5; // The distance from origin to weapon
    var rotateAngle = Math.acos(Math.sqrt(diffLen*diffLen-armLength*armLength)/diffLen);
    direction = [Math.cos(rotateAngle) * direction[0] - Math.sin(rotateAngle) * direction[1], Math.cos(rotateAngle) * direction[1] + Math.sin(rotateAngle) * direction[0]];
    if (isNaN(direction[0]) ||  isNaN(direction[1])) return;
    
    movement.rotationDirection = direction;
    movement.deltaWorldCursorPos = this.deltaWorldCursorPos;
    sendCommand(new CommandEntityRotate(entity.id, direction));
}

MessageRequestRotate.prototype.send = function(socket) {
    if (v2.length(this.deltaWorldCursorPos) < 0.1) return;
    socket.emit(this.idString, this.deltaWorldCursorPos);
}

MessageRequestRotate.prototype.receive = function(gameData, data) {
    this.deltaWorldCursorPos = data;
}
