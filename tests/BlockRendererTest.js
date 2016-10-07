var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var gameData = new GameData();
var blockWorld = new Map2D();
var blockRenderer = new BlockChunkRenderer(gl, blockWorld, 32.0);
var camera = new Camera();

init = function() {
    for (var x = -10; x < 10; ++x) {
        for (var y = -2; y < 2; ++y) {
            var chunk = new BlockChunk();
            blockWorld.set(x, y, chunk);
        }
    }
    console.log(chunk.getForeground(4, 4));
}

tick = function() {}

render = function() {
    canvasUpdateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.frustrum.x, -camera.frustrum.y);
    viewMatrix = viewMatrix.scale(2/canvas.width, 2/canvas.height);
    blockRenderer.render(gameData, blockWorld, projectionMatrix.clone().append(viewMatrix), camera);
}

canvas.onclick = function(event) {
    var blockWorldX = event.clientX + camera.pos.x - camera.width/2;
    var blockWorldY = canvas.height - event.clientY + camera.pos.y - camera.height/2;
    var tileX = Math.floor(blockWorldX/32);
    var tileY = Math.floor(blockWorldY/32);
    var chunkX = Math.floor(tileX/CHUNK_DIM);
    var chunkY = Math.floor(tileY/CHUNK_DIM);
    var localX = tileX%CHUNK_DIM;
    var localY = tileY%CHUNK_DIM;
    var chunk = blockWorld.get(chunkX, chunkY);
    if (chunk)
        chunk.setDensity(localX, localY, 0);
    
};

init();
gameLoop(tick, render);