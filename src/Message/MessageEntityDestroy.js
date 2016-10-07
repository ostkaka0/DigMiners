
MessageEntityDestroy = function(entityId) {
    this.entityId = entityId;
}

MessageEntityDestroy.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(entity.drawable)
        entity.drawable.remove();
    if(entity.drawable)
        entity.drawable.remove(entity.bodyparts.bodyparts);
    gameData.entityWorld.remove(entity);
}

MessageEntityDestroy.prototype.getSerializationSize = function() {
    return 4;
}

MessageEntityDestroy.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.entityId);
    socket.emit(this.idString, byteArray);
}

MessageEntityDestroy.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();
    this.entityId = deserializeInt32(byteArray, index);
}
