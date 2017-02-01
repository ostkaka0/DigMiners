var Chunk = require("Engine/Chunk.js")
var BlockChunk = require("Engine/BlockChunk.js")

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Blocks = require("Game/Blocks.js")
var Tiles = require("Game/Blocks.js")

var noise = require("lib/perlin.js").noise;

var Generator = function(seed) {
    if (!seed)
        seed = 0;
    this.seed = seed;
    this.noise = this.seed;
    this.oreNoise1 = this.seed + 1;
    this.oreNoise2 = this.seed + 331;
    this.oreNoise3 = this.seed + 71117;
}
module.exports = Generator

Generator.prototype.generate = function(chunk, chunkX, chunkY) {
    for (var yy = 0; yy < Chunk.dim; ++yy) {
        for (var xx = 0; xx < Chunk.dim; ++xx) {
            var x = xx + chunkX * Chunk.dim;
            var y = yy + chunkY * Chunk.dim;

            var distance = Math.sqrt(x * x + y * y) / 200.0
            distance -= 0.25;

            noise.seed(this.seed);
            var value = noise.perlin2(x / 20.0, y / 20.0);
            value += distance;
            noise.seed(this.oreNoise1);
            var oreValue1 = noise.perlin2(x / 4.0, y / 4.0);
            noise.seed(this.oreNoise2);
            var oreValue2 = noise.perlin2(x / 4.0, y / 4.0);
            noise.seed(this.oreNoise3);
            var oreValue3 = noise.perlin2(x / 4.0, y / 4.0);

            var tileId = 0;

            if (value > 0.0)
                tileId = 1;

            if (value > 0.5)
                tileId = 2;

            if (value > 1.0)
                tileId = 3;

            /*if (tileId != 0) {
                if (oreValue1 > 0.45) {
                    tileId = Tiles.Coal.id;
                }
                if (oreValue2 > 0.50) {
                    tileId = Tiles.Copper.id;
                }
                if (oreValue3 > 0.25) {
                    tileId = Tiles.Iron.id;
                }
                if (oreValue3 < -0.25) {
                    tileId = Tiles.Apatite.id;
                }

            }*/

            chunk.setTileId(xx, yy, tileId);
        }
    }
}

Generator.prototype.generateDungeons = function(blockWorld, chunk, chunkX, chunkY) {
    var blockChunk = blockWorld.get(chunkX, chunkY);
    if (!blockChunk) {
        blockChunk = new BlockChunk();
        blockWorld.set(chunkX, chunkY, blockChunk);
    }

    var width = Math.floor(Math.random() * 15 + 5);
    var height = Math.floor(Math.random() * 10 + 5);
    var openingX = Math.floor(Math.random() * width);
    var openingY = (Math.random() < 0.5 ? 0 : height - 1);
    var tileId = 1;
    var backgroundTileId = 3;
    for (var yy = 0; yy < height; ++yy) {
        for (var xx = 0; xx < width; ++xx) {
            if (yy == 0 || yy == height - 1)
                blockChunk.setForeground(xx, yy, tileId);
            if (xx == 0 || xx == width - 1)
                blockChunk.setForeground(xx, yy, tileId);
            if (xx == openingX && yy == openingY)
                blockChunk.setForeground(xx, yy, Blocks.BlueForcefield.id);

            if (yy != 0 && yy != height - 1 && xx != 0 && xx != width - 1) {
                blockChunk.setBackground(xx, yy, backgroundTileId);
                chunk.setDensity(xx, yy, 0);
            }
        }
    }
}
