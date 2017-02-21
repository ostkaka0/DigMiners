import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Map2D from "Engine/Core/Map2D.js"
import Chunk from "Engine/Chunk.js";


import Config from "Game/Config.js";

export default class extends Map2D {
    constructor() {
        super();
        this.events = "TODO: EVENTS!";
    }

    getDensity([x, y]) {
        var chunkX = Math.floor(x / Chunk.dim);
        var chunkY = Math.floor(y / Chunk.dim);
        var localX = Math.floor(x) - chunkX * Chunk.dim;
        var localY = Math.floor(y) - chunkY * Chunk.dim;

        var chunk = this.get([chunkX, chunkY]);
        if (!chunk) {
            return 255;
        }

        return chunk.getDensity(localX, localY);
    }

    setDensity([x, y], density) {
        var chunkX = Math.floor(x / Chunk.dim);
        var chunkY = Math.floor(y / Chunk.dim);
        var localX = Math.floor(x) - chunkX * Chunk.dim;
        var localY = Math.floor(y) - chunkY * Chunk.dim;

        var chunk = this.get([chunkX, chunkY]);
        if (!chunk) return;
        chunk.setDensity(localX, localY, density);
    }

    getTileId([x, y]) {
        var chunkX = Math.floor(x / Chunk.dim);
        var chunkY = Math.floor(y / Chunk.dim);
        var localX = Math.floor(x) - chunkX * Chunk.dim;
        var localY = Math.floor(y) - chunkY * Chunk.dim;

        var chunk = this.get([chunkX, chunkY]);
        if (!chunk) return 0;

        return chunk.getTileId(localX, localY);
    }

    setTileId([x, y], value) {
        var chunkX = Math.floor(x / Chunk.dim);
        var chunkY = Math.floor(y / Chunk.dim);
        var localX = Math.floor(x) - chunkX * Chunk.dim;
        var localY = Math.floor(y) - chunkY * Chunk.dim;

        var chunk = this.get([chunkX, chunkY]);
        if (!chunk) {
            console.log("Cannot set tile on missing chunk!");
            return;
        }

        chunk.setTileId(localX, localY, value);
        //this.on("onChunkChange", chunkX, chunkY, chunk);
    }

    calcDensity([x, y]) {
        var x1 = Math.floor(x - 0.5);
        var y1 = Math.floor(y - 0.5);
        var x2 = x1 + 1;
        var y2 = y1 + 1;

        var fractX = x - 0.5 - x1;
        var fractY = y - 0.5 - y1;

        var a = [
            1.0 - fractX,
            1.0 - fractY,
            fractX,
            fractY
        ];
        var b = [
            this.getDensity([x1, y1]),
            this.getDensity([x2, y1]),
            this.getDensity([x1, y2]),
            this.getDensity([x2, y2])
        ];

        return a[0] * a[1] * b[0] +
            a[2] * a[1] * b[1] +
            a[0] * a[3] * b[2] +
            a[2] * a[3] * b[3];
    }

    calcDir([x, y]) {
        var epsilon = 0.1;
        var a = -this.calcDensity([x + epsilon, y + epsilon]);
        var b = -this.calcDensity([x - epsilon, y + epsilon]);
        var c = -this.calcDensity([x - epsilon, y - epsilon]);
        var d = -this.calcDensity([x + epsilon, y - epsilon]);

        var f = v2.create(+a, +a);
        var g = v2.create(-b, +b);
        var h = v2.create(-c, -c);
        var i = v2.create(+d, -d);

        var vec = v2.create(0, 0);
        v2.add(vec, f, vec);
        v2.add(vec, g, vec);
        v2.add(vec, h, vec);
        v2.add(vec, i, vec);
        v2.div(vec, 255.0, vec);

        return vec;
    }

    calcNormal([x, y]) {
        var vec = this.calcDir([x, y])
        if (v2.sqrLength(vec) > 0.0)
            v2.normalize(vec, vec);

        return vec;
    }

    carveCircle(tileRegister, [x, y], radius, digSpeed, maxHardness, onDensityChange) {
        if (digSpeed == undefined || digSpeed == null)
            digSpeed = 1.0;

        var dug = [];
        for (var i = 0; i < tileRegister.length; ++i)
            dug.push(0);

        var intR = parseInt(radius + 0.5);

        for (var yy = -4 * intR; yy < 4 * intR; ++yy) {
            for (var xx = -4 * intR; xx < 4 * intR; ++xx) {
                var tileX = Math.floor(x) + xx;
                var tileY = Math.floor(y) + yy;
                var xxx = x - 0.5 - tileX;//xx + x - parseInt(x);//Math.floor(x);
                var yyy = y - 0.5 - tileY;//yy + y - parseInt(y);//Math.floor(y);
                var dis = Math.sqrt(xxx * xxx + yyy * yyy);
                if (dis > radius)
                    continue;

                var oldDensity = this.getDensity([tileX, tileY]);
                var tileId = this.getTileId([tileX, tileY]);
                var tile = tileRegister[tileId];
                if (!tile) {
                    console.log("Tile is undefined! TileID: " + tileId);
                    continue;
                }

                if (maxHardness && tile.hardness > maxHardness)
                    continue;

                var fillStrength = Math.max(Math.min(radius - dis, 1.0) * digSpeed, 0.0) / tile.hardness;
                var newDensity = Math.max(oldDensity - parseInt(255.0 * fillStrength), 0);
                if (onDensityChange)
                    newDensity = onDensityChange([tileX, tileY], tile, oldDensity, newDensity);
                var densityDiff = oldDensity - newDensity;

                dug[tileId] += densityDiff;
                this.setDensity([tileX, tileY], newDensity, true);
            }
        }
        return dug;
    }
}
