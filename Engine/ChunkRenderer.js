import Map2D from "Engine/Core/Map2D.js";
import Chunk from "Engine/Chunk.js";
import GLChunk from "Engine/GLChunk.js";
import Shader from "Engine/Shader.js";
var CHUNK_DIM = Chunk.dim;
var CHUNK_DIM_2 = Chunk.dim2;
var CHUNK_SIZE = Chunk.size;

var ChunkRenderer = function(gl, world, tileSize) {
    this.gl = gl;
    this.tileSize = tileSize;
    this.world = world;
    this.chunkGLWorld = new Map2D();

    this.attributePos = 0;
    this.attributeUV = 0;

    this.uniformTextureTerrain = 0;
    this.uniformTextureTiles = 0;
    this.uniformTextureDensity = 0;
    this.uniformMatVP = 0;
    this.uniformMatM = 0;

    // A square used for rendering each chunk.
    this.buffer = null;
    this.bufferIndices = null;

    this.textureTerrain = null;
    this.loadTexture(gl);

    this.shaderProgram = null;
    this.shaderRequests = [
        new Shader.Request("data/shaders/terrain/vert.glsl", this.gl.VERTEX_SHADER),
        new Shader.Request("data/shaders/terrain/frag.glsl", this.gl.FRAGMENT_SHADER)
    ];

    this.isReady = false; // False until shaders, buffers, attributes and uniforms are loaded.
}

export default ChunkRenderer;

ChunkRenderer.prototype.lazyInit = function() {
    if (this.isReady)
        return;

    if (!this.shaderProgram)
        this.shaderProgram = Shader.tryLinkShaderProgram(this.gl, this.shaderRequests);

    if (this.shaderProgram && !this.buffer) {
        var size = this.tileSize * CHUNK_DIM;
        var vertices = [
            0, 0,
            0, 0,
            size, 0,
            1, 0,
            0, size,
            0, 1,
            size, size,
            1, 1,
        ];

        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            this.gl.STATIC_DRAW);

        //FACES :
        var triangle_faces = [0, 1, 3, 0, 3, 2];
        this.bufferIndices = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(triangle_faces),
            this.gl.STATIC_DRAW);

        this.gl.useProgram(this.shaderProgram);

        // Get attribute locations
        this.attributePos = this.gl.getAttribLocation(this.shaderProgram, "aPos");
        this.attributeUV = this.gl.getAttribLocation(this.shaderProgram, "aUV");

        // Get uniform locations
        this.uniformTextureDensity = this.gl.getUniformLocation(this.shaderProgram, "textureDensity");
        this.uniformTextureTiles = this.gl.getUniformLocation(this.shaderProgram, "textureTiles");
        this.uniformTextureTerrain = this.gl.getUniformLocation(this.shaderProgram, "textureTerrain");
        this.uniformMatVP = this.gl.getUniformLocation(this.shaderProgram, "matVP");
        this.uniformMatM = this.gl.getUniformLocation(this.shaderProgram, "matM");

        this.isReady = true;
    }
}

ChunkRenderer.prototype.render = function(world, matVP, camera) {
    var chunksToRender = [];

    var x1 = Math.floor((camera.pos[0] - camera.width / 2) / this.tileSize / CHUNK_DIM);
    var y1 = Math.floor((camera.pos[1] - camera.height / 2) / this.tileSize / CHUNK_DIM);
    var x2 = Math.floor((camera.pos[0] + camera.width / 2) / this.tileSize / CHUNK_DIM);
    var y2 = Math.floor((camera.pos[1] + camera.height / 2) / this.tileSize / CHUNK_DIM);

    for (var y = y1; y <= y2; ++y) {
        for (var x = x1; x <= x2; ++x) {
            var chunk = world.get([x, y]);
            if (!chunk)
                continue;
            chunksToRender.push({ x: x, y: y, chunk: chunk });
        }
    }

    this.renderChunks(matVP, chunksToRender);
}

ChunkRenderer.prototype.renderChunks = function(matVP, chunksToRender) {
    if (!this.isReady)
        this.lazyInit();
    if (!this.isReady || !this.textureTerrain)
        return;

    this.gl.useProgram(this.shaderProgram);

    // Shared between all chunks:
    // Model-view matrix
    this.gl.uniformMatrix3fv(this.uniformMatVP, false, matVP.toArray());
    // Texture uniforms
    this.gl.uniform1i(this.uniformTextureTerrain, 0);
    this.gl.uniform1i(this.uniformTextureTiles, 1);
    this.gl.uniform1i(this.uniformTextureDensity, 2);

    for (var i = 0; i < chunksToRender.length; ++i) {
        var x = chunksToRender[i].x;
        var y = chunksToRender[i].y;
        var chunk = chunksToRender[i].chunk;
        if (!chunk)
            continue;

        var glChunk = this.chunkGLWorld.get([x, y]);
        // Load glChunk
        if (!glChunk) {
            glChunk = new GLChunk(this.gl, chunk);
            this.chunkGLWorld.set([x, y], glChunk);
            chunk.isChanged = false;
            this.handleChunkChange(chunk, x, y);
        }
        // Update glChunk
        if (chunk.isChanged) {
            glChunk.update(this.gl, chunk);
            chunk.isChanged = false;
            this.handleChunkChange(chunk, x, y);
        }
        if (!glChunk.textureTiles || !glChunk.textureDensity)
            continue;

        // Render the chunk
        var matM = PIXI.Matrix.IDENTITY.clone().translate(x * CHUNK_DIM * this.tileSize, y * CHUNK_DIM * this.tileSize);
        this.gl.uniformMatrix3fv(this.uniformMatM, false, matM.toArray());

        // Terrain texture:
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureTerrain);
        // Chunk textures
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, glChunk.textureTiles);
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, glChunk.textureDensity);

        // Attributes
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

        this.gl.enableVertexAttribArray(this.attributePos);
        this.gl.enableVertexAttribArray(this.attributeUV);
        this.gl.vertexAttribPointer(this.attributePos, 2, this.gl.FLOAT, false, 4 * 4, 0);
        this.gl.vertexAttribPointer(this.attributeUV, 2, this.gl.FLOAT, false, 4 * 4, 8);

        // Render chunk
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);

        // Unbind buffers
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }
}

ChunkRenderer.prototype.loadTexture = function(gl) {
    var image = new Image();
    image.src = "data/textures/ground.png";
    image.webglTexture = false;
    var that = this;
    image.onload = function(e) {
        var texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        that.textureTerrain = texture;
    };
}

ChunkRenderer.prototype.handleChunkChange = function(chunk, x, y) {
    //console.log("onChunkChange event! x:" + x + " y:" + y);
    var that = this;
    var glChunk = that.chunkGLWorld.get([x, y]);

    if (!chunk || !glChunk)
        return;

    var notifyNeighbor = function(x2, y2) {
        var glChunk2 = that.chunkGLWorld.get([x2, y2]);
        var chunk2 = that.world.get([x2, y2]);
        if (chunk2 && glChunk2) {
            glChunk.updateBorder(this.gl, chunk2, x, y, x2, y2);
            glChunk2.updateBorder(this.gl, chunk, x2, y2, x, y);
            //that.onChunkChange2(this.gl, ex, ey, x2, y2, chunk, chunk2);
            //that.onChunkChange2(this.gl, x2, y2, ex, ey, chunk2, chunk);
        }
    }.bind(this);

    notifyNeighbor(x, y + 1);
    notifyNeighbor(x - 1, y + 1);
    notifyNeighbor(x - 1, y);
    notifyNeighbor(x - 1, y - 1);
    notifyNeighbor(x, y - 1);
    notifyNeighbor(x + 1, y - 1);
    notifyNeighbor(x + 1, y);
    notifyNeighbor(x + 1, y + 1);
}
