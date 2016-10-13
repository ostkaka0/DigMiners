
BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1,
    STRENGTH: 2
}

MessageSetBlock = function(x, y, id, type) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.type = type;
}

MessageSetBlock.prototype.execute = function(gameData) {
    //TODO: Support other types
    setForeground(gameData.blockWorld, this.x, this.y, this.id);
}

MessageSetBlock.prototype.getSerializationSize = function() {
    return 16;
}

MessageSetBlock.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.x);
    serializeInt32(byteArray, index, this.y);
    serializeInt32(byteArray, index, this.id);
    serializeInt32(byteArray, index, this.type);
    socket.emit(this.idString, byteArray);
}

MessageSetBlock.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();
    this.x = deserializeInt32(byteArray, index);
    this.y = deserializeInt32(byteArray, index);
    this.id = deserializeInt32(byteArray, index);
    this.type = deserializeInt32(byteArray, index);
}
