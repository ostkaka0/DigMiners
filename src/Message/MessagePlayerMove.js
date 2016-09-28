MessagePlayerMove = function(playerMoveDirection) {
    this.playerMoveDirection = playerMoveDirection;
}

MessagePlayerMove.prototype.execute = function(gameData, player) {
    var physicsBody = gameData.entityWorld.objects[player.entityId].physicsBody;
    gameData.commands.push(new CommandPlayerMove(player, this.playerMoveDirection, physicsBody.pos[0], physicsBody.pos[1]));
}

MessagePlayerMove.prototype.send = function(socket) {
    socket.emit(this.idString, this.playerMoveDirection);
}

MessagePlayerMove.prototype.receive = function(gameData, data) {
    this.playerMoveDirection = data;
}
