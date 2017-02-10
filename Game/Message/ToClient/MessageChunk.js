import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import IndexCounter from "Engine/IndexCounter.js";
import Chunk from "Engine/Chunk.js";
import BlockChunk from "Engine/BlockChunk.js";
import {compressRLE} from "Engine/Compress.js";
import {decompressRLE} from "Engine/Compress.js";

import Global from "Game/Global.js";
import MessageRegister from "Game/Register/Message.js";;

var MessageChunk = function(chunk, blockChunk, x, y) {
    this.chunk = chunk || new Chunk();
    this.blockChunk = blockChunk || new BlockChunk();
    this.blockChunkEmpty = true;
    this.x = x;
    this.y = y;
}
export default MessageChunk;
MessageRegister.ToClient.push(MessageChunk);

MessageChunk.prototype.execute = function(gameData) {
    if (Global.gameData.world.generator)
        Global.gameData.world.generator.generate(this.chunk, this.x, this.y);
    Global.gameData.world.tileWorld.set([this.x, this.y], this.chunk);
    if (!this.blockChunkEmpty)
        Global.gameData.world.blockWorld.set([this.x, this.y], this.blockChunk);
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

MessageChunk.prototype.receive = function(gameData, data) {
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
