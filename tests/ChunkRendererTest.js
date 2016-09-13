var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var world = new Map2D();
var generator = new Generator(1234);
var chunkRenderer = new ChunkRenderer(gl, 32.0);
var camera = new Camera();
var lastFrameTime = Date();

for (var x = -2; x < 20; ++x) {
    for (var y = -2; y < 2; ++y) {
        var chunk = new Chunk();
        generator.generate(chunk, x, y);
        world.set(x, y, new Chunk());
    }
}
console.log(chunk.getTileId(4, 4));
gl.clearColor(0.1, 0.1, 0.1, 1.0);
var frameTime = 1000/60;
var lastFrameTime = new Date();
update();

function update() {
	camera.frustrum.x += 100.0*frameTime/1000.0;
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
	window.setTimeout(update, delay);
}

function render() {
    canvasUpdateSize(canvas);
    camera.wdith = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
	var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.frustrum.x, -camera.frustrum.y);
    viewMatrix = viewMatrix.scale(2/canvas.width, 2/canvas.height);
    chunkRenderer.render(world, projectionMatrix.clone().append(viewMatrix), camera);
}
