
MessageRequestSpawn = function(playerName) {
    this.playerName = playerName;
}

MessageRequestSpawn.prototype.execute = function(gameData, player) {
    if (player.entity != null && player.entityId != null) return;
    if (gameData.tickId - player.deathTick < 20 * 5) return;

    sendCommand(new CommandPlayerSpawn(player.id, gameData.idList.next(), this.playerName));
}

MessageRequestSpawn.prototype.send = function(socket) {
    socket.emit(this.idString, this.playerName);
}

MessageRequestSpawn.prototype.receive = function(gameData, data) {
    this.playerName = data;
}
