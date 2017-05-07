
var SurvivalGenerator = function(seed) {
    if (!seed)
        seed = 0;
    this.seed = seed;
    this.noise = this.seed;
}

SurvivalGenerator.prototype.generate = function(chunk, chunkX, chunkY) {
    var grassBorder = Noise.betterRand(this.seed) * 20 + 15;
    for (var yy = 0; yy < Chunk.dim; ++yy) {
        for (var xx = 0; xx < Chunk.dim; ++xx) {
            var x = xx + chunkX * Chunk.dim;
            var y = yy + chunkY * Chunk.dim;

            var distance = Math.sqrt(x * x + y * y);
            if (distance < grassBorder) {
                chunk.setTileId(xx, yy, Tiles.Grass.id);
                chunk.setDensity(xx, yy, 0);
            } else
                chunk.setTileId(xx, yy, Tiles.Dirt.id);
        }
    }
}

SurvivalGenerator.prototype.generateStructures = function() {

}
