MessageInit = function(player) {
    if(player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
        this.playerName = player.name;
    }
}

MessageInit.prototype.execute = function(gameData) {
    entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
}

MessageInit.prototype.send = function(socket) {
    socket.emit(this.idString, [this.playerId, this.entityId, this.playerName]);
}

MessageInit.prototype.receive = function(gameData, data) {
    this.playerId = data[0];
    this.entityId = data[1];
    this.playerName = data[2];
}
