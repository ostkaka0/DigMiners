Drawable = function(gameData, bodyparts, zindex) {
    this.bodyparts = bodyparts;
    this.sprites = {};
    if(!zindex)
        zindex = 0;
    this.zindex = zindex;
    if(isServer)
        return;
    if(gameData)
        this.animationManager = gameData.animationManager;

    var zindexContainer = zindices[zindex];
    this.container = new PIXI.Container();
    zindexContainer.addChild(this.container);

    // Add bodypart sprites to world
    this.addBodyparts(this.bodyparts, this);
}

Drawable.prototype.addBodyparts = function(bodyparts, that, parent) {
    if(bodyparts) {
        for(var key in bodyparts) {
            bodypart = bodyparts[key];
            if(parent) {
                bodypart.isChild = true;
                bodypart.parent = parent;
                that.bodyparts[key] = bodypart;
            }
            var bodypart2 = bodypart;
            this.addBodyparts(bodypart.children, that, bodypart);
            if(!bodypart2.sprite.sprite.fake) {
                //console.log("added " + key + " to container");
                that.container.addChild(bodypart2.sprite.sprite);
            }
        }
    }
}

Drawable.prototype.name = "drawable";

Drawable.prototype.serializeBodyparts = function(byteArray, index, bodyparts) {
    serializeInt32(byteArray, index, Object.keys(bodyparts).length);
    for(var key in bodyparts) {
        var bodypart = bodyparts[key];
        var textureName = bodypart.sprite.textureName;
        serializeUTF8(byteArray, index, key);
        serializeUTF8(byteArray, index, textureName);
        serializeFix(byteArray, index, bodypart.offset[0]);
        serializeFix(byteArray, index, bodypart.offset[1]);
        serializeFix(byteArray, index, bodypart.offset[2]);
        serializeV2(byteArray, index, bodypart.pivot);
        if(!bodypart.children)
            serializeInt32(byteArray, index, 0);
        else {
            this.serializeBodyparts(byteArray, index, bodypart.children);
        }
    }
}

Drawable.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.zindex);
    this.serializeBodyparts(byteArray, index, this.bodyparts);
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
}

Drawable.prototype.deserializeBodyparts = function(byteArray, index, gameData) {
    var bodyparts = {};
    var bodypartsLength = deserializeInt32(byteArray, index);
    for(var i = 0; i < bodypartsLength; ++i) {
        var key = deserializeUTF8(byteArray, index);
        var textureName = deserializeUTF8(byteArray, index);
        var offset = [deserializeFix(byteArray, index), deserializeFix(byteArray, index), deserializeFix(byteArray, index)];
        var pivot = deserializeV2(byteArray, index);
        var sprite = new Sprite(textureName);
        var children = this.deserializeBodyparts(byteArray, index, gameData);
        bodyparts[key] = new BodyPart(sprite, offset[0], offset[1], offset[2], pivot, children);
    }
    return bodyparts;
}

Drawable.prototype.deserialize = function(byteArray, index, gameData) {
    this.zindex = deserializeInt32(byteArray, index);
    this.animationManager = gameData.animationManager;
    if(!isServer) {
        if(!this.zindex)
            this.zindex = 0;
        var zindexContainer = zindices[this.zindex];
        this.container = new PIXI.Container();
        zindexContainer.addChild(this.container);
    }
    this.bodyparts = this.deserializeBodyparts(byteArray, index, gameData);
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
    if(!isServer) {
        // Add bodypart sprites to world
        this.addBodyparts(this.bodyparts, this);
    }
}

Drawable.prototype.getBodypartsSerializationSize = function(bodyparts) {
    var size = 4;
    for(var key in bodyparts) {
        var bodypart = bodyparts[key];
        console.log(key);
        var textureName = bodypart.sprite.textureName;
        size += getUTF8SerializationSize(key);
        size += getUTF8SerializationSize(textureName);
        size += 20;
        if(!bodypart.children)
            size += 4;
        else {
            size += this.getBodypartsSerializationSize(bodypart.children);
        }
    }
    return size;
}

Drawable.prototype.getSerializationSize = function() {
    var size = 9;
    size += this.getBodypartsSerializationSize(this.bodyparts);
    for(var sprite in this.sprites) {
        size += getUTF8SerializationSize(sprite);
        sprite = this.sprites[sprite];
        size += getUTF8SerializationSize(sprite.textureName);
        size += 9;
    }
    return size;
}

// Add a sprite that follows this drawable. For example, a healthbar.
Drawable.prototype.addSprite = function(name, sprite, offset, rotateWithBody) {
    if(this.sprites[name])
        this.removeSprite(name);
    this.sprites[name] = sprite;
    if(!isServer && offset) {
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
        if(!isServer)
            this.container.removeChild(sprite.sprite);
        delete this.sprites[name];
    }
}

Drawable.prototype.setBodypartSprite = function(name, bodypart, sprite) {
    var childIndex = -1;
    if(!isServer && !bodypart.sprite.sprite.fake) {
        childIndex = this.container.getChildIndex(bodypart.sprite.sprite);
        this.container.removeChild(bodypart.sprite.sprite);
    }
    bodypart.sprite = sprite;
    this.bodyparts[name].sprite = sprite;
    if(!isServer) {
        if(childIndex != -1)
            this.container.addChildAt(sprite.sprite, childIndex);
        else
            this.container.addChild(sprite.sprite);
    }
}

Drawable.prototype.positionAll = function(x, y, rotation) {
    if(isServer)
        return;

    for(var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        if(!bodypart.isChild)
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