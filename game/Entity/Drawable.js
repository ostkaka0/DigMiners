Drawable = function(zindex) {
    this.sprites = {};
    this.zindex = (!zindex ? 0 : zindex);
    if (isServer)
        return;

    this.container = new SpriteContainer();
    zindices[this.zindex].add(this.container);
}

Drawable.prototype.name = drawable.name; function drawable() { };

Drawable.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.zindex);

    serializeInt32(byteArray, index, Object.keys(this.sprites).length);
    for (var sprite in this.sprites) {
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
    if (!isServer) {
        this.container = new SpriteContainer();
        zindices[this.zindex].add(this.container);
    }

    // Sprites
    this.sprites = {};
    var spritesLength = deserializeInt32(byteArray, index);
    for (var i = 0; i < spritesLength; ++i) {
        var spriteName = deserializeUTF8(byteArray, index);
        var textureName = deserializeUTF8(byteArray, index);
        var offset = deserializeV2(byteArray, index);
        var rotateWithBody = deserializeInt8(byteArray, index);
        if (rotateWithBody == 1)
            rotateWithBody = true;
        else
            rotateWithBody = false;
        var noAnchor = deserializeInt8(byteArray, index);
        if (noAnchor == 1)
            noAnchor = true;
        else
            noAnchor = false;
        this.addSprite(spriteName, new Sprite(textureName), offset, rotateWithBody);
    }
}

Drawable.prototype.getSerializationSize = function() {
    var size = 8;
    for (var sprite in this.sprites) {
        size += getUTF8SerializationSize(sprite);
        sprite = this.sprites[sprite];
        size += getUTF8SerializationSize((!sprite.textureName ? "" : sprite.textureName));
        size += 10;
    }
    return size;
}

Drawable.prototype.destroy = function(entity) {
    this.remove(entity.bodyparts.bodyparts);
}

// Add a sprite that follows this drawable. For example, a healthbar.
Drawable.prototype.addSprite = function(name, sprite, offset, rotateWithBody) {
    if (this.sprites[name])
        this.removeSprite(name);
    this.sprites[name] = sprite;
    this.sprites[name].offset = offset;
    this.sprites[name].rotateWithBody = rotateWithBody;
    if (!isServer)
        this.container.add(this.sprites[name]);
}

Drawable.prototype.removeSprite = function(name) {
    var sprite = this.sprites[name];
    if (sprite) {
        if (!isServer)
            this.container.remove(sprite);
        delete this.sprites[name];
    }
}

Drawable.prototype.positionSprites = function(x, y, angle) {
    if (isServer)
        return;

    for (var key in this.sprites) {
        sprite = this.sprites[key];
        sprite.pos[0] = x + (sprite.offset ? sprite.offset[0] : 0);
        sprite.pos[1] = y + (sprite.offset ? sprite.offset[1] : 0);
        if (sprite.rotateWithBody)
            sprite.angle = angle;
    }
}

Drawable.prototype.positionAll = function(x, y, rotation, bodyparts) {
    this.positionSprites(x, y, rotation);
    if (bodyparts)
        bodyparts.positionBodyparts(x, y, rotation);
}

Drawable.prototype.setBodypartSprite = function(bodypart, sprite) {
    var index = -1;
    if (!isServer && !bodypart.sprite.fake)
        index = this.container.remove(bodypart.sprite);
    bodypart.sprite = sprite;
    bodypart.offset[0] = bodypart.defaultOffset[0];
    bodypart.offset[1] = bodypart.defaultOffset[1];
    bodypart.offset[2] = bodypart.defaultOffset[2];
    if (!isServer) {
        if (index != -1)
            this.container.container.splice(index, 0, sprite);
        else
            this.container.add(sprite);
    }
}

Drawable.prototype.initializeBodyparts = function(bodyparts) {
    // Add bodypart sprite to world
    for (var key in bodyparts) {
        var bodypart = bodyparts[key];
        this.container.add(bodypart.sprite);
    }
}

Drawable.prototype.remove = function(bodyparts) {
    for (var sprite in this.sprites) {
        sprite = this.sprites[sprite];
        if (!isServer)
            this.container.remove(sprite);
    }

    if (bodyparts) {
        for (var bodypart in bodyparts) {
            bodypart = bodyparts[bodypart];
            if (!isServer)
                this.container.remove(bodypart.sprite);
        }
    }
}
