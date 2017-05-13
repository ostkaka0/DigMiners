
var SurvivalGenerator = function(seed) {
    if (!seed)
        seed = 0;
    this.seed = seed;
    this.noise = this.seed;
}

SurvivalGenerator.prototype.generate = function(chunk, chunkX, chunkY) {
    //TODO: optimize number of noise.seed calls.
    for (var yy = 0; yy < Chunk.dim; ++yy) {
        for (var xx = 0; xx < Chunk.dim; ++xx) {
            var x = xx + chunkX * Chunk.dim;
            var y = yy + chunkY * Chunk.dim;

            var distance = Math.sqrt(x * x + y * y);
            noise.seed(this.seed);
            var value = noise.perlin2(x / 20.0, y / 20.0);
            //value += distance / 40.0;
            var grassValue = value + distance / 40.0;
            if (grassValue < 1.0) {
                chunk.setTileId(xx, yy, Tiles.Grass.id);
                chunk.setDensity(xx, yy, 0);
                if (isServer) {
                    if ((value + distance / 80.0) < 0.201 && Math.random() <= 0.005) {
                        var treeEntityId = World.idList.next();
                        var tree = entityTemplateTree(treeEntityId, v2.create(x + 0.5, y + 0.5), Math.random() * Math.PI * 2);
                        sendCommand(new CommandEntitySpawn(tree, treeEntityId));
                    }
                }
            } else {
                chunk.setTileId(xx, yy, Tiles.Dirt.id);
                if (grassValue < 1.5)
                    continue;

                var value2 = value + distance / 200.0;

                if (value2 > 0.3) {
                    chunk.setTileId(xx, yy, 1);

                    noise.seed(this.seed + 1);
                    var oreValue1 = noise.perlin2(x / 8.0, y / 8.0);
                    noise.seed(this.seed + 331);
                    var oreValue2 = noise.perlin2(x / 4.0, y / 4.0);
                    noise.seed(this.seed + 71117);
                    var oreValue3 = noise.perlin2(x / 4.0, y / 4.0);

                    if (oreValue1 > 0.40)
                        chunk.setTileId(xx, yy, Tiles.Coal.id);
                    if (oreValue2 > 0.50)
                        chunk.setTileId(xx, yy, Tiles.Copper.id);
                    if (oreValue3 > 0.6)
                        chunk.setTileId(xx, yy, Tiles.Iron.id);
                }
            }
        }
    }
}

SurvivalGenerator.prototype.generateStructures = function() {

}
