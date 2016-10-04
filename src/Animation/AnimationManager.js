AnimationManager = function() {
    this.animations = {};
    this.cycles = {};
}

AnimationManager.prototype.load = function() {
    //this.addAnimation("walk", new Animation("walk", textures.walk, 30, 150, 120));
    this.addAnimation("feet", new Animation("feet", textures.feet, 60, 75, 75));
    //this.addAnimation("dig", new Animation("dig", textures.dig, 60, 75, 75));
    this.addAnimation("tool", new Animation("tool", textures.tool, 64, 75, 75));
    //this.addAnimation("octopus-walk", new Animation("octopus-walk", textures.octopus, 60, 256, 256));
    this.addCycle("rightArm", new Cycle([
        [0,        // x
            0,     // y
            -0.5,      // angle
            32],    // num frames
        [0,
            0,
            0,
            32]
    ]));
}

AnimationManager.prototype.addAnimation = function(name, animation) {
    if(name != undefined && animation != undefined) {
        if(this.animations[name] == undefined)
            this.animations[name] = animation;
        else
            console.log("Tried to add already added animation");
    }
    else
        console.log("Tried to add animation/key null");
}

AnimationManager.prototype.addCycle = function(name, cycle) {
    if(name != undefined && cycle != undefined) {
        if(this.cycles[name] == undefined)
            this.cycles[name] = cycle;
        else
            console.log("Tried to add already added cycle");
    }
    else
        console.log("Tried to add cycle/key null");
}

AnimationManager.prototype.update = function() {
    var entityWorld = gameData.entityWorld;
    if(!entityWorld)
        console.error("Missing gameData.entityWorld");
    var now = new Date();
    entityWorld.objectArray.forEach(function(entity) {
        if(entity.drawable) {
            var drawable = entity.drawable;
            for(var bodypart in drawable.bodyparts) {
                bodypart = drawable.bodyparts[bodypart];
                if(bodypart.animating) {
                    var diff = now - bodypart.lastFrame;

                    while(diff >= bodypart.mspf) {
                        diff -= bodypart.mspf;
                        bodypart.lastFrame = new Date();
                        bodypart.currentFrame += 1;
                        if(bodypart.currentFrame >= bodypart.animInstance.numFrames)
                            bodypart.currentFrame = 0;
                        bodypart.sprite.sprite.texture.frame = bodypart.animInstance.frames[bodypart.currentFrame];

                        if(bodypart.runToEnd && bodypart.currentFrame == 0) {
                            bodypart.animating = false;
                            bodypart.finishing = false;
                        }
                    }
                } else if(bodypart.cycleInstance) {
                    var diff = now - bodypart.cycleInstance.lastFrame;

                    while(diff >= bodypart.cycleInstance.mspf) {
                        diff -= bodypart.cycleInstance.mspf;
                        bodypart.cycleInstance.lastFrame = new Date();
                        bodypart.cycleInstance.currentFrame += 1;
                        if(bodypart.cycleInstance.currentFrame >= bodypart.cycleInstance.cycle.numFrames)
                            bodypart.cycleInstance.currentFrame = 0;
                        bodypart.cycleOffset = [bodypart.cycleInstance.cycle.frames[bodypart.cycleInstance.currentFrame][0],
                            bodypart.cycleInstance.cycle.frames[bodypart.cycleInstance.currentFrame][1],
                            bodypart.cycleInstance.cycle.frames[bodypart.cycleInstance.currentFrame][2]];

                        if(bodypart.cycleInstance.runToEnd && bodypart.cycleInstance.currentFrame == 0) {
                            bodypart.cycleInstance = false;
                            bodypart.cycleInstance.finishing = false;
                        }
                    }
                }
            }
        }
    });
}
