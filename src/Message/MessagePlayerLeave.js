
MessagePlayerLeave = function(player) {
    if(player) {
        this.playerId = player.id;
        console.log("playerleave " + this.playerId);
        this.entityId = player.entityId;
    }
}

MessagePlayerLeave.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = gameData.entityWorld.objects[this.entityId];
    console.log(player.name + " disconnected with playerId " + this.playerId);
    entity.drawable.remove();
    gameData.playerWorld.remove(player);
    gameData.entityWorld.remove(entity);
}

MessagePlayerLeave.prototype.getSerializationSize = function() {
    return 8;
}

MessagePlayerLeave.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    socket.emit(this.idString, byteArray);
}

MessagePlayerLeave.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
}
