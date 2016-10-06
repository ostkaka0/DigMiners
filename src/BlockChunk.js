BLOCK_CHUNK_DIM = 32;
BLOCK_CHUNK_SIZE = 32 * 32;

BlockChunk = function() {
    this.foreground = new Uint8Array(BLOCK_CHUNK_SIZE);
    this.background = new Uint8Array(BLOCK_CHUNK_SIZE);
    this.strength = new Uint8Array(BLOCK_CHUNK_SIZE);
    var isChanged = true;

    this.foreground[4 * CHUNK_DIM + 4] = 1;
}

BlockChunk.prototype.getForeground = function(x, y) {
    return this.foreground[x + y * CHUNK_DIM];
}

BlockChunk.prototype.setForeground = function(x, y, value) {
    this.foreground[x + y * CHUNK_DIM] = value;
    this.isChanged = true;
}

BlockChunk.prototype.getBackground = function(x, y) {
    return this.background[x + y * CHUNK_DIM];
}

BlockChunk.prototype.setBackground = function(x, y, value) {
    this.background[x + y * CHUNK_DIM] = value;
    this.isChanged = true;
}

BlockChunk.prototype.getStrength = function(x, y) {
    return this.strength[x + y * CHUNK_DIM];
}

BlockChunk.prototype.setStrength = function(x, y, value) {
    this.strength[x + y * CHUNK_DIM] = value;
    this.isChanged = true;
}
