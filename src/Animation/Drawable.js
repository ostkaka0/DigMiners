Drawable = function(bodyparts, animationManager, zindex) {
    this.bodyparts = bodyparts;
    this.animationManager = animationManager;
    if(!zindex)
        zindex = 0;
    var zindexContainer = zindices[zindex];
    this.container = new PIXI.Container();
    zindexContainer.addChild(this.container);
    this.sprites = {};

    // Add bodypart sprites to world
    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        this.container.addChild(bodypart.sprite);
    }
}

Drawable.prototype.animate = function(bodypartName, animation, fps, runToEnd) {
    //console.log(bodypartName);
    var bodypart = this.bodyparts[bodypartName];
    if(bodypart) {
        if(!bodypart.animInstance) {
            bodypart.animInstance = this.animationManager.animations[animation];
            bodypart.sprite.texture = bodypart.animInstance.texture.clone();
        }
        bodypart.mspf = 1000.0 / fps;
        if(!bodypart.lastFrame || !bodypart.animating)
            bodypart.lastFrame = new Date();
        if(!bodypart.currentFrame)
            bodypart.currentFrame = 0;
        bodypart.runToEnd = runToEnd; //If animation is aborted, finish animation and stop at frame 0
        bodypart.finishing = false;
        bodypart.animating = true;
        //console.log(bodypart.currentFrame + " begin");
    }
}

Drawable.prototype.unanimate = function(bodypart, animation, runToEnd) {
    var bodypart = this.bodyparts[bodypart];
    if(bodypart) {
        if(runToEnd) {
            bodypart.runToEnd = true;
            bodypart.finishing = true;
        } else if(bodypart.runToEnd && bodypart.currentFrame != 0) {
            bodypart.finishing = true;
        }
        else {
            bodypart.animating = false;
        }
        //console.log(bodypart.currentFrame + " end");
    }
}

Drawable.prototype.cycle = function(bodypartName, cycle, fps, runToEnd) {
    var bodypart = this.bodyparts[bodypartName];
    if(bodypart) {
        if(!bodypart.sprite) {
            console.log("Cycle sprite null");
            return;
        }
        if(!bodypart.cycle) {
            bodypart.cycle = {};
            bodypart.cycle.cycle = this.animationManager.cycles[cycle];
        }
        bodypart.cycle.mspf = 1000.0 / fps;
        if(!bodypart.cycle.lastFrame || !bodypart.cycle)
            bodypart.cycle.lastFrame = new Date();
        if(!bodypart.cycle.currentFrame)
            bodypart.cycle.currentFrame = 0;
        bodypart.cycle.runToEnd = runToEnd; //If animation is aborted, finish animation and stop at frame 0
        bodypart.cycle.finishing = false;
    }
}

// Add a sprite that follows this drawable. For example, a healthbar.
Drawable.prototype.addSprite = function(name, sprite, offset, rotateWithBody) {
    this.sprites[name] = {};
    this.sprites[name].sprite = sprite;
    this.sprites[name].sprite.pivot.x = -offset[0];
    this.sprites[name].sprite.pivot.y = -offset[1];
    this.sprites[name].offset = v2.create(0, 0);
    this.sprites[name].rotateWithBody = rotateWithBody;
    this.container.addChild(sprite);
}

Drawable.prototype.removeSprite = function(name) {
    var sprite = this.sprites[name];
    if(sprite) {
        this.container.removeChild(sprite.sprite);
        delete this.sprites[name];
    }
}

Drawable.prototype.positionAll = function(x, y, rotation) {
    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        bodypart.position(x, y, rotation);
    }

    for(var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        sprite.sprite.position.x = x + sprite.offset[0];
        sprite.sprite.position.y = y + sprite.offset[1];
        if(sprite.rotateWithBody)
            sprite.sprite.rotation = rotation;
    }
}

Drawable.prototype.remove = function() {
    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        this.container.removeChild(bodypart.sprite);
    }

    for(var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        this.container.removeChild(sprite.sprite);
    }
}