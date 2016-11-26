AnimationManager = function() {
    this.animations = {};
    this.cycles = {};
}

AnimationManager.prototype.load = function() {
    this.animations["feet"] = new Animation("feet", gameData.textures.feet, 60, 75, 75);
    //this.animations["dynamite"] = new Animation("dynamite", textures.DynamiteSheet, 64, 32, 32);

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
}

AnimationManager.prototype.update = function() {
    var entityWorld = gameData.entityWorld;
    if (!entityWorld)
        console.error("Missing gameData.entityWorld");
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.bodyparts) {
            forIn(this, entity.bodyparts.bodyparts, function(bodypart) {
                bodypart = entity.bodyparts.bodyparts[bodypart];

                if (bodypart.animInstance && bodypart.animInstance.animating) {
                    var diff = new Date() - bodypart.animInstance.lastFrame;

                    while (diff >= bodypart.animInstance.mspf) {
                        diff -= bodypart.animInstance.mspf;
                        bodypart.animInstance.lastFrame = new Date();
                        bodypart.animInstance.currentFrame += 1;
                        if (bodypart.animInstance.currentFrame >= bodypart.animInstance.animation.numFrames)
                            bodypart.animInstance.currentFrame = 0;
                        bodypart.sprite.sprite.texture.frame = bodypart.animInstance.animation.frames[bodypart.animInstance.currentFrame];

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
                                bodypart.cycleInstance.finishing = false;
                            }
                        } else
                            break;
                    }
                }
            });
        }
    });
}
