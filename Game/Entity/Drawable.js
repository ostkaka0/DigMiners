
class EntityDrawable {
    constructor(/*zindex / layer*/) {
        this.sprites = {};
        this.spriteTransforms = {};
        this.spriteVars = {};
    }

    addSprite(name, sprite, offset, rotateWithBody) {
        this.sprites[name] = sprite;
        this.spriteVars[name] = { offset: offset, rotateWithBody: rotateWithBody };
        this.spriteTransforms[name] = new DrawTransform(offset);
    }

    removeSprite(name) {
        delete this.sprites[name];
        delete this.spriteTransforms[name];
        delete this.spriteVars[name];
    }

    draw(mat, dt, entity) {
        var pos = entity.physicsBody.getPos();
        var angle = entity.physicsBody.angle;
        var keys = Object.keys(this.sprites);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            //var transform = this.spriteTransforms[key];
            var transform = [32. * pos[0], 32. * pos[1], 1., 1., (this.spriteVars[key].rotateWithBody) ? angle : 0.0];
            var spriteMat = Mat3.fromTransform(transform);
            Mat3.mul(mat, spriteMat, spriteMat);
            if (this.sprites[key] instanceof Sprite) {
                this.sprites[key].updateMat(spriteMat)
                if (this.sprites[key].isVisible(Client.canvas.width, Client.canvas.height))
                    WorldRenderer.zindices[1].push(this.sprites[key]);
            } else if (this.sprites[key] instanceof TextSprite) {
                //this.sprites[key].draw(context);
            }
        }
    }

    positionSprites(x, y, angle) {
        // TODO: TOFIX: BodyParts:
        /*for (var key in this.sprites) {
            var sprite = this.sprites[key];
            sprite.pos[0] = x + (sprite.offset ? sprite.offset[0] : 0);
            sprite.pos[1] = y + (sprite.offset ? sprite.offset[1] : 0);
            if (sprite.rotateWithBody)
                sprite.angle = angle;
        }*/
    }

    positionAll(x, y, rotation, bodyParts) {
        this.positionSprites(x, y, rotation);
        //if (bodyParts)
        //    bodyParts.positionBodyparts(x, y, rotation);
    }

    setBodypartSprite(bodypart, sprite) {
        // TODO: TOFIX: BodyParts:
        /*var index = -1;
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
        }*/
    }

    initializeBodyparts(bodyParts) {
        // TODO: TOFIX: BodyParts:
        /*// Add bodypart sprite to world
        for (var key in bodyParts) {
            var bodypart = bodyParts[key];
            this.container.add(bodypart.sprite);
        }*/
    }

    remove(bodyParts) {
        for (var sprite in this.sprites) {
            var sprite = this.sprites[sprite];
            if (!isServer)
                this.container.remove(sprite);
        }
        // TODO: TOFIX: BodyParts:
        /*if (bodyParts) {
            for (var bodypart in bodyParts) {
                bodypart = bodyParts[bodypart];
                if (!isServer)
                    this.container.remove(bodypart.sprite);
            }
        }*/
    }

}
TypeRegister.add(RegisterEntity, EntityDrawable);





/*
var EntityDrawable = function(zindex) {
    this.sprites = {};
    this.zindex = (!zindex ? 0 : zindex);
    if (isServer)
        return;

    if (!isServer) {
        this.container = new SpriteContainer();
        Client.zindices[this.zindex].add(this.container);
    }
}
global.EntityDrawable = EntityDrawable;
TypeRegister.add(RegisterEntity, EntityDrawable);

EntityDrawable.prototype.name = drawable.name; function drawable() { };

EntityDrawable.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.zindex);

    Serialize.int32(byteArray, index, Object.keys(this.sprites).length);
    for (var sprite in this.sprites) {
        Serialize.utf8(byteArray, index, sprite);
        var sprite = this.sprites[sprite];
        Serialize.utf8(byteArray, index, sprite.textureName);
        Serialize.v2(byteArray, index, sprite.offset);
        Serialize.int8(byteArray, index, (sprite.rotateWithBody ? 1 : 0));
        Serialize.int8(byteArray, index, (sprite.noAnchor ? 1 : 0));
    }
}

EntityDrawable.prototype.deserialize = function(byteArray, index) {
    this.zindex = Deserialize.int32(byteArray, index);
    this.zindex = (!this.zindex ? 0 : this.zindex);
    if (!isServer) {
        this.container = new SpriteContainer();
        Client.zindices[this.zindex].add(this.container);
    }

    // Sprites
    this.sprites = {};
    var spritesLength = Deserialize.int32(byteArray, index);
    for (var i = 0; i < spritesLength; ++i) {
        var spriteName = Deserialize.utf8(byteArray, index);
        var textureName = Deserialize.utf8(byteArray, index);
        var offset = Deserialize.v2(byteArray, index);
        var rotateWithBody = Deserialize.int8(byteArray, index);
        if (rotateWithBody == 1)
            rotateWithBody = true;
        else
            rotateWithBody = false;
        var noAnchor = Deserialize.int8(byteArray, index);
        if (noAnchor == 1)
            noAnchor = true;
        else
            noAnchor = false;
        this.addSprite(spriteName, new Sprite(textureName), offset, rotateWithBody);
    }
}

EntityDrawable.prototype.getSerializationSize = function() {
    var size = 8;
    for (var sprite in this.sprites) {
        size += Serialize.utf8Size(sprite);
        var sprite = this.sprites[sprite];
        size += Serialize.utf8Size((!sprite.textureName ? "" : sprite.textureName));
        size += 10;
    }
    return size;
}

EntityDrawable.prototype.destroy = function(entity) {
    this.remove(entity.bodyParts.bodyParts);
}

// Add a sprite that follows this drawable. For example, a healthbar.
EntityDrawable.prototype.addSprite = function(name, sprite, offset, rotateWithBody) {
    if (this.sprites[name])
        this.removeSprite(name);
    this.sprites[name] = sprite;
    this.sprites[name].offset = offset;
    this.sprites[name].rotateWithBody = rotateWithBody;
    if (!isServer)
        this.container.add(this.sprites[name]);
}

EntityDrawable.prototype.removeSprite = function(name) {
    var sprite = this.sprites[name];
    if (sprite) {
        if (!isServer)
            this.container.remove(sprite);
        delete this.sprites[name];
    }
}

EntityDrawable.prototype.positionSprites = function(x, y, angle) {
    if (isServer)
        return;

    for (var key in this.sprites) {
        var sprite = this.sprites[key];
        sprite.pos[0] = x + (sprite.offset ? sprite.offset[0] : 0);
        sprite.pos[1] = y + (sprite.offset ? sprite.offset[1] : 0);
        if (sprite.rotateWithBody)
            sprite.angle = angle;
    }
}

EntityDrawable.prototype.positionAll = function(x, y, rotation, bodyParts) {
    this.positionSprites(x, y, rotation);
    if (bodyParts)
        bodyParts.positionBodyparts(x, y, rotation);
}

EntityDrawable.prototype.setBodypartSprite = function(bodypart, sprite) {
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

EntityDrawable.prototype.initializeBodyparts = function(bodyParts) {
    // Add bodypart sprite to world
    for (var key in bodyParts) {
        var bodypart = bodyParts[key];
        this.container.add(bodypart.sprite);
    }
}

EntityDrawable.prototype.remove = function(bodyParts) {
    for (var sprite in this.sprites) {
        var sprite = this.sprites[sprite];
        if (!isServer)
            this.container.remove(sprite);
    }

    if (bodyParts) {
        for (var bodypart in bodyParts) {
            bodypart = bodyParts[bodypart];
            if (!isServer)
                this.container.remove(bodypart.sprite);
        }
    }
}*/
