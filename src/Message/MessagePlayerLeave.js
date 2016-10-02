
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

MessagePlayerLeave.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
}

MessagePlayerLeave.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
}

MessagePlayerLeave.prototype.getSerializationSize = function() {
    return 8;
}

MessagePlayerLeave.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit(this.idString, byteArray);
}

MessagePlayerLeave.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
}