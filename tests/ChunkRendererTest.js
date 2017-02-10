var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var world = new Map2D();
var generator = new Generator(1234);
var chunkRenderer = new ChunkRenderer(gl, world, 32.0);
var camera = new Camera();
var lastFrameTime = Date();

init = function() {
    for(var x = -10; x < 10; ++x) {
        for(var y = -2; y < 2; ++y) {
            var chunk = new Chunk();
            generator.generate(chunk, x, y);
            world.set([x, y], chunk);
        }
    }
    console.log(chunk.getTileId(4, 4));
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    var frameTime = 1000 / 60;
    var lastFrameTime = performance.now();
    var startDate = performance.now();
}

tick = function() { }

render = function() {
    Canvas.updateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.pos[0], -camera.pos[1]);
    viewMatrix = viewMatrix.scale(2 / canvas.width, 2 / canvas.height);
    chunkRenderer.render(world, projectionMatrix.clone().append(viewMatrix), camera);
}

$(canvas).click(function(event) {
    var worldX = event.clientX + camera.pos[0] - camera.width / 2;
    var worldY = canvas.height - event.clientY + camera.pos[1] - camera.height / 2;
    var tileX = Math.floor(worldX / 32);
    var tileY = Math.floor(worldY / 32);
    var chunkX = Math.floor(tileX / Chunk.dim);
    var chunkY = Math.floor(tileY / Chunk.dim);
    var localX = tileX % Chunk.dim;
    var localY = tileY % Chunk.dim;
    var chunk = world.get([chunkX, chunkY]);
    if(chunk)
        chunk.setDensity(localX, localY, 0);

}

init();
gameLoop(tick, render);
