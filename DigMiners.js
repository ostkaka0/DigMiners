
var world = new Map2D();
world.set(13, 37, new Chunk());
var chunk = world.get(13, 37);
console.log(chunk.getTileId(4, 4));

var generator = new Generator(1337);

var loadChunk = function(world, x, y) {
    var chunk = new Chunk();
    generator.generate(chunk, x, y);
    world.set(x, y, chunk);
}

var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);
var socket = io("127.0.0.1:3000");

if (gl) {
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    setInterval(update, 1000.0/60.0);
}

function update() {
    render();
}

function render() {
    canvasUpdateSize(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
