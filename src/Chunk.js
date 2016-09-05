Chunk = function(x, y, sizeX, sizeY) {
	this.tileData = new Uint8Array(sizeX * sizeY);
	this.densityData = new Uint8Array(sizeX * sizeY);
	this.x = x;
	this.y = y;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.isChanged = true;
	
	for(var y = 0; y < sizeY; ++y) {
		for (var x = 0; x < sizeX; ++x) {
			this.tileData[y*sizeX + x] = (x*2+x/16+y*2+y/16)%4;
			this.densityData[y*sizeX + x] = 255;
		}
	}
	
	this.tileData[4*sizeX + 4] = 1;
	
}
Chunk.prototype.getDensity = function(x, y) {
	return this.densityData[x+y*this.sizeX];
}

Chunk.prototype.setDensity = function(x, y, value) {
	this.densityData[x+y*this.sizeX] = value;
	this.isChanged = true;
}

Chunk.prototype.getTileId = function(x, y) {
	return this.tileData[x+y*this.sizeX];
}

Chunk.prototype.setTileId = function(x, y, value) {
	this.tileData[x+y*this.sizeX] = value;
	this.isChanged = true;
}
