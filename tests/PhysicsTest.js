import "../lib_front_end/apixi.js"
import '../lib_front_end/ajquery-3.1.1.min.js';
import Canvas from "../engine/Canvas.js"
import PhysicsWorld from "../engine/PhysicsWorld.js"
import gameLoop from "../engine/GameLoop.js"

var canvas = document.getElementById("canvas");
var gl = Canvas.initGL(canvas);

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
    console.log("TPS: " + 1000 / (performance.now() - lastFrameTime));
    lastFrameTime = performance.now();
    physicsWorld.update(dt);
}

render = function() {
    Canvas.updateSize(canvas);
    camera.width = canvas.width;
    camera.height = canvas.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var stage = new PIXI.Container();
    var graphics = new PIXI.Graphics();
    var i = 0;
    physicsWorld.forEach(this, function(id) {
        if(i < 5) {
            var pos = physicsWorld.getPos(id);

            graphics.beginFill(0xA0A0A0, 0xFF);
            graphics.lineStyle(1, 0xFF0000);
            graphics.drawCircle(32 * pos[0] + canvas.width / 2, -32 * pos[1] + canvas.height / 2, 16);
            ++i;
        }
    });
    stage.addChild(graphics);
    renderer.render(stage);

}

$(document.getElementById("hud")).click(function(event) {
    var worldX = event.clientX + camera.pos[0] - camera.width / 2;
    var worldY = canvas.height - event.clientY + camera.pos[1] - camera.height / 2;
    for(var i = 0; i < 500; ++i)
        physicsWorld.add([worldX / 32, worldY / 32], [1 * (worldX % 10 - 5) + Math.floor(Math.random() * 20), 1 * (worldY % 10 - 5) + Math.floor(Math.random() * 20)]);

    console.log("Body count: " + (physicsWorld.numBodies - physicsWorld.freeIds.length));
});

init();
gameLoop(tick, render, 1000 / 60);
