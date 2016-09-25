
MessagePlayerJoin = function(player) {
    if(player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
        this.playerName = player.name;
    }
}

MessagePlayerJoin.prototype.execute = function(gameData) {
    console.log(this.playerName + " connected with playerId " + this.playerId);
    entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
}

MessagePlayerJoin.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.playerName);
}

MessagePlayerJoin.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);
}

MessagePlayerJoin.prototype.getSerializationSize = function() {
    return 8 + getUTF8SerializationSize(this.playerName);
}

MessagePlayerJoin.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit(this.idString, byteArray);
}

MessagePlayerJoin.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
}