import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";

var BlockChunk = function() {
    this.foreground = new Uint8Array(BlockChunk.size);
    this.background = new Uint8Array(BlockChunk.size);
    this.strength = new Uint8Array(BlockChunk.size);
    var isChanged = true;
}
export default BlockChunk;

BlockChunk.dim = 30;
BlockChunk.size = BlockChunk.dim * BlockChunk.dim;

BlockChunk.prototype.getForeground = function(x, y) {
    return this.foreground[x + y * BlockChunk.dim];
}

BlockChunk.prototype.setForeground = function(x, y, value) {
    this.foreground[x + y * BlockChunk.dim] = value;
    this.setStrength(x, y, 255.0);
    this.isChanged = true;
}

BlockChunk.prototype.getBackground = function(x, y) {
    return this.background[x + y * BlockChunk.dim];
}

BlockChunk.prototype.setBackground = function(x, y, value) {
    this.background[x + y * BlockChunk.dim] = value;
    this.isChanged = true;
}

BlockChunk.prototype.getStrength = function(x, y) {
    return this.strength[x + y * BlockChunk.dim];
}

BlockChunk.prototype.setStrength = function(x, y, value) {
    this.strength[x + y * BlockChunk.dim] = value;
    this.isChanged = true;
}

BlockChunk.fromV2World = function(worldPos, outBlockChunkPos, outLocalPos) {
    v2.div(worldPos, BlockChunk.dim, outBlockChunkPos);
    v2.floor(outBlockChunkPos, outBlockChunkPos);
    if (!outLocalPos) return;
    var blockChunkWorldPos = v2.clone(outBlockChunkPos);
    v2.mul(BlockChunk.dim, blockChunkWorldPos, blockChunkWorldPos);
    v2.floor(worldPos, outLocalPos);
    v2.sub(outLocalPos, blockChunkWorldPos, outLocalPos);
}

BlockChunk.toV2World = function(outWorldPos, blockChunkPos, localPos) {
    v2.mul(BlockChunk.dim, blockChunkPos, outWorldPos);
    if (!localPos) return;
    v2.add(localPos, outWorldPos, outWorldPos);
}
