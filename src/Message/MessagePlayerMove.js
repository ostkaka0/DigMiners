
MessagePlayerMove = function(moveDirection) {
    this.moveDirection = moveDirection;
}

MessagePlayerMove.prototype.execute = function(gameData, player) {
    var physicsBody = gameData.entityWorld.objects[player.entityId].physicsBody;
    gameData.commands.push(new CommandEntityMove(player.entityId, this.moveDirection, physicsBody.pos[0], physicsBody.pos[1]));
}

MessagePlayerMove.prototype.send = function(socket) {
    socket.emit(this.idString, this.moveDirection);
}

MessagePlayerMove.prototype.receive = function(gameData, data) {
    this.moveDirection = data;
}
