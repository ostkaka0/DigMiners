var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d", { antialias: true });
var image = new Image();
var startTime = Date.now();
var textures = null;
var sprites = null;
var bodyPart = null;
var bodyParts = {};

preload = function() {
    textures = loadTextures("data/textures/", ["block.png", "egg.png", "feet.png", "head.png", "leftArm.png", "rightArm.png"], load, function(percentage, name) {
        console.log(percentage + "% complete. (" + name + ")");
    });
    sprites = {
        feet: new Sprite(textures["feet.png"], [0, 0, 75, 75], 60),
        head: new Sprite(textures["head.png"], [0, 0, 75, 75]),
        leftArm: new Sprite(textures["leftArm.png"], [0, 0, 22, 34]),
        rightArm: new Sprite(textures["rightArm.png"], [0, 0, 22, 34]),
    }
    bodyParts = {
        feet: new BodyPart(sprites.feet, 0, new DrawTransform([0, 0]), new DrawTransform([0, 0], 0, [0.8 * 75, 0.8 * 75], [0.5, 0.5])),
        head: new BodyPart(sprites.head, 0, new DrawTransform([256, 128], 0, [1, 1]), new DrawTransform([0, 0], 0, [0.8 * 75, 0.8 * 75], [0.5, 0.5])),
        leftArm: new BodyPart(sprites.leftArm, 0, new DrawTransform([0, 0]), new DrawTransform([0, -2], 0, [0.7 * 22, 32], [0.5, 0.7])),
        rightArm: new BodyPart(sprites.rightArm, 0, new DrawTransform([0, 0]), new DrawTransform([0, 2], 0, [0.7 * 22, 32], [0.5, 0.3])),
    }
    bodyParts.head.children.push(bodyParts.feet);
    bodyParts.head.children.push(bodyParts.leftArm);
    bodyParts.head.children.push(bodyParts.rightArm);
    bodyPart = bodyParts.head;
    bodyPartsSetAnimation(bodyParts, {
        leftArm: [new DrawTransform([0, 0], 0.4 * 3.14159265, [1.0, 1.0], [0.0, 0.0]),
                  new DrawTransform([0, 0], 0.3 * 3.14159265, [1.0, 1.0], [0.0, 0.0])],
        head: [new DrawTransform([0, 0], 0, [1.0, 1.0], [0.0, 0.0]),
               new DrawTransform([0, 0], 0, [1.0, 1.0], [0.0, 0.0])],
    }, 2.0);
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
    var transformA = new DrawTransform([64, 64], 0.1 * time, [64.0, 32.0]);
    transformA.begin(context);
    context.drawImage(textures["block.png"], 0, 0, 1, 1);
    transformA.end(context);
    for (var i = 0; i < 1000; i++) {
        var sprite = sprites.feet;
        var spriteRect = sprite.getRect((time * 60 + i >> 0) % 60);
        var transformB = new DrawTransform([600 + 400 * Math.sin(0.1 * time + i / 4), 200 + 0.6 * i], 0.1 * time + i / 2, [32.0, 32.0]);
        transformB.begin(context);
        context.drawImage(sprite.image, spriteRect[0], spriteRect[1], spriteRect[2], spriteRect[3], 0, 0, 1, 1);
        transformB.end(context);
    }
    bodyPart.draw(context, 1.0 / 60.0);
}

preload();
