MessageChunk = function(chunk, blockChunk, x, y) {
    this.chunk = chunk || new Chunk();
    this.blockChunk = blockChunk || new BlockChunk();
    this.blockChunkEmpty = true;
    this.x = x;
    this.y = y;
}

MessageChunk.prototype.execute = function(gameData) {
    gameData.generator.generate(this.chunk, this.x, this.y);
    gameData.tileWorld.set(this.x, this.y, this.chunk);
    if(!this.blockChunkEmpty)
        gameData.blockWorld.set(this.x, this.y, this.blockChunk);
}

MessageChunk.prototype.send = function(socket) {
    var byteArray = [];
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.x);
    serializeInt32(byteArray, index, this.y);

    // Chunk
    var compressed = compressRLE(this.chunk.densityData);
    serializeInt32(byteArray, index, compressed.length);
    serializeUint8Array(byteArray, index, compressed);

    // BlockChunk foreground
    compressed = compressRLE(this.blockChunk.foreground);
    serializeInt32(byteArray, index, compressed.length);
    serializeUint8Array(byteArray, index, compressed);

    // BlockChunk background
    compressed = compressRLE(this.blockChunk.background);
    serializeInt32(byteArray, index, compressed.length);
    serializeUint8Array(byteArray, index, compressed);

    // BlockChunk strength
    compressed = compressRLE(this.blockChunk.strength);
    serializeInt32(byteArray, index, compressed.length);
    serializeUint8Array(byteArray, index, compressed);

    socket.emit(this.idString, new Buffer(byteArray));
}

MessageChunk.prototype.receive = function(gameData, data) {
    var byteArray = new Uint8Array(data);
    var index = new IndexCounter();
    this.x = deserializeInt32(byteArray, index);
    this.y = deserializeInt32(byteArray, index);

    // Chunk
    var length = deserializeInt32(byteArray, index);
    decompressRLE(byteArray, this.chunk.densityData, index.value, index.value + length);
    index.add(length);

    // BlockChunk foreground
    length = deserializeInt32(byteArray, index);
    if(length > 8)
        this.blockChunkEmpty = false;
    decompressRLE(byteArray, this.blockChunk.foreground, index.value, index.value + length);
    index.add(length);

    // BlockChunk background
    length = deserializeInt32(byteArray, index);
    if(length > 8)
        this.blockChunkEmpty = false;
    decompressRLE(byteArray, this.blockChunk.background, index.value, index.value + length);
    index.add(length);

    // BlockChunk strength
    length = deserializeInt32(byteArray, index);
    if(length > 8)
        this.blockChunkEmpty = false;
    decompressRLE(byteArray, this.blockChunk.strength, index.value, index.value + length);
    index.add(length);
}
