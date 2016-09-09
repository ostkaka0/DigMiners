ChunkRenderer = function(gl, tileSize) {
    this.gl = gl;
    this.tileSize = tileSize;
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
    this.loadTexture();

    this.shaderProgram = null;
    this.shaderRequests = [
       new ShaderRequest("data/shaders/terrain/vert.glsl", gl.VERTEX_SHADER),
       new ShaderRequest("data/shaders/terrain/frag.glsl", gl.FRAGMENT_SHADER)
    ];

    this.isReady = false; // False until shaders, buffers, attributes and uniforms are loaded.
}

ChunkRenderer.prototype.lazyInit = function() {
    if (this.isReady)
        return;

    if (!this.shaderProgram)
        this.shaderProgram = tryLinkShaderProgram(this.gl, this.shaderRequests);
    
    if (this.shaderProgram && !this.buffer) {
        var size = this.tileSize*CHUNK_DIM;
        var vertices = [
			0,0,
			0,0,
			size,0,
			1,0,
			0,size,
			0,1,
			size,size,
			1,1,
		];

		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER,
		new Float32Array(vertices),
		gl.STATIC_DRAW);
		
		//FACES :
		var triangle_faces = [0, 1, 3, 0, 3, 2];
		this.bufferIndices = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(triangle_faces),
		gl.STATIC_DRAW);
		
        gl.useProgram(this.shaderProgram);

		// Get attribute locations
		this.attributePos = gl.getAttribLocation(this.shaderProgram, "aPos");
		this.attributeUV = gl.getAttribLocation(this.shaderProgram, "aUV");
		
		// Get uniform locations
		this.uniformTextureDensity = gl.getUniformLocation(this.shaderProgram, "textureDensity");
		this.uniformTextureTiles = gl.getUniformLocation(this.shaderProgram, "textureTiles");
		this.uniformTextureTerrain = gl.getUniformLocation(this.shaderProgram, "textureTerrain");
		this.uniformMatVP = gl.getUniformLocation(this.shaderProgram, "matVP");
		this.uniformMatM = gl.getUniformLocation(this.shaderProgram, "matM");
		
		this.isReady = true;
    }
}

ChunkRenderer.prototype.render = function(world, matVP, camera) {
    var chunksToRender = [];

    var x1 = Math.floor(camera.pos.x/this.tileSize/CHUNK_DIM);
	var y1 = Math.floor(camera.pos.y/this.tileSize/CHUNK_DIM);
	var x2 = Math.ceil((camera.pos.x+camera.width)/this.tileSize/CHUNK_DIM);
	var y2 = Math.ceil((camera.pos.y+camera.width)/this.tileSize/CHUNK_DIM);

    for (var y = y1; y <= y2; ++y) {
        for (var x = x1; x <= x2; ++x) {
            var chunk = world.get(x, y);
            if (!chunk)
                continue;
            chunksToRender.push({x:x, y:y, chunk:chunk});
        }
    }
    
    this.renderChunks(matVP, chunksToRender);
}

ChunkRenderer.prototype.renderChunks = function(matVP, chunksToRender) {
    if (!this.isReady)
        this.lazyInit();
    if (!this.isReady || !this.textureTerrain)
        return;

    gl.useProgram(this.shaderProgram);

    // Shared between all chunks:
    // Model-view matrix
    gl.uniformMatrix3fv(this.uniformMatVP, false, matVP.toArray());
    // Texture uniforms
	gl.uniform1i(this.uniformTextureTerrain, 0);
	gl.uniform1i(this.uniformTextureTile, 1);
    gl.uniform1i(this.uniformTextureDensity, 2);
    // Terrain texture:
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.textureTerrain);

    for (var i = 0; i < chunksToRender.length; ++i) {
        var x = chunksToRender[i].x;
        var y = chunksToRender[i].y;        
        var chunk = chunksToRender[i].chunk;
        if (!chunk)
            continue;

        var glChunk = this.chunkGLWorld.get(x, y);
        // Load glChunk
        if (!glChunk) {
            glChunk = new GLChunk(this.gl, chunk);
            this.chunkGLWorld.set(x, y, glChunk);
            chunk.isChanged = false;
        }
        // Update glChunk
        if (chunk.isChanged) {
            glChunk.update(this.gl, chunk);
            chunk.isChanged = false;
        }

        // Render the chunk
        var matM = PIXI.Matrix.IDENTITY.clone().translate(x*CHUNK_DIM*this.tileSize, y*CHUNK_DIM*this.tileSize);
        gl.uniformMatrix3fv(this.uniformMatM, false, matM.toArray());
        
        // Chunk textures
        gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, glChunk.textureTiles);
		gl.activeTexture(gl.TEXTURE2);
	    gl.bindTexture(gl.TEXTURE_2D, glChunk.textureDensity);

		// Attributes
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        gl.enableVertexAttribArray(this.attributePos);
        gl.enableVertexAttribArray(this.attributeUv);
		gl.vertexAttribPointer(this.attributePos, 2, gl.FLOAT, false, 4*4,0);
		gl.vertexAttribPointer(this.attributeUv, 2, gl.FLOAT, false, 4*4,8);

		// Render chunk
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices);
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
		
		// Unbind buffers
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}

ChunkRenderer.prototype.loadTexture = function() {
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
