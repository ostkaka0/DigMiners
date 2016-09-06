var CHUNK_DIM = 30;
var CHUNK_SIZE = 30*30;

Chunk = function() {
	this.tileData = new Uint8Array(CHUNK_SIZE);
	this.densityData = new Uint8Array(CHUNK_SIZE);
    var isChanged = true;
	
	for(var y = 0; y < CHUNK_DIM; ++y) {
		for (var x = 0; x < CHUNK_DIM; ++x) {
			this.tileData[y*CHUNK_DIM + x] = (x*2+x/16+y*2+y/16)%4;
			this.densityData[y*CHUNK_DIM + x] = 255;
		}
	}
	
	this.tileData[4*CHUNK_DIM + 4] = 1;
	
}
Chunk.prototype.getDensity = function(x, y) {
	return this.densityData[x+y*CHUNK_DIM];
}

Chunk.prototype.setDensity = function(x, y, value) {
	this.densityData[x+y*CHUNK_DIM] = value;
	this.isChanged = true;
}

Chunk.prototype.getTileId = function(x, y) {
	return this.tileData[x+y*CHUNK_DIM];
}

Chunk.prototype.setTileId = function(x, y, value) {
	this.tileData[x+y*CHUNK_DIM] = value;
	this.isChanged = true;
}
