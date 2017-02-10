import BlockChunk from "Engine/BlockChunk.js";
import BlockWorld from "Engine/BlockWorld.js";
import Config from "Game/Config.js";

var GLBlockChunk = function(gl, blockChunk) {
    this.vbo = null;
    this.vboSize = 0;
    //this.textureRendered = gl.createTexture();
}

export default GLBlockChunk;

GLBlockChunk.prototype.update = function(gl, gameData, blockChunk, chunkX, chunkY) {
    var tileSize = 32;
    var size = tileSize * BlockChunk.dim;
    var verticesPos = [];
    var verticesUV = [];
    var verticesBreakUV = [];

    for (var x = 0; x < BlockChunk.dim; x++) {
        for (var y = 0; y < BlockChunk.dim; y++) {
            var blockIds = [blockChunk.getForeground(x - 1, y - 1),
            blockChunk.getForeground(x, y - 1),
            blockChunk.getForeground(x - 1, y),
            blockChunk.getForeground(x, y)];
            if (x - 1 < 0 || y - 1 < 0)
                blockIds[0] = gameData.world.blockWorld.getForeground([chunkX * BlockChunk.dim + x - 1, chunkY * BlockChunk.dim + y - 1]);
            if (y - 1 < 0)
                blockIds[1] = gameData.world.blockWorld.getForeground([chunkX * BlockChunk.dim + x, chunkY * BlockChunk.dim + y - 1]);
            if (x - 1 < 0)
                blockIds[2] = gameData.world.blockWorld.getForeground([chunkX * BlockChunk.dim + x - 1, chunkY * BlockChunk.dim + y]);

            var tiles = [Config.blockRegister[blockIds[0]],
            Config.blockRegister[blockIds[1]],
            Config.blockRegister[blockIds[2]],
            Config.blockRegister[blockIds[3]]];

            for (var i = 0; i < 4; i++) {
                var blockId = blockIds[i];
                if (!blockId) continue;
                var cornerIndex = 3 - i;
                var borderIndex = (blockIds[i ^ 1] == blockId ? 1 : 0) + 2 * (blockIds[i ^ 2] == blockId ? 1 : 0);// + 4 * (blockIds[i^4]? 1:0);
                var textureX = 4 * (blockId % 16) + 2 * (borderIndex / 2 >> 0) + cornerIndex % 2;
                var textureY = 4 * (blockId / 16 >> 0) + 2 * (borderIndex % 2 >> 0) + (cornerIndex / 2 >> 0);
                var textureQuadDim = 64; // dim of texture by quads
                var quadDim = 16; // dim of quad by pixels

                verticesPos.push(x * tileSize + (i % 2 - 1) * quadDim, y * tileSize + ((i / 2 >> 0) - 0) * quadDim);
                verticesPos.push(x * tileSize + (i % 2 - 0) * quadDim, y * tileSize + ((i / 2 >> 0) - 0) * quadDim);
                verticesPos.push(x * tileSize + (i % 2 - 0) * quadDim, y * tileSize + ((i / 2 >> 0) - 1) * quadDim);
                verticesPos.push(x * tileSize + (i % 2 - 1) * quadDim, y * tileSize + ((i / 2 >> 0) - 0) * quadDim);
                verticesPos.push(x * tileSize + (i % 2 - 0) * quadDim, y * tileSize + ((i / 2 >> 0) - 1) * quadDim);
                verticesPos.push(x * tileSize + (i % 2 - 1) * quadDim, y * tileSize + ((i / 2 >> 0) - 1) * quadDim);

                verticesUV.push((textureX + 0) / textureQuadDim, 1 - (textureY + 1) / textureQuadDim);
                verticesUV.push((textureX + 1) / textureQuadDim, 1 - (textureY + 1) / textureQuadDim);
                verticesUV.push((textureX + 1) / textureQuadDim, 1 - (textureY + 0) / textureQuadDim);
                verticesUV.push((textureX + 0) / textureQuadDim, 1 - (textureY + 1) / textureQuadDim);
                verticesUV.push((textureX + 1) / textureQuadDim, 1 - (textureY + 0) / textureQuadDim);
                verticesUV.push((textureX + 0) / textureQuadDim, 1 - (textureY + 0) / textureQuadDim);

                var strength = gameData.world.blockWorld.getStrength([chunkX * BlockChunk.dim + x + i % 2 - 1, chunkY * BlockChunk.dim + y + (i / 2 >> 0) - 1]);
                textureX = 2 * Math.ceil(10 - (strength / 255.0) * 10) + 1 * (cornerIndex % 2);
                textureY = 1 * (cornerIndex / 2 >> 0);
                verticesBreakUV.push((textureX + 0) / textureQuadDim, 1 - (textureY + 1) / textureQuadDim);
                verticesBreakUV.push((textureX + 1) / textureQuadDim, 1 - (textureY + 1) / textureQuadDim);
                verticesBreakUV.push((textureX + 1) / textureQuadDim, 1 - (textureY + 0) / textureQuadDim);
                verticesBreakUV.push((textureX + 0) / textureQuadDim, 1 - (textureY + 1) / textureQuadDim);
                verticesBreakUV.push((textureX + 1) / textureQuadDim, 1 - (textureY + 0) / textureQuadDim);
                verticesBreakUV.push((textureX + 0) / textureQuadDim, 1 - (textureY + 0) / textureQuadDim);
            }
        }
    }

    if (!this.vbo) {
        this.vbo = gl.createBuffer();
    }
    this.vboSize = verticesPos.length / 2;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, 2 * 3 * 4 * verticesPos.length, gl.DYNAMIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(verticesPos));
    gl.bufferSubData(gl.ARRAY_BUFFER, verticesPos.length * 2 * 4, new Float32Array(verticesUV));
    gl.bufferSubData(gl.ARRAY_BUFFER, verticesPos.length * 2 * 4 * 2, new Float32Array(verticesBreakUV));
}

GLBlockChunk.prototype.bind = function(gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
}
