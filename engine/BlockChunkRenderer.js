BlockChunkRenderer = function(gl, world, tileSize) {
    this.gl = gl;
    this.tileSize = tileSize;
    this.world = world;
    this.glBlockChunkWorld = new Map2D();

    this.attribPos = 0;
    this.attribUV = 0;
    this.attribBreakUV = 0;

    this.uniformTextureTiles = 0;
    this.uniformTextureBlockBreak = 0;
    this.uniformMatVP = 0;
    this.uniformMatM = 0;

    this.textureTiles = null;
    this.textureBlockBreak = null
    this.loadTextures();

    this.shaderProgram = null;
    this.shaderRequests = [
        new ShaderRequest("data/shaders/block/vert.glsl", gl.VERTEX_SHADER),
        new ShaderRequest("data/shaders/block/frag.glsl", gl.FRAGMENT_SHADER)
    ];

    this.isReady = false; // False until shaders, buffers, attributes and uniforms are loaded.
}


BlockChunkRenderer.prototype.lazyInit = function() {
    if (this.isReady)
        return;

    if (!this.shaderProgram)
        this.shaderProgram = tryLinkShaderProgram(this.gl, this.shaderRequests);

    if (this.shaderProgram) {
        gl.useProgram(this.shaderProgram);

        // Get attribute locations
        this.attribPos = gl.getAttribLocation(this.shaderProgram, "aPos");
        this.attribUV = gl.getAttribLocation(this.shaderProgram, "aUV");
        this.attribBreakUV = gl.getAttribLocation(this.shaderProgram, "aBreakUV");

        // Get uniform locations
        this.uniformTextureTiles = gl.getUniformLocation(this.shaderProgram, "textureTiles");
        this.uniformTextureBlockBreak = gl.getUniformLocation(this.shaderProgram, "textureBlockBreak");
        this.uniformMatVP = gl.getUniformLocation(this.shaderProgram, "matVP");
        this.uniformMatM = gl.getUniformLocation(this.shaderProgram, "matM");

        this.isReady = true;
    }
}

BlockChunkRenderer.prototype.render = function(gameData, world, matVP, camera) {
    var blockChunksToRender = [];

    var x1 = Math.floor((camera.pos[0] - camera.width / 2) / this.tileSize / BLOCK_CHUNK_DIM);
    var y1 = Math.floor((camera.pos[1] - camera.height / 2) / this.tileSize / BLOCK_CHUNK_DIM);
    var x2 = Math.floor((camera.pos[0] + camera.width / 2) / this.tileSize / BLOCK_CHUNK_DIM);
    var y2 = Math.floor((camera.pos[1] + camera.height / 2) / this.tileSize / BLOCK_CHUNK_DIM);

    for (var y = y1; y <= y2; ++y) {
        for (var x = x1; x <= x2; ++x) {
            var blockChunk = world.get(x, y);
            if (!blockChunk)
                continue;
            blockChunksToRender.push({ x: x, y: y, blockChunk: blockChunk });
        }
    }

    this.renderBlockChunks(gameData, matVP, blockChunksToRender);
}

BlockChunkRenderer.prototype.renderBlockChunks = function(gameData, matVP, blockChunksToRender) {
    if (!this.isReady)
        this.lazyInit();
    if (!this.isReady || !this.textureTiles || !this.textureBlockBreak)
        return;

    gl.useProgram(this.shaderProgram);

    // Shared between all blockChunks:
    // Model-view matrix
    gl.uniformMatrix3fv(this.uniformMatVP, false, matVP.toArray());
    // Texture uniforms
    gl.uniform1i(this.uniformTextureTiles, 0);
    gl.uniform1i(this.uniformTextureBlockBreak, 1);

    for (var i = 0; i < blockChunksToRender.length; ++i) {
        var x = blockChunksToRender[i].x;
        var y = blockChunksToRender[i].y;
        var blockChunk = blockChunksToRender[i].blockChunk;
        if (!blockChunk)
            continue;

        var glBlockChunk = this.glBlockChunkWorld.get(x, y);
        // Load glBlockChunk
        if (!glBlockChunk) {
            glBlockChunk = new GLBlockChunk(this.gl, blockChunk);
            this.glBlockChunkWorld.set(x, y, glBlockChunk);
            blockChunk.isChanged = true;
        }
        // Update glBlockChunk
        if (blockChunk.isChanged) {
            glBlockChunk.update(this.gl, gameData, blockChunk, x, y);
            blockChunk.isChanged = false;
        }
        glBlockChunk.bind();

        // * Render the blockChunk
        // Uniforms
        var matM = PIXI.Matrix.IDENTITY.clone().translate(x * BLOCK_CHUNK_DIM * this.tileSize, y * BLOCK_CHUNK_DIM * this.tileSize);
        gl.uniformMatrix3fv(this.uniformMatM, false, matM.toArray());

        // Texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textureTiles);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.textureBlockBreak);

        // Attributes
        gl.enableVertexAttribArray(this.attribPos);
        gl.enableVertexAttribArray(this.attribUV);
        gl.enableVertexAttribArray(this.attribBreakUV);
        gl.vertexAttribPointer(this.attribPos, 2, gl.FLOAT, false, 2 * 4, 0);
        gl.vertexAttribPointer(this.attribUV, 2, gl.FLOAT, false, 2 * 4, glBlockChunk.vboSize * 4 * 4);
        gl.vertexAttribPointer(this.attribBreakUV, 2, gl.FLOAT, false, 2 * 4, 2 * (glBlockChunk.vboSize * 4 * 4));

        // Render vbo
        gl.bindBuffer(gl.ARRAY_BUFFER, glBlockChunk.vbo);
        gl.drawArrays(gl.TRIANGLES, 0, glBlockChunk.vboSize);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.disableVertexAttribArray(this.attribPos);
        gl.disableVertexAttribArray(this.attribUV);
        gl.disableVertexAttribArray(this.attribBreakUV);
    }
}

BlockChunkRenderer.prototype.loadTextures = function() {
    var image = new Image();
    image.src = "data/textures/blockAtlas.png";
    image.webglTexture = false;
    //var that = this;
    image.onload = function(e) {
        var texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        this.textureTiles = texture;
    }.bind(this);

    var image2 = new Image();
    image2.src = "data/textures/blockBreak.png";
    image2.webglTexture = false;
    //var that = this;
    image2.onload = function(e) {
        var texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image2);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        this.textureBlockBreak = texture;
    }.bind(this);
}
