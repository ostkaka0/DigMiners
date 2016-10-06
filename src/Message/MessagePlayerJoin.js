
MessagePlayerJoin = function(player) {
    if(player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
        this.playerName = player.name;
    }
}

MessagePlayerJoin.prototype.execute = function(gameData) {
    console.log(this.playerName + " connected with playerId " + this.playerId);
    var player = entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData).player;
    player.setName(this.playerName, gameData);
}

MessagePlayerJoin.prototype.getSerializationSize = function() {
    return 8 + getUTF8SerializationSize(this.playerName);
}

MessagePlayerJoin.prototype.send = function(socket) {
    var byteArray = new Array(this.getSerializationSize());
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.playerName);
    socket.emit(this.idString, new Buffer(byteArray));
}

MessagePlayerJoin.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);
}
