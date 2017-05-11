
var SurvivalGenerator = function(seed) {
    if (!seed)
        seed = 0;
    this.seed = seed;
    this.noise = this.seed;
}

SurvivalGenerator.prototype.generate = function(chunk, chunkX, chunkY) {
    //var grassBorder = Noise.betterRand(this.seed) * 20 + 15;
    for (var yy = 0; yy < Chunk.dim; ++yy) {
        for (var xx = 0; xx < Chunk.dim; ++xx) {
            var x = xx + chunkX * Chunk.dim;
            var y = yy + chunkY * Chunk.dim;

            var distance = Math.sqrt(x * x + y * y);
            noise.seed(this.seed);
            var value = noise.perlin2(x / 20.0, y / 20.0);
            value += distance / 20.0;
            if (value < 2.0) {
                chunk.setTileId(xx, yy, Tiles.Grass.id);
                chunk.setDensity(xx, yy, 0);
                if (isServer) {
                    if (Math.random() * 1000 < 5) {
                        var treeEntityId = World.idList.next();
                        var tree = entityTemplateTree(treeEntityId, v2.create(x + 0.5, y + 0.5), Math.random() * Math.PI * 2);
                        sendCommand(new CommandEntitySpawn(gameData, tree, treeEntityId));
                    }
                }
            } else {
                chunk.setTileId(xx, yy, Tiles.Dirt.id);

                noise.seed(this.seed);
                var value = noise.perlin2(x / 20.0, y / 20.0);
                value += distance / 200.0;

                if (value > 0.3) {
                    chunk.setTileId(xx, yy, 1);
                }
            }
        }
    }
}

SurvivalGenerator.prototype.generateStructures = function() {

}
