MessageChunk = function(chunk, chunkX, chunkY) {
    var chunk = chunk;
    if(!chunk)
        chunk = new Chunk();
    /*var chunkClone = JSON.parse(JSON.stringify(chunk));
    chunkClone.tileData.length = chunk.tileData.length;
    chunkClone.densityData.length = chunk.densityData.length;
    this.chunk = chunkClone;*/
    //TODO:CLONE!
    this.chunk = chunk;
    this.chunkX = chunkX;
    this.chunkY = chunkY;
}

MessageChunk.prototype.execute = function(gameData) {
    var tileWorld = gameData.tileWorld;
    if(!tileWorld) {
        console.error("Missing required gameData properties");
        return;
    }
    gameData.generator.generate(this.chunk, this.chunkX, this.chunkY);
    tileWorld.set(this.chunkX, this.chunkY, this.chunk);
}

MessageChunk.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.chunk.densityData.length);
    serializeUint8Array(byteArray, index, this.chunk.densityData);
    serializeInt32(byteArray, index, this.chunkX);
    serializeInt32(byteArray, index, this.chunkY);
}

MessageChunk.prototype.deserialize = function(byteArray, index) {
    var densityLength = deserializeInt32(byteArray, index);
    this.chunk.densityData = deserializeUint8Array(byteArray, index, densityLength);
    this.chunkX = deserializeInt32(byteArray, index);
    this.chunkY = deserializeInt32(byteArray, index);
}

MessageChunk.prototype.getSerializationSize = function() {
    return this.chunk.densityData.length + 12;
}

MessageChunk.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit(this.idString, byteArray);
}

MessageChunk.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
}
