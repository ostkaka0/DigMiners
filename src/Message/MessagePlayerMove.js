MessagePlayerMove = function(playerMoveDirection) {
    this.playerMoveDirection = playerMoveDirection;
}

MessagePlayerMove.prototype.execute = function(gameData, player) {
    gameData.commands.push(new CommandPlayerMove(player.id, this.playerMoveDirection));
    console.log("Playermove! " + this.playerMoveDirection);
}

MessagePlayerMove.prototype.send = function(socket) {
    socket.emit(this.idString, this.playerMoveDirection);
}

MessagePlayerMove.prototype.receive = function(gameData, data) {
    this.playerMoveDirection = data;
}
