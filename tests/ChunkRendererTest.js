var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var world = new Map2D();
var generator = new Generator(1234);
var chunkRenderer = new ChunkRenderer(gl, 32.0);
var camera = new Camera();

world.set(0, 0, new Chunk());
var chunk = world.get(0, 0);
console.log(chunk.getTileId(4, 4));
gl.clearColor(0.1, 0.1, 0.1, 1.0);
setInterval(update, 1000/60);

function update() {
    var dt = 1/60;
    //camera.update(dt);
    render();
}

function render() {
    canvasUpdateSize(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projectionMatrix = new PIXI.Matrix();//this.renderer.renderTarget.projectionMatrix.clone();
	var viewMatrix = new PIXI.Matrix();
    //viewMatrix = viewMatrix.translate(-this.camera.frustrum.x, -this.camera.frustrum.y);

    chunkRenderer.render(world, projectionMatrix.clone().append(viewMatrix), camera);
}
