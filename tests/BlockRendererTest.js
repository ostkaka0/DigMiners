var Canvas = require("../Engine/Canvas.js")
var Map2D = require("../Engine/Core/Map2d.js")
var BlockChunk = require("../Engine/BlockChunk.js")
var BlockChunkRenderer = require("../Engine/BlockChunkRenderer.js")
var gameLoop = require("../Engine/GameLoop.js")

var "../lib_front_end/apixi.js")

var canvas = document.getElementById("canvas");
var gl = Canvas.initGL(canvas);

//var gameData = new GameData();
var blockWorld = new Map2D();
var blockRenderer = new BlockChunkRenderer(gl, blockWorld, 32.0);
//var camera = new Camera();

init = function() {
    for(var x = -4; x < 4; ++x) {
        for(var y = -4; y < 4; ++y) {
            var chunk = new BlockChunk();
            chunk.setForeground(0, 0, 1);
            blockWorld.set(x, y, chunk);
        }
    }
    console.log(chunk.getForeground(4, 4));
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
    blockRenderer.render(gameData, blockWorld, projectionMatrix.clone().append(viewMatrix), camera);
}

$("#hud").click(function(event) {
    console.log("click!");
    var worldPos = [(event.clientX + camera.pos[0] - camera.width / 2) / 32, (canvas.height - event.clientY + camera.pos[1] - camera.height / 2) / 32];
    var chunkPos = [0, 0];
    var localPos = [0, 0];
    BlockChunk.fromV2World(worldPos, chunkPos, localPos);
    var blockChunk = blockWorld.get(chunkPos[0], chunkPos[1]);
    if(blockChunk)
        blockChunk.setForeground(localPos[0], localPos[1], 1);
    console.log("worldPos " + worldPos);
    console.log("chunkPos " + chunkPos);
    console.log("localPos " + localPos);
});

init();
gameLoop(tick, render);
