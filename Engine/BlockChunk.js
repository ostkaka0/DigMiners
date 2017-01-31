var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")

var BLOCK_CHUNK_DIM = 30;
var BLOCK_CHUNK_SIZE = BLOCK_CHUNK_DIM * BLOCK_CHUNK_DIM;

var BlockChunk = function() {
    this.foreground = new Uint8Array(BLOCK_CHUNK_SIZE);
    this.background = new Uint8Array(BLOCK_CHUNK_SIZE);
    this.strength = new Uint8Array(BLOCK_CHUNK_SIZE);
    var isChanged = true;
}
module.exports = BlockChunk;

BlockChunk.dim = BLOCK_CHUNK_DIM;
BlockChunk.size = BLOCK_CHUNK_SIZE;

BlockChunk.prototype.getForeground = function(x, y) {
    return this.foreground[x + y * BLOCK_CHUNK_DIM];
}

BlockChunk.prototype.setForeground = function(x, y, value) {
    this.foreground[x + y * BLOCK_CHUNK_DIM] = value;
    this.setStrength(x, y, 255.0);
    this.isChanged = true;
}

BlockChunk.prototype.getBackground = function(x, y) {
    return this.background[x + y * BLOCK_CHUNK_DIM];
}

BlockChunk.prototype.setBackground = function(x, y, value) {
    this.background[x + y * BLOCK_CHUNK_DIM] = value;
    this.isChanged = true;
}

BlockChunk.prototype.getStrength = function(x, y) {
    return this.strength[x + y * BLOCK_CHUNK_DIM];
}

BlockChunk.prototype.setStrength = function(x, y, value) {
    this.strength[x + y * BLOCK_CHUNK_DIM] = value;
    this.isChanged = true;
}

BlockChunk.fromV2World = function(worldPos, outBlockChunkPos, outLocalPos) {
    v2.div(worldPos, BLOCK_CHUNK_DIM, outBlockChunkPos);
    v2.floor(outBlockChunkPos, outBlockChunkPos);
    if (!outLocalPos) return;
    var blockChunkWorldPos = v2.clone(outBlockChunkPos);
    v2.mul(BLOCK_CHUNK_DIM, blockChunkWorldPos, blockChunkWorldPos);
    v2.floor(worldPos, outLocalPos);
    v2.sub(outLocalPos, blockChunkWorldPos, outLocalPos);
}

BlockChunk.toV2World = function(outWorldPos, blockChunkPos, localPos) {
    v2.mul(BLOCK_CHUNK_DIM, blockChunkPos, outWorldPos);
    if (!localPos) return;
    v2.add(localPos, outWorldPos, outWorldPos);
}