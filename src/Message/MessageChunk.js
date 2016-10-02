MessageChunk = function(chunk, chunkX, chunkY) {
    this.chunk = chunk || new Chunk();
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

MessageChunk.prototype.send = function(socket) {
    var beginTime = present();
    
    var byteArray = [];
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.chunkX);
    serializeInt32(byteArray, index, this.chunkY);
    compressRLE(this.chunk.densityData, byteArray);
    
    console.log("MessageChunk duration: " + (present() - beginTime) + " ms");
    beginTime = present();
    socket.emit(this.idString, new Buffer(byteArray));
    console.log("socket.emit of MessageChunk duration: " + (present() - beginTime) + " ms");
    
}

MessageChunk.prototype.receive = function(gameData, data) {
    var byteArray = new Uint8Array(data);
    var index = new IndexCounter();
    this.chunkX = deserializeInt32(byteArray, index);
    this.chunkY = deserializeInt32(byteArray, index);
    this.chunk.densityData = decompressRLE(byteArray, CHUNK_SIZE, index.value);
    //this.chunk.tileData = byteArray.slice(index.value + CHUNK_SIZE, index.value + 2*CHUNK_SIZE);
    console.log(this.chunk.tileData.byteLength);
}
