
MessageSpectate = function(entityId) {
    this.entityId = entityId;
}

MessageSpectate.prototype.execute = function(gameData) {
    global.spectateEntity = gameData.world.entityWorld.objects[this.entityId];
    gameData.world.events.trigger("spectate", global.spectateEntity);
}

MessageSpectate.prototype.send = function(socket) {
    var serializationSize = 4;
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    serializeInt32(byteArray, counter, this.entityId);
    socket.emit(this.idString, byteArray);
}

MessageSpectate.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    this.entityId = deserializeInt32(byteArray, counter);
}
