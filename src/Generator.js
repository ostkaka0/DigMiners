Generator = function(seed) {
	this.seed = seed;
	this.noise = this.seed;
	this.oreNoise1 = this.seed+1;
	this.oreNoise2 = this.seed+331;
	this.oreNoise3 = this.seed+71117;
}

Generator.prototype.generate = function(chunk, chunkX, chunkY) {
	for (var yy = 0; yy < CHUNK_DIM; ++yy) {
		for (var xx = 0; xx < CHUNK_DIM; ++xx) {
			var x = xx+chunkX*CHUNK_DIM;
			var y = yy+chunkY*CHUNK_DIM;

			var distance = Math.sqrt(x * x + y * y)/200.0
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

			if (tileId != 0) {
				if (oreValue1 > 0.45) {
					tileId = 4;
				}
				if (oreValue2 > 0.50) {
					tileId = 5;
				}
				if (oreValue3 > 0.25) {
					tileId = 3;
				}
			}
				
			chunk.setTileId(xx, yy, tileId);
			if (value < -0.5)
				chunk.setDensity(xx, yy, 0);
		}
	}

    chunk.setDensity(4, 4, 0);
}
