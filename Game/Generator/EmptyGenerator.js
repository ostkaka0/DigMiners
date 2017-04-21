
var EmptyGenerator = function() {

}

EmptyGenerator.prototype.generate = function(chunk, chunkX, chunkY) {
    for (var yy = 0; yy < Chunk.dim; ++yy) {
        for (var xx = 0; xx < Chunk.dim; ++xx) {
            var x = xx + chunkX * Chunk.dim;
            var y = yy + chunkY * Chunk.dim;

            chunk.setTileId(xx, yy, 1);
            chunk.setDensity(xx, yy, 0);
        }
    }
}
