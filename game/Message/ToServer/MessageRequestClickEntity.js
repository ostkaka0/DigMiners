
MessageRequestClickEntity = function(entityId, clickType) {
    this.entityId = entityId;
    this.clickType = clickType;
}

MessageRequestClickEntity.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    console.log("player " + player.playerId + " clicked entity " + this.entityId + ", clicktype: " + this.clickType);
}

MessageRequestClickEntity.prototype.send = function(socket) {
    socket.emit(this.idString, [this.entityId, this.clickType]);
}

MessageRequestClickEntity.prototype.receive = function(gameData, data) {
    this.entityId = data[0];
    this.clickType = data[1];
}
