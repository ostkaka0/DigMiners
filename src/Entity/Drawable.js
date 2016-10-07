Drawable = function(zindex) {
    this.sprites = {};
    this.zindex = (!zindex ? 0 : zindex);
    if(isServer)
        return;

    this.container = new PIXI.Container();
    zindices[this.zindex].addChild(this.container);
}

Drawable.prototype.name = "drawable";

Drawable.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.zindex);

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
}

Drawable.prototype.getSerializationSize = function() {
    var size = 8;
    for(var sprite in this.sprites) {
        size += getUTF8SerializationSize(sprite);
        sprite = this.sprites[sprite];
        size += getUTF8SerializationSize(sprite.textureName);
        size += 10;
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

Drawable.prototype.positionSprites = function(x, y, rotation) {
    if(isServer)
        return;

    for(var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        sprite.sprite.position.x = x;
        sprite.sprite.position.y = y;
        if(sprite.rotateWithBody)
            sprite.sprite.rotation = rotation;
    }
}

Drawable.prototype.positionAll = function(x, y, rotation, bodyparts) {
    this.positionSprites(x, y, rotation);
    if(bodyparts)
        bodyparts.positionBodyparts(x, y, rotation);
}

Drawable.prototype.setBodypartSprite = function(bodypart, sprite) {
    var childIndex = -1;
    if(!isServer && !bodypart.sprite.sprite.fake) {
        childIndex = this.container.getChildIndex(bodypart.sprite.sprite);
        this.container.removeChild(bodypart.sprite.sprite);
    }
    bodypart.sprite = sprite;
    if(!isServer) {
        if(childIndex != -1)
            this.container.addChildAt(sprite.sprite, childIndex);
        else
            this.container.addChild(sprite.sprite);
    }
}

Drawable.prototype.initializeBodyparts = function(bodyparts) {
    // Add bodypart sprite to world
    for(var key in bodyparts) {
        var bodypart = bodyparts[key];
        if(!bodypart.sprite.sprite.fake)
            this.container.addChild(bodypart.sprite.sprite);
    }
}

Drawable.prototype.remove = function(bodyparts) {
    for(var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        if(!isServer)
            this.container.removeChild(sprite.sprite);
    }

    for(var bodypart in bodyparts) {
        bodypart = bodyparts[bodypart];
        if(!isServer)
            this.container.removeChild(bodypart.sprite.sprite);
    }
}