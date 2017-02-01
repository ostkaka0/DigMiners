var Animation = require("Engine/Animation/Animation.js")
var Cycle = require("Engine/Animation/Cycle.js")

var AnimationManager = function() {
    this.animations = {};
    this.cycles = {};
}
module.exports = AnimationManager;

AnimationManager.prototype.load = function() {
    this.animations["feet"] = new Animation("feet", global.gameData.textures["feet.png"], 60, 75, 75);
    this.animations["dynamite"] = new Animation("dynamite", global.gameData.textures["dynamite.png"], 64, 32, 32);

    this.cycles["rightArm"] = new Cycle([
        [0,        // x
            0,     // y
            -0.5,      // angle
            32],    // num frames
        [0,
            0,
            0,
            32]
    ]);

    var actionAngle = 1.0;
    this.cycles["rightArmAction"] = new Cycle([
        [0,        // x
            0,     // y
            -actionAngle,      // angle
            32],    // num frames
        [0,
            0,
            0,
            32]
    ]);

    this.cycles["leftArmAction"] = new Cycle([
        [0,        // x
            0,     // y
            actionAngle,      // angle
            32],    // num frames
        [0,
            0,
            0,
            32]
    ]);

    this.cycles["rightArmGun"] = new Cycle([
        [3,        // x
            0,     // y
            0,      // angle
            128],    // num frames
        [0,
            0,
            0,
            128]
    ]);

    this.cycles["rightArmGunReload"] = new Cycle([
        [0,        // x
            0,     // y
            -0.5,      // angle
            40],    // num frames
        [0,        // x
            0,     // y
            -0.5,      // angle
            240],    // num frames
        [0,
            0,
            0,
            40]
    ]);

    this.cycles["leftArmGunReload"] = new Cycle([
        [-2,        // x
        -6,     // y
        -0.4,      // angle
            60],    // num frames

        [-2,
        -6,
        -0.4,
            20],

        [0,
            0,
            -0.4,
            40],

        [-2,
        -6,
        -0.4,
            40],

        [-2,
        -6,
        -0.4,
            20],

        [0,
            0,
            0,
            40]
    ]);

    this.cycles["gunReload"] = new Cycle([
        [0,        // x
            0,     // y
            1.3,      // angle
            40],    // num frames
        [0,        // x
            0,     // y
            1.3,      // angle
            240],    // num frames
        [0,
            0,
            0,
            40]
    ]);
}

AnimationManager.prototype.update = function() {
    var entityWorld = global.gameData.world.entityWorld;
    if (!entityWorld)
        console.error("Missing gameData.world.entityWorld");
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.bodyparts) {
            Object.keys(entity.bodyparts.bodyparts).forEach(function(bodypart) {
                bodypart = entity.bodyparts.bodyparts[bodypart];

                if (bodypart.animInstance && bodypart.animInstance.animating) {
                    var diff = new Date() - bodypart.animInstance.lastFrame;

                    while (diff >= bodypart.animInstance.mspf) {
                        diff -= bodypart.animInstance.mspf;
                        bodypart.animInstance.lastFrame = new Date();
                        bodypart.animInstance.currentFrame += 1;
                        if (bodypart.animInstance.currentFrame >= bodypart.animInstance.animation.numFrames)
                            bodypart.animInstance.currentFrame = 0;
                        bodypart.sprite.frame = bodypart.animInstance.animation.frames[bodypart.animInstance.currentFrame];

                        if (bodypart.animInstance.runToEnd && bodypart.animInstance.currentFrame == 0) {
                            bodypart.animInstance.animating = false;
                            bodypart.animInstance.finishing = false;
                        }
                    }
                } else if (bodypart.cycleInstance) {
                    while (true) {
                        var diff = new Date() - bodypart.cycleInstance.lastFrame + bodypart.cycleInstance.rest;

                        if (diff >= bodypart.cycleInstance.mspf) {
                            diff -= bodypart.cycleInstance.mspf;
                            bodypart.cycleInstance.rest = diff;
                            bodypart.cycleInstance.lastFrame = new Date();
                            bodypart.cycleInstance.currentFrame += 1;
                            if (bodypart.cycleInstance.currentFrame >= bodypart.cycleInstance.cycle.numFrames)
                                bodypart.cycleInstance.currentFrame = 0;
                            bodypart.cycleOffset = [bodypart.cycleInstance.cycle.frames[bodypart.cycleInstance.currentFrame][0],
                            bodypart.cycleInstance.cycle.frames[bodypart.cycleInstance.currentFrame][1],
                            bodypart.cycleInstance.cycle.frames[bodypart.cycleInstance.currentFrame][2]];

                            if (bodypart.cycleInstance.runToEnd && bodypart.cycleInstance.currentFrame == 0) {
                                bodypart.cycleInstance = false;
                                //bodypart.cycleInstance.finishing = false;
                            }
                        } else
                            break;
                    }
                }
            }.bind(this));
        }
    }.bind(this));
}
