
MessageEntityDestroy = function(entityId) {
    this.entityId = entityId;
}

MessageEntityDestroy.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(entity.drawable)
        entity.drawable.remove();
    gameData.entityWorld.remove(entity);
}

MessageEntityDestroy.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
}

MessageEntityDestroy.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
}

MessageEntityDestroy.prototype.getSerializationSize = function() {
    return 4;
}

MessageEntityDestroy.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit(this.idString, byteArray);
}

MessageEntityDestroy.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
}