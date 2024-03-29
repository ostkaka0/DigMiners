
var MessageChunk = function(chunk, blockChunk, x, y) {
    this.chunk = chunk || new Chunk();
    this.blockChunk = blockChunk || new BlockChunk();
    this.blockChunkEmpty = true;
    this.x = x;
    this.y = y;
}
TypeRegister.add(RegisterMessage.ToClient, MessageChunk);

MessageChunk.prototype.execute = function() {
    if (World.generator)
        World.generator.generate(this.chunk, this.x, this.y);
    World.tiles.set([this.x, this.y], this.chunk);
    if (!this.blockChunkEmpty)
        World.blocks.set([this.x, this.y], this.blockChunk);
}

MessageChunk.prototype.send = function(socket) {
    var byteArray = [];
    var index = new IndexCounter();
    Serialize.int32(byteArray, index, this.x);
    Serialize.int32(byteArray, index, this.y);

    // Chunk
    var compressed = compressRLE(this.chunk.densityData);
    Serialize.int32(byteArray, index, compressed.length);
    Serialize.uint8Array(byteArray, index, compressed);

    // BlockChunk foreground
    compressed = compressRLE(this.blockChunk.foreground);
    Serialize.int32(byteArray, index, compressed.length);
    Serialize.uint8Array(byteArray, index, compressed);

    // BlockChunk background
    compressed = compressRLE(this.blockChunk.background);
    Serialize.int32(byteArray, index, compressed.length);
    Serialize.uint8Array(byteArray, index, compressed);

    // BlockChunk strength
    compressed = compressRLE(this.blockChunk.strength);
    Serialize.int32(byteArray, index, compressed.length);
    Serialize.uint8Array(byteArray, index, compressed);

    socket.emit(this.idString, new Buffer(byteArray));
}

MessageChunk.prototype.receive = function(data) {
    var byteArray = new Uint8Array(data);
    var index = new IndexCounter();
    this.x = Deserialize.int32(byteArray, index);
    this.y = Deserialize.int32(byteArray, index);

    // Chunk
    var length = Deserialize.int32(byteArray, index);
    decompressRLE(byteArray, this.chunk.densityData, index.value, index.value + length);
    index.add(length);

    // BlockChunk foreground
    length = Deserialize.int32(byteArray, index);
    if (length > 8)
        this.blockChunkEmpty = false;
    decompressRLE(byteArray, this.blockChunk.foreground, index.value, index.value + length);
    index.add(length);

    // BlockChunk background
    length = Deserialize.int32(byteArray, index);
    if (length > 8)
        this.blockChunkEmpty = false;
    decompressRLE(byteArray, this.blockChunk.background, index.value, index.value + length);
    index.add(length);

    // BlockChunk strength
    length = Deserialize.int32(byteArray, index);
    if (length > 8)
        this.blockChunkEmpty = false;
    decompressRLE(byteArray, this.blockChunk.strength, index.value, index.value + length);
    index.add(length);
}
