
MessageChunk = function (chunk, chunkX, chunkY) {
    if (!chunk)
        chunk = new Chunk();
    /*var chunkClone = JSON.parse(JSON.stringify(chunk));
    chunkClone.tileData.length = chunk.tileData.length;
    chunkClone.densityData.length = chunk.densityData.length;
    this.chunk = chunkClone;*/
    //TODO:CLONE!
    if (chunk)
        this.chunk = chunk;
    this.chunkX = chunkX;
    this.chunkY = chunkY;
}

MessageChunk.prototype.execute = function (gameData) {
    var tileWorld = gameData.tileWorld;
    if (!tileWorld) {
        console.error("Missing required gameData properties");
        return;
    }
    tileWorld.set(this.chunkX, this.chunkY, this.chunk);
}

MessageChunk.prototype.serialize = function (byteArray, index) {
    serializeInt32(byteArray, index, this.chunk.densityData.length);
    serializeUint8Array(byteArray, index, this.chunk.densityData);
    serializeInt32(byteArray, index, this.chunk.tileData.length);
    serializeUint8Array(byteArray, index, this.chunk.tileData);
    serializeInt32(byteArray, index, this.chunkX);
    serializeInt32(byteArray, index, this.chunkX);
}

MessageChunk.prototype.deserialize = function (byteArray, index) {
    console.dir(byteArray);
    var densityLength = deserializeInt32(byteArray, index);
    this.chunk.densityData = deserializeUint8Array(byteArray, index, densityLength);
    var tileLength = deserializeInt32(byteArray, index);
    this.chunk.tileData = deserializeUint8Array(byteArray, index, tileLength);
    this.chunkX = deserializeInt32(byteArray, index);
    this.chunkY = deserializeInt32(byteArray, index);
}

MessageChunk.prototype.getSerializationSize = function () {
    return this.chunk.densityData.length + this.chunk.tileData.length + 16;
}

MessageChunk.prototype.send = function (socket) {
    var byteArray = new Uint8Array(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit("chunk", byteArray);
}

MessageChunk.receive = function (byteArray) {
    var message = new MessageChunk();
    var counter = new IndexCounter();
    message.deserialize(new Uint8Array(byteArray), counter);
    return message;
}