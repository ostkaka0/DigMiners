getForeground = function(blockWorld, x, y) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if (!blockChunk)
        return 0;

    return blockChunk.getForeground(localX, localY);
}

setForeground = function(blockWorld, x, y, value) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if (!blockChunk) {
        blockChunk = new BlockChunk();
        blockWorld.set(blockChunkX, blockChunkY, blockChunk);
    }
    blockChunk.setForeground(localX, localY, value);

    if (!value) {
        for (var x = 0; x < BLOCK_CHUNK_DIM; ++x) {
            for (var y = 0; y < BLOCK_CHUNK_DIM; ++y) {
                if (blockChunk.getForeground(x, y) || blockChunk.getBackground(x, y))
                    return;
            }
        }
        blockWorld.set(blockChunkX, blockChunkY, null);
    }

    if (!isServer) {
        if (localX == 0) {
            var otherChunk = blockWorld.get(blockChunkX - 1, blockChunkY);
            if (otherChunk)
                otherChunk.isChanged = true;
        } else if (localX == BLOCK_CHUNK_DIM - 1) {
            var otherChunk = blockWorld.get(blockChunkX + 1, blockChunkY);
            if (otherChunk)
                otherChunk.isChanged = true;
        }
        if (localY == 0) {
            var otherChunk = blockWorld.get(blockChunkX, blockChunkY - 1);
            if (otherChunk)
                otherChunk.isChanged = true;
        } else if (localY == BLOCK_CHUNK_DIM - 1) {
            var otherChunk = blockWorld.get(blockChunkX, blockChunkY + 1);
            if (otherChunk)
                otherChunk.isChanged = true;
        }
    }

}

getBackground = function(blockWorld, x, y) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if (!blockChunk)
        return 0;

    return blockChunk.getBackground(localX, localY);
}

setBackground = function(blockWorld, x, y, value) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if (!blockChunk) {
        blockChunk = new BlockChunk();
        blockWorld.set(blockChunkX, blockChunkY, blockChunk);
    }
    blockChunk.setBackground(localX, localY, value);

    if (!value) {
        for (var x = 0; x < BLOCK_CHUNK_DIM; ++x) {
            for (var y = 0; y < BLOCK_CHUNK_DIM; ++y) {
                if (blockChunk.getForeground(x, y) || blockChunk.getBackground(x, y))
                    return;
            }
        }
        blockWorld.set(blockChunkX, blockChunkY, null);
    }
}

getStrength = function(blockWorld, x, y) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if (!blockChunk)
        return 0;

    return blockChunk.getStrength(localX, localY);
}

setStrength = function(blockWorld, x, y, value) {
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;

    var blockChunk = blockWorld.get(blockChunkX, blockChunkY);
    if (!blockChunk) {
        blockChunk = new BlockChunk();
        blockWorld.set(blockChunkX, blockChunkY, blockChunk);
    }
    blockChunk.setStrength(localX, localY, value);
}


