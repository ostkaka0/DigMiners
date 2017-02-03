import {loadTextures} from "../Engine/Animation/TextureFunctions.js";
import DrawTransform from "../Engine/Animation/DrawTransform.js";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d", { antialias: true });
var image = new Image();
var startTime = Date.now();
var textures = null;

preload = function() {
    textures = loadTextures("data/textures/", ["block.png", "egg.png"], load, function(percentage, name) {
        console.log(percentage + "% complete. (" + name + ")");
    });
}

load = function() {
    update();
}

update = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
    window.requestAnimationFrame(update, 1000.0 / 60.0);
}

render = function() {
    var time = (Date.now() - startTime) / 1000.0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var transformA = new DrawTransform([64, 64], time, [64.0, 16.0]);
    transformA.begin(context);
    context.drawImage(textures["block.png"], 0, 0, 1, 1);
    transformA.end(context);
    for (var i = 0; i < 1000; i++) {
        var transformB = new DrawTransform([600 + 400 * Math.sin(time + i / 4), 200 + 0.6 * i], time + i / 2, [32.0, 8.0]);
        transformB.begin(context);
        context.drawImage(textures["egg.png"], 0, 0, 1, 1);
        transformB.end(context);
    }
}

preload();
