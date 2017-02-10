import Map2D from "Engine/Core/Map2D.js";
import BlockChunk from "Engine/BlockChunk.js";
import GLBlockChunk from "Engine/GLBlockChunk.js";
import Shader from "Engine/Shader.js";

var BlockChunkRenderer = function(gl, world, tileSize) {
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
        new Shader.Request("data/shaders/block/vert.glsl", this.gl.VERTEX_SHADER),
        new Shader.Request("data/shaders/block/frag.glsl", this.gl.FRAGMENT_SHADER)
    ];

    this.isReady = false; // False until shaders, buffers, attributes and uniforms are loaded.
}
export default BlockChunkRenderer;

BlockChunkRenderer.prototype.lazyInit = function() {
    if (this.isReady)
        return;

    if (!this.shaderProgram)
        this.shaderProgram = Shader.tryLinkShaderProgram(this.gl, this.shaderRequests);

    if (this.shaderProgram) {
        this.gl.useProgram(this.shaderProgram);

        // Get attribute locations
        this.attribPos = this.gl.getAttribLocation(this.shaderProgram, "aPos");
        this.attribUV = this.gl.getAttribLocation(this.shaderProgram, "aUV");
        this.attribBreakUV = this.gl.getAttribLocation(this.shaderProgram, "aBreakUV");

        // Get uniform locations
        this.uniformTextureTiles = this.gl.getUniformLocation(this.shaderProgram, "textureTiles");
        this.uniformTextureBlockBreak = this.gl.getUniformLocation(this.shaderProgram, "textureBlockBreak");
        this.uniformMatVP = this.gl.getUniformLocation(this.shaderProgram, "matVP");
        this.uniformMatM = this.gl.getUniformLocation(this.shaderProgram, "matM");

        this.isReady = true;
    }
}

BlockChunkRenderer.prototype.render = function(gameData, world, matVP, camera) {
    var blockChunksToRender = [];

    var x1 = Math.floor((camera.pos[0] - camera.width / 2) / this.tileSize / BlockChunk.dim);
    var y1 = Math.floor((camera.pos[1] - camera.height / 2) / this.tileSize / BlockChunk.dim);
    var x2 = Math.floor((camera.pos[0] + camera.width / 2) / this.tileSize / BlockChunk.dim);
    var y2 = Math.floor((camera.pos[1] + camera.height / 2) / this.tileSize / BlockChunk.dim);

    for (var y = y1; y <= y2; ++y) {
        for (var x = x1; x <= x2; ++x) {
            var blockChunk = world.get([x, y]);
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

    this.gl.useProgram(this.shaderProgram);

    // Shared between all blockChunks:
    // Model-view matrix
    this.gl.uniformMatrix3fv(this.uniformMatVP, false, matVP.toArray());
    // Texture uniforms
    this.gl.uniform1i(this.uniformTextureTiles, 0);
    this.gl.uniform1i(this.uniformTextureBlockBreak, 1);

    for (var i = 0; i < blockChunksToRender.length; ++i) {
        var x = blockChunksToRender[i].x;
        var y = blockChunksToRender[i].y;
        var blockChunk = blockChunksToRender[i].blockChunk;
        if (!blockChunk)
            continue;

        var glBlockChunk = this.glBlockChunkWorld.get([x, y]);
        // Load glBlockChunk
        if (!glBlockChunk) {
            glBlockChunk = new GLBlockChunk(this.gl, blockChunk);
            this.glBlockChunkWorld.set([x, y], glBlockChunk);
            blockChunk.isChanged = true;
        }
        // Update glBlockChunk
        if (true || blockChunk.isChanged) {
            glBlockChunk.update(this.gl, gameData, blockChunk, x, y);
            blockChunk.isChanged = false;
        }
        glBlockChunk.bind(this.gl);

        // * Render the blockChunk
        // Uniforms
        var matM = PIXI.Matrix.IDENTITY.clone().translate(x * BlockChunk.dim * this.tileSize, y * BlockChunk.dim * this.tileSize);
        this.gl.uniformMatrix3fv(this.uniformMatM, false, matM.toArray());

        // Texture
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureTiles);

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureBlockBreak);

        // Attributes
        this.gl.enableVertexAttribArray(this.attribPos);
        this.gl.enableVertexAttribArray(this.attribUV);
        this.gl.enableVertexAttribArray(this.attribBreakUV);
        this.gl.vertexAttribPointer(this.attribPos, 2, this.gl.FLOAT, false, 2 * 4, 0);
        this.gl.vertexAttribPointer(this.attribUV, 2, this.gl.FLOAT, false, 2 * 4, glBlockChunk.vboSize * 4 * 4);
        this.gl.vertexAttribPointer(this.attribBreakUV, 2, this.gl.FLOAT, false, 2 * 4, 2 * (glBlockChunk.vboSize * 4 * 4));

        // Render vbo
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glBlockChunk.vbo);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, glBlockChunk.vboSize);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.gl.disableVertexAttribArray(this.attribPos);
        this.gl.disableVertexAttribArray(this.attribUV);
        this.gl.disableVertexAttribArray(this.attribBreakUV);
    }
}

BlockChunkRenderer.prototype.loadTextures = function() {
    var image = new Image();
    image.src = "data/textures/blockAtlas.png";
    image.webglTexture = false;
    //var that = this;
    image.onload = function(e) {
        var texture = this.gl.createTexture();
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
        this.textureTiles = texture;
    }.bind(this);

    var image2 = new Image();
    image2.src = "data/textures/blockBreak.png";
    image2.webglTexture = false;
    //var that = this;
    image2.onload = function(e) {
        var texture = this.gl.createTexture();
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image2);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
        this.textureBlockBreak = texture;
    }.bind(this);
}
