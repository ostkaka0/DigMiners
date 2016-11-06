var canvas = document.getElementById("canvas");
var gl = canvasInitGL(canvas);

var lastFrameTime = Date();
var camera = {
    width: window.innerWidth,
    height: window.innerHeight,
    pos: v2.create(0, 0)
};

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { 'transparent': true, 'antialias': true });
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);

var physicsWorld = new PhysicsWorld();

init = function() {
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    var frameTime = 1000 / 60;
    var lastFrameTime = performance.now();
    var startDate = performance.now();
}

tick = function(dt) {
    console.log("tick!");
    physicsWorld.update(dt);
}

render = function() {
    canvasUpdateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var stage = new PIXI.Container();
    var graphics = new PIXI.Graphics();
    for(var id = 0; id < physicsWorld.numBodies; id++) {
        var pos = physicsWorld.getPos(id);
        
        graphics.beginFill(0xA0A0A0, 0xFF);
        graphics.lineStyle(1, 0xFF0000);
        graphics.drawRect(pos[0] + canvas.width/2, -pos[1] + canvas.height/2, 32, 32);
    }
    stage.addChild(graphics);
    renderer.render(stage);
    
}

$(document.getElementById("hud")).click(function(event) {
    var worldX = event.clientX + camera.pos[0] - camera.width / 2;
    var worldY = canvas.height - event.clientY + camera.pos[1] - camera.height / 2;
    physicsWorld.add([worldX, worldY], [40*(worldX % 10 - 5), 40*(worldY % 10 - 5)]);
});

init();
gameLoop(tick, render, 1000/60);
