GLBlockChunk = function(gl, blockChunk) {
    this.vbo = null;
    this.vboSize = 0;
    //this.textureRendered = gl.createTexture();
}

GLBlockChunk.prototype.update = function(gl, gameData, blockChunk) {
    var tileSize = 32;
    var size = tileSize * BLOCK_CHUNK_DIM;
    var verticesPos = [];
    var verticesUV = [];
    var verticesBreakUV = [];

    for (var x = 0; x < BLOCK_CHUNK_DIM; x++) {
        for (var y = 0; y < BLOCK_CHUNK_DIM; y++) {
            var blockId = blockChunk.getForeground(x, y);
            if (blockId == 0)
                blockId = blockChunk.getBackground(x, y);
            if (blockId == 0) continue;
            var tile = gameData.blockRegister[blockId];

            // Texture is 16x16 tiles, each with 4 corner variants
            var textureTileDim = 32; // Size of texture by tiles
            var textureX = blockId % 16 * 2;
            var textureY = (blockId / 16 >> 0) * 2;

            verticesPos.push(x * tileSize, y * tileSize);
            verticesPos.push((x + 1) * tileSize, y * tileSize);
            verticesPos.push((x + 1) * tileSize, (y + 1) * tileSize);
            verticesPos.push(x * tileSize, y * tileSize);
            verticesPos.push((x + 1) * tileSize, (y + 1) * tileSize);
            verticesPos.push(x * tileSize, (y + 1) * tileSize);

            verticesUV.push((textureX + 0) / textureTileDim, 1 - (textureY + 1) / textureTileDim);
            verticesUV.push((textureX + 1) / textureTileDim, 1 - (textureY + 1) / textureTileDim);
            verticesUV.push((textureX + 1) / textureTileDim, 1 - (textureY + 0) / textureTileDim);
            verticesUV.push((textureX + 0) / textureTileDim, 1 - (textureY + 1) / textureTileDim);
            verticesUV.push((textureX + 1) / textureTileDim, 1 - (textureY + 0) / textureTileDim);
            verticesUV.push((textureX + 0) / textureTileDim, 1 - (textureY + 0) / textureTileDim);

            if (tile.type == BlockTypes.FOREGROUND) {
                var strength = blockChunk.getStrength(x, y);
                textureX = Math.ceil(10 - (strength / 255.0) * 10);
            } else
                textureX = 0;
            textureY = 0;
            verticesBreakUV.push((textureX + 0) / textureTileDim, 1 - (textureY + 1) / textureTileDim);
            verticesBreakUV.push((textureX + 1) / textureTileDim, 1 - (textureY + 1) / textureTileDim);
            verticesBreakUV.push((textureX + 1) / textureTileDim, 1 - (textureY + 0) / textureTileDim);
            verticesBreakUV.push((textureX + 0) / textureTileDim, 1 - (textureY + 1) / textureTileDim);
            verticesBreakUV.push((textureX + 1) / textureTileDim, 1 - (textureY + 0) / textureTileDim);
            verticesBreakUV.push((textureX + 0) / textureTileDim, 1 - (textureY + 0) / textureTileDim);
        }
    }

    if (!this.vbo) {
        this.vbo = gl.createBuffer();
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, 2 * 3 * 4 * verticesPos.length, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(verticesPos));
    gl.bufferSubData(gl.ARRAY_BUFFER, verticesPos.length * 2 * 4, new Float32Array(verticesUV));
    gl.bufferSubData(gl.ARRAY_BUFFER, verticesPos.length * 2 * 4 * 2, new Float32Array(verticesBreakUV));
    this.vboSize = verticesPos.length / 2;
}
