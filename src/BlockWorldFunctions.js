getForeground = function(blockWorld, x, y) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if(!blockChunk)
        return 0;

    return blockChunk.getForeground(localX, localY);
}

setForeground = function(blockWorld, x, y, value) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if(!blockChunk) {
        blockChunk = new BlockChunk();
        blockWorld.set(blockChunkX, blockChunkY, blockChunk);
    }
    blockChunk.setForeground(localX, localY, value);
}
