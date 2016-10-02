Drawable = function(bodyparts, animationManager, zindex) {
    this.bodyparts = bodyparts;
    this.sprites = {};
    if(isServer)
        return;
    this.animationManager = animationManager;
    if(!zindex)
        zindex = 0;
    var zindexContainer = zindices[zindex];
    this.container = new PIXI.Container();
    zindexContainer.addChild(this.container);

    // Add bodypart sprites to world
    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        this.container.addChild(bodypart.sprite.sprite);
    }
}

Drawable.prototype.name = "drawable";

Drawable.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.zindex);
    serializeInt32(byteArray, index, Object.keys(this.bodyparts).length);
    for(var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        var textureName = bodypart.sprite.textureName;
        serializeUTF8(byteArray, index, key);
        serializeUTF8(byteArray, index, textureName);
        serializeFix(byteArray, index, bodypart.offset[0]);
        serializeFix(byteArray, index, bodypart.offset[1]);
        serializeFix(byteArray, index, bodypart.offset[2]);
    }
    serializeInt32(byteArray, index, Object.keys(this.sprites).length);
    console.dir(this.sprites);
    for(var sprite in this.sprites) {
        serializeUTF8(byteArray, index, sprite);
        sprite = this.sprites[sprite];
        serializeUTF8(byteArray, index, sprite.textureName);
        serializeV2(byteArray, index, sprite.offset);
        serializeInt8(byteArray, index, (sprite.rotateWithBody ? 1 : 0));
        serializeInt8(byteArray, index, (sprite.noAnchor ? 1 : 0));
    }
    console.log("drawable serialized!");
}

Drawable.prototype.deserialize = function(byteArray, index, gameData) {
    this.zindex = deserializeInt32(byteArray, index);
    this.animationManager = animationManager;
    if(!isServer) {
        if(!this.zindex)
            this.zindex = 0;
        var zindexContainer = zindices[this.zindex];
        this.container = new PIXI.Container();
        zindexContainer.addChild(this.container);
    }
    this.bodyparts = {};
    var bodypartsLength = deserializeInt32(byteArray, index);
    for(var i = 0; i < bodypartsLength; ++i) {
        var key = deserializeUTF8(byteArray, index);
        var textureName = deserializeUTF8(byteArray, index);
        var offset = [deserializeFix(byteArray, index), deserializeFix(byteArray, index), deserializeFix(byteArray, index)];
        this.bodyparts[key] = new BodyPart(new Sprite(textureName), offset[0], offset[1], offset[2]);
    }
    this.sprites = {};
    var spritesLength = deserializeInt32(byteArray, index);
    for(var i = 0; i < spritesLength; ++i) {
        var spriteName = deserializeUTF8(byteArray, index);
        var textureName = deserializeUTF8(byteArray, index);
        var offset = deserializeV2(byteArray, index);
        var rotateWithBody = deserializeInt8(byteArray, index);
        if(rotateWithBody == 1)
            rotateWithBody = true;
        else
            rotateWithBody = false;
        var noAnchor = deserializeInt8(byteArray, index);
        if(noAnchor == 1)
            noAnchor = true;
        else
            noAnchor = false;
        this.addSprite(spriteName, new Sprite(textureName, null, noAnchor), offset, rotateWithBody);
    }
    this.animationManager = animationManager;
    if(!isServer) {
        // Add bodypart sprites to world
        for(var bodypart in this.bodyparts) {
            bodypart = this.bodyparts[bodypart];
            this.container.addChild(bodypart.sprite.sprite);
        }
    }
}

Drawable.prototype.getSerializationSize = function() {
    var size = 13;
    for(var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        var textureName = bodypart.sprite.textureName;
        size += getUTF8SerializationSize(key);
        size += getUTF8SerializationSize(textureName);
        size += 12;
    }
    for(var sprite in this.sprites) {
        size += getUTF8SerializationSize(sprite);
        sprite = this.sprites[sprite];
        size += getUTF8SerializationSize(sprite.textureName);
        size += 9;
    }
    return size;
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
    this.sprites[name] = sprite;
    if(!isServer) {
        this.sprites[name].sprite.pivot.x = -offset[0];
        this.sprites[name].sprite.pivot.y = -offset[1];
    }
    this.sprites[name].offset = offset;
    this.sprites[name].rotateWithBody = rotateWithBody;
    if(!isServer)
        this.container.addChild(this.sprites[name].sprite);
}

Drawable.prototype.removeSprite = function(name) {
    var sprite = this.sprites[name];
    if(sprite) {
        this.container.removeChild(sprite.sprite);
        delete this.sprites[name];
    }
}

Drawable.prototype.positionAll = function(x, y, rotation) {
    if(isServer)
        return;

    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        bodypart.position(x, y, rotation);
    }

    for(var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        sprite.sprite.position.x = x;
        sprite.sprite.position.y = y;
        if(sprite.rotateWithBody)
            sprite.sprite.rotation = rotation;
    }
}

Drawable.prototype.remove = function() {
    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        if(!isServer)
            this.container.removeChild(bodypart.sprite.sprite);
    }

    for(var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        if(!isServer)
            this.container.removeChild(sprite.sprite);
    }
}