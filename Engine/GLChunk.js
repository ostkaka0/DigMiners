

var GLChunk = function(gl, chunk) {
    this.textureTiles = gl.createTexture();
    this.textureDensity = gl.createTexture();

    // Create density texture
    gl.bindTexture(gl.TEXTURE_2D, this.textureDensity);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, Chunk.dim2, Chunk.dim2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, null);// chunk.data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
    gl.pixelStorei(gl.PACK_ALIGNMENT, 1)
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 1, 1, Chunk.dim, Chunk.dim, gl.LUMINANCE, gl.UNSIGNED_BYTE, chunk.densityData);
    gl.bindTexture(gl.TEXTURE_2D, null);

    // Create tile texture
    gl.bindTexture(gl.TEXTURE_2D, this.textureTiles);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, Chunk.dim2, Chunk.dim2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, null);// chunk.data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
    gl.pixelStorei(gl.PACK_ALIGNMENT, 1)
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 1, 1, Chunk.dim, Chunk.dim, gl.LUMINANCE, gl.UNSIGNED_BYTE, chunk.tileData);
    gl.bindTexture(gl.TEXTURE_2D, null);

    chunk.isChanged = false;
}

global.GLChunk = GLChunk;

GLChunk.prototype.update = function(gl, chunk) {
    gl.bindTexture(gl.TEXTURE_2D, this.textureDensity);
    //gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this._chunkSizeX, this.chunkSizeY, gl.LUMINANCE, gl.UNSIGNED_BYTE, chunk.data);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 1, 1, Chunk.dim, Chunk.dim, gl.LUMINANCE, gl.UNSIGNED_BYTE, chunk.densityData);
    gl.bindTexture(gl.TEXTURE_2D, null);

    chunk.isChanged = false;
}

GLChunk.prototype.updateBorder = function(gl, chunkNeighbor, x1, y1, x2, y2) {
    if (!chunkNeighbor)
        return;

    // Calculate intersecting rectangle.
    var rx1 = Math.max(x1 * Chunk.dim - 1, x2 * Chunk.dim);
    var ry1 = Math.max(y1 * Chunk.dim - 1, y2 * Chunk.dim);
    var rx2 = Math.min((x1 + 1) * Chunk.dim, (x2 + 1) * Chunk.dim - 1);
    var ry2 = Math.min((y1 + 1) * Chunk.dim, (y2 + 1) * Chunk.dim - 1);

    // Calculate texture position:
    var textureX1 = rx1 - x1 * Chunk.dim + 1;
    var textureY1 = ry1 - y1 * Chunk.dim + 1;
    var textureX2 = rx2 - x1 * Chunk.dim + 1;
    var textureY2 = ry2 - y1 * Chunk.dim + 1;

    var dataX = rx1 - x2 * Chunk.dim;
    var dataY = ry1 - y2 * Chunk.dim;

    var width = textureX2 - textureX1 + 1;
    var height = textureY2 - textureY1 + 1;

    var densityData = new Uint8Array(width * height);
    for (var xx = 0; xx < width; ++xx) {
        for (var yy = 0; yy < height; ++yy) {
            densityData[xx + yy * width] = chunkNeighbor.densityData[dataX + xx + (dataY + yy) * Chunk.dim];
        }
    }

    var tileData = new Uint8Array(width * height);
    for (var xx = 0; xx < width; ++xx) {
        for (var yy = 0; yy < height; ++yy) {
            tileData[xx + yy * width] = chunkNeighbor.tileData[dataX + xx + (dataY + yy) * Chunk.dim];
        }
    }

    // Lazy init of chunk texture.
    //if (this.textureDensity == undefined) {
    //  this.loadChunkTextures(gl, chunk);
    //}

    // Update density texture borders
    gl.bindTexture(gl.TEXTURE_2D, this.textureDensity);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, textureX1, textureY1, textureX2 - textureX1 + 1, textureY2 - textureY1 + 1, gl.LUMINANCE, gl.UNSIGNED_BYTE, densityData);
    gl.bindTexture(gl.TEXTURE_2D, null);

    // Update tile texture borders
    gl.bindTexture(gl.TEXTURE_2D, this.textureTiles);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, textureX1, textureY1, textureX2 - textureX1 + 1, textureY2 - textureY1 + 1, gl.LUMINANCE, gl.UNSIGNED_BYTE, tileData);
    gl.bindTexture(gl.TEXTURE_2D, null);

    //chunk.isChanged = false;
}
