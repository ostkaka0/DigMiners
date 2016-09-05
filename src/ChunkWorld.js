ChunkWorld = function(gl, chunkSize) {
	this.chunkSize = chunkSize;
	this.chunks = {};
}

ChunkWorld.prototype.getDensity = function(x, y) {
	var localX = x%this.chunkSize;
	var localY = y%this.chunkSize;
	var chunkX = (x-localX)/this.chunkSize;
	var chunkY = (y-localY)/this.chunkSize;
	
	// Fix indexing of negative values:
	if (x < 0) {
		chunkX--;
		localX = (x-chunkX*this.chunkSize)%this.chunkSize;
	}
	if (y < 0) {
		chunkY--;
		localY = (y-chunkY*this.chunkSize)%this.chunkSize;
	}
		
	var chunkPosString = chunkX + "," + chunkY;
	
	if (this.chunks[chunkPosString] == undefined) {
		return 255;
	}
	
	return this.chunks[chunkPosString].getDensity(localX, localY);
}

ChunkWorld.prototype.setDensity = function(x, y, value, createChunk) {
	if (typeof(createChunk)==='undefined') createChunk = false;

	var localX = x%this.chunkSize;
	var localY = y%this.chunkSize;
	var chunkX = (x-localX)/this.chunkSize;
	var chunkY = (y-localY)/this.chunkSize;
	var chunk = null;
	
	// Fix indexing of negative values:
	if (x < 0) {
		chunkX--;
		localX = (x-chunkX*this.chunkSize)%this.chunkSize;
	}
	if (y < 0) {
		chunkY--;
		localY = (y-chunkY*this.chunkSize)%this.chunkSize;
	}
		
	var chunkPosString = chunkX + "," + chunkY;
	
	if (this.chunks[chunkPosString] == undefined) {
		if (!createChunk)
			return;
	
		chunk = this.createChunk(chunkX, chunkY);
	}
	else {
		chunk = this.chunks[chunkPosString]
	}

	chunk.setDensity(localX, localY, value);

	this.on("onChunkChange", chunkX, chunkY, chunk);
	this.on("onDensityChange", x, y, value);
}

ChunkWorld.prototype.getTileId = function(x, y) {
	var localX = x%this.chunkSize;
	var localY = y%this.chunkSize;
	var chunkX = (x-localX)/this.chunkSize;
	var chunkY = (y-localY)/this.chunkSize;
	
	// Fix indexing of negative values:
	if (x < 0) {
		chunkX--;
		localX = (x-chunkX*this.chunkSize)%this.chunkSize;
	}
	if (y < 0) {
		chunkY--;
		localY = (y-chunkY*this.chunkSize)%this.chunkSize;
	}
		
	var chunkPosString = chunkX + "," + chunkY;
	
	if (this.chunks[chunkPosString] == undefined) {
		return 0;
	}
	
	return this.chunks[chunkPosString].getTileId(localX, localY);
}

ChunkWorld.prototype.setTileId = function(x, y, value, createChunk) {
	if (typeof(createChunk)==='undefined') createChunk = false;

	var localX = x%this.chunkSize;
	var localY = y%this.chunkSize;
	var chunkX = (x-localX)/this.chunkSize;
	var chunkY = (y-localY)/this.chunkSize;
	var chunk = null;
	
	// Fix indexing of negative values:
	if (x < 0) {
		chunkX--;
		localX = (x-chunkX*this.chunkSize)%this.chunkSize;
	}
	if (y < 0) {
		chunkY--;
		localY = (y-chunkY*this.chunkSize)%this.chunkSize;
	}
		
	var chunkPosString = chunkX + "," + chunkY;
	
	if (this.chunks[chunkPosString] == undefined) {
		if (!createChunk)
			return;
	
		chunk = this.createChunk(chunkX, chunkY);
	}
	else {
		chunk = this.chunks[chunkPosString];
	}
	
	chunk.setTileId(localX, localY, value);

	this.on("onChunkChange", chunkX, chunkY, chunk);
}

ChunkWorld.prototype.getChunk = function(chunkX, chunkY) {
	var chunkPosString = chunkX + "," + chunkY;
	return this.chunks[chunkPosString];
}


ChunkWorld.prototype.createChunk = function(chunkX, chunkY, tileData, densityData, force) {
	var chunkPosString = chunkX + "," + chunkY;

	if (!force && this.chunks[chunkPosString])
		return null;

	var chunk = new Chunk(this, chunkX, chunkY, this.chunkSize, this.chunkSize, tileData, densityData);
	
	this.generator.generate(chunk);
	
	if(tileData)
		chunk.tileData = tileData;
		
	if(densityData)
		chunk.densityData = densityData;
	
	this.chunks[chunkPosString] = chunk;
	
	this.on("onChunkCreate", chunkX, chunkY, chunk);
	this.on("onChunkChange", chunkX, chunkY, chunk);
	
	return chunk;
}


ChunkWorld.prototype.calcDensity = function(x, y) {
	var x1 = Math.floor(x);
	var y1 = Math.floor(y);
	var x2 = x1 + 1;
	var y2 = y1 + 1;
		
	var fractX = x - x1;
	var fractY = y - y1;
	
	var a = [
		1.0 - fractX,
		1.0 - fractY,
		fractX,
		fractY
	];
	var b = [
		this.getDensity(x1, y1),
		this.getDensity(x2, y1),
		this.getDensity(x1, y2),
		this.getDensity(x2, y2)
	];
	
	return a[0] * a[1] * b [0] +
		   a[2] * a[1] * b [1] +
		   a[0] * a[3] * b [2] +
		   a[2] * a[3] * b [3];
}

ChunkWorld.prototype.calcNormal = function(x, y) {
	var epsilon = 0.1;
	var a = -this.calcDensity(x+epsilon, y+epsilon);
	var b = -this.calcDensity(x-epsilon, y+epsilon);
	var c = -this.calcDensity(x-epsilon, y-epsilon);
	var d = -this.calcDensity(x+epsilon, y-epsilon);
	
	var f = v2.create(+a, +a);
	var g = v2.create(-b, +b);
	var h = v2.create(-c, -c);
	var i = v2.create(+d, -d);
	
	var vec = v2.create(0, 0);
	v2.add(vec, f, vec);
	v2.add(vec, g, vec);
	v2.add(vec, h, vec);
	v2.add(vec, i, vec);
	if (v2.lengthSquared(vec) > 0.0)
		v2.normalize(vec, vec);
	
	return vec;
}
