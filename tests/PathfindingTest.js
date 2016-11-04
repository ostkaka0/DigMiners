var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var world = new Map2D();
var generator = new Generator(1234);
var chunkRenderer = new ChunkRenderer(gl, world, 32.0);
var lastFrameTime = Date();
var camera = {
    width: window.innerWidth,
    height: window.innerHeight,
    pos: v2.create(0, 0)
};
var gameData = { tileWorld: world, tileRegister: objectRegisterAddByObject([], Tiles) };

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { 'transparent': true, 'antialias': true });

var flowField = new Map2D();

init = function() {
    for(var x = -10; x < 10; ++x) {
        for(var y = -2; y < 2; ++y) {
            var chunk = new Chunk();
            generator.generate(chunk, x, y);
            world.set(x, y, chunk);
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
    canvasUpdateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projectionMatrix = PIXI.Matrix.IDENTITY.clone();
    var viewMatrix = PIXI.Matrix.IDENTITY.clone();
    viewMatrix = viewMatrix.translate(-camera.pos[0], -camera.pos[1]);
    viewMatrix = viewMatrix.scale(2 / canvas.width, 2 / canvas.height);
    chunkRenderer.render(world, projectionMatrix.clone().append(viewMatrix), camera);
    
    var page = flowField.get(0, 0);
    var stage = new PIXI.Container();
    var graphics = new PIXI.Graphics();
    if (page) {
        for (var x = 0; x < PATH_PAGE_DIM; x++) {
            for (var y = 0; y < PATH_PAGE_DIM; y++) {
                var dis = page[x + y * PATH_PAGE_DIM];
                if (dis == 65535) continue;
                
                
                graphics.beginFill(0xFFFF00);
                graphics.lineStyle(5, 0xFF0000);
                graphics.drawRect(0, 0, 300, 200);
            }
        }
    }
    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(0, 0, 300, 200);
    stage.addChild(graphics);
    renderer.render(stage);
    
}

$(document.getElementById("hud")).click(function(event) {
    var worldX = event.clientX + camera.pos[0] - camera.width / 2;
    var worldY = canvas.height - event.clientY + camera.pos[1] - camera.height / 2;
    var tileX = Math.floor(worldX / 32);
    var tileY = Math.floor(worldY / 32);
    carveCircle(gameData, tileX, tileY, 1.0, 10.0, 10.0);
    flowField = new Map2D();
    aStarFlowField(flowField, [], null, null, [0,0], [tileX, tileY]);
});

init();
gameLoop(tick, render);
