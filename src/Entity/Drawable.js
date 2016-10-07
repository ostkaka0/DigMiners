Drawable = function(gameData, bodyparts, zindex) {
    this.bodyparts = bodyparts;
    this.sprites = {};
    this.zindex = (!zindex ? 0 : zindex);
    if(isServer)
        return;

    this.container = new PIXI.Container();
    zindices[this.zindex].addChild(this.container);

    // Set parents
    for(var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        bodypart.name = key;
        if(bodypart.parent) {
            var name = bodypart.parent;
            bodypart.parent = this.bodyparts[name];
        }
    }

    for(var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        bodypart.children = this.getChildren(bodypart);
        if(!bodypart.sprite.sprite.fake) {
            // Add bodypart sprite to world
            this.container.addChild(bodypart.sprite.sprite);
        }
    }
}

Drawable.prototype.name = "drawable";

Drawable.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.zindex);

    // Bodyparts
    serializeInt32(byteArray, index, Object.keys(this.bodyparts).length);
    for(var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        serializeUTF8(byteArray, index, key);
        serializeUTF8(byteArray, index, (!bodypart.parent ? "" : bodypart.parent));
        serializeUTF8(byteArray, index, bodypart.sprite.textureName);
        serializeFix(byteArray, index, bodypart.offset[0]);
        serializeFix(byteArray, index, bodypart.offset[1]);
        serializeFix(byteArray, index, bodypart.offset[2]);
        serializeV2(byteArray, index, bodypart.pivot);
    }

    // Sprites
    serializeInt32(byteArray, index, Object.keys(this.sprites).length);
    for(var sprite in this.sprites) {
        serializeUTF8(byteArray, index, sprite);
        sprite = this.sprites[sprite];
        serializeUTF8(byteArray, index, sprite.textureName);
        serializeV2(byteArray, index, sprite.offset);
        serializeInt8(byteArray, index, (sprite.rotateWithBody ? 1 : 0));
        serializeInt8(byteArray, index, (sprite.noAnchor ? 1 : 0));
    }
}

Drawable.prototype.deserialize = function(byteArray, index, gameData) {
    this.zindex = deserializeInt32(byteArray, index);
    this.zindex = (!this.zindex ? 0 : this.zindex);
    if(!isServer) {
        this.container = new PIXI.Container();
        zindices[this.zindex].addChild(this.container);
    }

    // Bodyparts
    this.bodyparts = {};
    var bodypartsLength = deserializeInt32(byteArray, index);
    for(var i = 0; i < bodypartsLength; ++i) {
        var key = deserializeUTF8(byteArray, index);
        var parent = deserializeUTF8(byteArray, index);
        var textureName = deserializeUTF8(byteArray, index);
        var offset = [deserializeFix(byteArray, index), deserializeFix(byteArray, index), deserializeFix(byteArray, index)];
        var pivot = deserializeV2(byteArray, index);
        var sprite = new Sprite(textureName);
        this.bodyparts[key] = new BodyPart(sprite, offset[0], offset[1], offset[2], pivot);
        if(parent && parent.length > 0)
            this.bodyparts[key].parent = parent;
    }

    // Sprites
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
        // Set parents
        for(var key in this.bodyparts) {
            var bodypart = this.bodyparts[key];
            bodypart.name = key;
            if(bodypart.parent) {
                var name = bodypart.parent;
                bodypart.parent = this.bodyparts[name];
            }
        }

        for(var key in this.bodyparts) {
            var bodypart = this.bodyparts[key];
            bodypart.children = this.getChildren(bodypart);
            if(!bodypart.sprite.sprite.fake) {
                // Add bodypart sprite to world
                this.container.addChild(bodypart.sprite.sprite);
            }
        }
    }
}

Drawable.prototype.getSerializationSize = function() {
    var size = 12;

    // Bodyparts
    for(var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        var parent = (!bodypart.parent ? "" : bodypart.parent);
        var textureName = bodypart.sprite.textureName;
        size += getUTF8SerializationSize(key);
        size += getUTF8SerializationSize(parent);
        size += getUTF8SerializationSize(textureName);
        size += 20;
    }

    // Sprites
    for(var sprite in this.sprites) {
        size += getUTF8SerializationSize(sprite);
        sprite = this.sprites[sprite];
        size += getUTF8SerializationSize(sprite.textureName);
        size += 10;
    }
    return size;
}

Drawable.prototype.getChildren = function(parent) {
    if(!parent)
        return [];
    var output = [];
    for(var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        if(bodypart.parent && bodypart.parent.name == parent.name)
            output.push(bodypart);
    }
    return output;
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
        if(!bodypart.parent)
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