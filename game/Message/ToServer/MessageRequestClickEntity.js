
MessageRequestClickEntity = function(entityId) {
    this.entityId = entityId;
}

MessageRequestClickEntity.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    console.log("player " + player.playerId + " clicked entity " + this.entityId);
}

MessageRequestClickEntity.prototype.send = function(socket) {
    socket.emit(this.idString, this.entityId);
}

MessageRequestClickEntity.prototype.receive = function(gameData, data) {
    this.entityId = data;
}
