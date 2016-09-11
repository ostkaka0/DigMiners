var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var world = new Map2D();
var generator = new Generator(1234);
var chunkRenderer = new ChunkRenderer(gl, 32.0);
var camera = new Camera();

for (var x = -10; x < 10; ++x) {
    for (var y = -10; y < 10; ++y) {
        var chunk = new Chunk();
        generator.generate(chunk, x, y);
        world.set(x, y, new Chunk());
    }
}
console.log(chunk.getTileId(4, 4));
gl.clearColor(0.1, 0.1, 0.1, 1.0);
setInterval(update, 1000/60);

function update() {
    var dt = 1/60;
    this.camera.frustrum.x += 100.0*dt;
    //camera.update(dt);
    render();
}

function render() {
    canvasUpdateSize(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();//this.renderer.renderTarget.projectionMatrix.clone();
	var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-this.camera.frustrum.x, -this.camera.frustrum.y);
    viewMatrix = viewMatrix.scale(2/canvas.width, 2/canvas.height);
    chunkRenderer.render(world, projectionMatrix.clone().append(viewMatrix), camera);
}
