import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";


var Chunk = function() {
    this.tileData = new Uint8Array(Chunk.size);
    this.densityData = new Uint8Array(Chunk.size);
    var isChanged = true;

    for (var y = 0; y < Chunk.dim; ++y) {
        for (var x = 0; x < Chunk.dim; ++x) {
            this.tileData[y * Chunk.dim + x] = (x * 2 + x / 16 + y * 2 + y / 16) % 4;
            this.densityData[y * Chunk.dim + x] = 255;
        }
    }
}
export default Chunk;

Chunk.dim = 30;
Chunk.dim2 = Chunk.dim + 2;
Chunk.size = Chunk.dim * Chunk.dim;

Chunk.prototype.getDensity = function(x, y) {
    return this.densityData[x + y * Chunk.dim];
}

Chunk.prototype.setDensity = function(x, y, value) {
    this.densityData[x + y * Chunk.dim] = value;
    this.isChanged = true;
}

Chunk.prototype.getTileId = function(x, y) {
    return this.tileData[x + y * Chunk.dim];
}

Chunk.prototype.setTileId = function(x, y, value) {
    this.tileData[x + y * Chunk.dim] = value;
    this.isChanged = true;
}

Chunk.fromV2 = function(worldPos, outChunkPos, outLocalPos) {
    v2.div(worldPos, Chunk.dim, outChunkPos);
    v2.floor(outChunkPos, outChunkPos);
    if (!outLocalPos) return;
    chunkWorldPos = v2.clone(outChunkPos);
    v2.mul(Chunk.dim, chunkWorldPos, chunkWorldPos);
    v2.floor(worldPos, outLocalPos);
    v2.sub(outLocalPos, chunkWorldPos, outLocalPos);
}

Chunk.toV2 = function(outWorldPos, chunkPos, localPos) {
    v2.mul(Chunk.dim, chunkPos, outWorldPos);
    if (!localPos) return;
    v2.add(localPos, outWorldPos, outWorldPos);
}
