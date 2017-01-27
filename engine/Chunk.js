CHUNK_DIM = 30;
CHUNK_DIM_2 = CHUNK_DIM + 2;
CHUNK_SIZE = 30 * 30;

var Chunk = function() {
    this.tileData = new Uint8Array(CHUNK_SIZE);
    this.densityData = new Uint8Array(CHUNK_SIZE);
    var isChanged = true;

    for (var y = 0; y < CHUNK_DIM; ++y) {
        for (var x = 0; x < CHUNK_DIM; ++x) {
            this.tileData[y * CHUNK_DIM + x] = (x * 2 + x / 16 + y * 2 + y / 16) % 4;
            this.densityData[y * CHUNK_DIM + x] = 255;
        }
    }
}
export default Chunk;

Chunk.dim = CHUNK_DIM;
Chunk.dim2 = CHUNK_DIM_2;
Chunk.size = CHUNK_SIZE;

Chunk.prototype.getDensity = function(x, y) {
    return this.densityData[x + y * CHUNK_DIM];
}

Chunk.prototype.setDensity = function(x, y, value) {
    this.densityData[x + y * CHUNK_DIM] = value;
    this.isChanged = true;
}

Chunk.prototype.getTileId = function(x, y) {
    return this.tileData[x + y * CHUNK_DIM];
}

Chunk.prototype.setTileId = function(x, y, value) {
    this.tileData[x + y * CHUNK_DIM] = value;
    this.isChanged = true;
}

v2WorldToChunk = function(worldPos, outChunkPos, outLocalPos) {
    v2.div(worldPos, CHUNK_DIM, outChunkPos);
    v2.floor(outChunkPos, outChunkPos);
    if (!outLocalPos) return;
    chunkWorldPos = v2.clone(outChunkPos);
    v2.mul(CHUNK_DIM, chunkWorldPos, chunkWorldPos);
    v2.floor(worldPos, outLocalPos);
    v2.sub(outLocalPos, chunkWorldPos, outLocalPos);
}

v2WorldFromChunk = function(outWorldPos, chunkPos, localPos) {
    v2.mul(CHUNK_DIM, chunkPos, outWorldPos);
    if (!localPos) return;
    v2.add(localPos, outWorldPos, outWorldPos);
}
