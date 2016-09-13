var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var world = new Map2D();
var generator = new Generator(1234);
var chunkRenderer = new ChunkRenderer(gl, world, 32.0);
var camera = new Camera();
var lastFrameTime = Date();

for (var x = -10; x < 10; ++x) {
    for (var y = -2; y < 2; ++y) {
        var chunk = new Chunk();
        generator.generate(chunk, x, y);
        world.set(x, y, chunk);
    }
}
console.log(chunk.getTileId(4, 4));
gl.clearColor(0.1, 0.1, 0.1, 1.0);
var frameTime = 1000/60;
var lastFrameTime = new Date();
var startDate = new Date();
//update();
window.requestAnimationFrame(update);

function update(timestamp) {
	camera.frustrum.x = 2000*Math.sin((startDate - new Date())/2000);
	render();
	
	// Skip frames:
	var now = new Date();
	var delay = lastFrameTime - now + frameTime;
	while(delay < 0.5*frameTime) {
		delay += frameTime;
		lastFrameTime.setMilliseconds(lastFrameTime.getMilliseconds() + frameTime);
		console.log("Skipping frame");
	}
	lastFrameTime.setMilliseconds(lastFrameTime.getMilliseconds() + frameTime);
	window.requestAnimationFrame(update);
	//window.setTimeout(update, delay);
}

function render() {
    canvasUpdateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
	var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.frustrum.x, -camera.frustrum.y);
    viewMatrix = viewMatrix.scale(2/canvas.width, 2/canvas.height);
    chunkRenderer.render(world, projectionMatrix.clone().append(viewMatrix), camera);
}

canvas.onclick = function(event) {
	var worldX = event.clientX + camera.pos.x - camera.width/2;
	var worldY = canvas.height - event.clientY + camera.pos.y - camera.height/2;
	var tileX = Math.floor(worldX/32);
	var tileY = Math.floor(worldY/32);
	var chunkX = Math.floor(tileX/CHUNK_DIM);
	var chunkY = Math.floor(tileY/CHUNK_DIM);
	var localX = tileX%CHUNK_DIM;
	var localY = tileY%CHUNK_DIM;
	var chunk = world.get(chunkX, chunkY);
	if (chunk)
		chunk.setDensity(localX, localY, 0);
	
};
