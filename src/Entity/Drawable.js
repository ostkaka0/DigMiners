Drawable = function (stage, bodyparts, animationManager) {
    this.bodyparts = bodyparts; // sprite {}
    this.animationManager = animationManager;
    this.sprites = {};
    this.stage = stage;
    
    // Add bodypart sprites to world
    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        this.stage.addChild(bodypart.sprite);
    }
}

Drawable.prototype.animate = function(bodypartName, animation, fps, runToEnd) {
    //console.log(bodypartName);
    var bodypart = this.bodyparts[bodypartName];
    if(bodypart) {
        if(!bodypart.animInstance) {
            bodypart.animInstance = this.animationManager.getAnimation(animation);
            bodypart.sprite.texture = bodypart.animInstance.texture.clone();
        }
        bodypart.mspf = 1000.0/fps;
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

// Add a sprite that follows this drawable. For example, a healthbar.
Drawable.prototype.addSprite = function(name, sprite, offset, rotateWithBody) {
    this.sprites[name] = {};
    this.sprites[name].sprite = sprite;
    this.sprites[name].offset = offset;
    this.sprites[name].rotateWithBody = rotateWithBody;
    this.stage.addChild(sprite);
}

Drawable.prototype.removeSprite = function(name) {
    var sprite = this.sprites[name];
    if(sprite) {
        this.stage.removeChild(sprite.sprite);
        delete this.sprites[name];
    }
}

Drawable.prototype.positionAll = function(x, y, rotation) {
    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        bodypart.sprite.position.x = x;
        bodypart.sprite.position.y = y;
        bodypart.sprite.rotation = rotation;
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
        this.stage.removeChild(bodypart.sprite);
    }
    
    for(var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        this.stage.removeChild(sprite.sprite);
    }
}