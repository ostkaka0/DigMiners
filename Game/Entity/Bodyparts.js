
class EntityBodyParts {
    constructor(bodyParts, root) {
        this.bodyParts = bodyParts;
        this.root = root;
    }

    setAnimation(animation, animationSpeed) {
        bodyPartsSetAnimation(this.bodyParts, animation, animationSpeed);
    }
}

EntityBodyParts.prototype.name = bodyParts.name; function bodyParts() {};


/*
var EntityBodyparts = function(bodyParts) {
    this.bodyParts = bodyParts;

    // Set parents
    for (var key in this.bodyParts) {
        var bodypart = this.bodyParts[key];
        bodypart.name = key;
        if (bodypart.parent) {
            var name = bodypart.parent;
            bodypart.parent = this.bodyParts[name];
        }
    }

    for (var key in this.bodyParts) {
        var bodypart = this.bodyParts[key];
        bodypart.children = this.getChildren(bodypart.name);
    }
}
global.EntityBodyparts = EntityBodyparts;
TypeRegister.add(RegisterEntity, EntityBodyparts);

EntityBodyparts.prototype.name = bodyParts.name; function bodyParts() { };

EntityBodyparts.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, Object.keys(this.bodyParts).length);
    for (var key in this.bodyParts) {
        var bodypart = this.bodyParts[key];
        Serialize.utf8(byteArray, index, key);
        Serialize.utf8(byteArray, index, (!bodypart.parent ? "" : bodypart.parent.name));
        Serialize.utf8(byteArray, index, bodypart.sprite.textureName);
        Serialize.fix(byteArray, index, bodypart.offset[0]);
        Serialize.fix(byteArray, index, bodypart.offset[1]);
        Serialize.fix(byteArray, index, bodypart.offset[2]);
        Serialize.fix(byteArray, index, bodypart.defaultOffset[0]);
        Serialize.fix(byteArray, index, bodypart.defaultOffset[1]);
        Serialize.fix(byteArray, index, bodypart.defaultOffset[2]);
        Serialize.v2(byteArray, index, bodypart.pivot);
        var booleans = [];
        booleans[0] = bodypart.disableRotation;
        booleans[1] = (bodypart.sprite && bodypart.sprite.frame ? true : false);
        Serialize.booleans(byteArray, index, booleans);
        if (bodypart.sprite && bodypart.sprite.frame) {
            Serialize.int32(byteArray, index, bodypart.sprite.frame[0]);
            Serialize.int32(byteArray, index, bodypart.sprite.frame[1]);
            Serialize.int32(byteArray, index, bodypart.sprite.frame[2]);
            Serialize.int32(byteArray, index, bodypart.sprite.frame[3]);
        }
    }
}

EntityBodyparts.prototype.deserialize = function(byteArray, index, gameData) {
    this.bodyParts = {};
    var bodypartsLength = Deserialize.int32(byteArray, index);
    for (var i = 0; i < bodypartsLength; ++i) {
        var key = Deserialize.utf8(byteArray, index);
        var parent = Deserialize.utf8(byteArray, index);
        var textureName = Deserialize.utf8(byteArray, index);
        var offset = [Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index)];
        var defaultOffset = [Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index)];
        var pivot = Deserialize.v2(byteArray, index);
        var booleans = Deserialize.booleans(byteArray, index);
        var disableRotation = booleans[0];
        var deserializeFrame = booleans[1];
        var sprite = new Sprite(textureName);
        if (deserializeFrame)
            sprite.frame = [Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index)];
        this.bodyParts[key] = new BodyPart(sprite, defaultOffset[0], defaultOffset[1], defaultOffset[2], pivot, null, disableRotation);
        this.bodyParts[key].offset = offset;
        if (parent && parent.length > 0)
            this.bodyParts[key].parent = parent;
    }

    if (!isServer) {
        // Set parents
        for (var key in this.bodyParts) {
            var bodypart = this.bodyParts[key];
            bodypart.name = key;
            if (bodypart.parent) {
                var name = bodypart.parent;
                bodypart.parent = this.bodyParts[name];
            }
        }

        for (var key in this.bodyParts) {
            var bodypart = this.bodyParts[key];
            bodypart.children = this.getChildren(bodypart.name);
        }
    }
}

EntityBodyparts.prototype.getSerializationSize = function() {
    var size = 4;

    for (var key in this.bodyParts) {
        var bodypart = this.bodyParts[key];
        var parent = (!bodypart.parent ? "" : bodypart.parent.name);
        var textureName = bodypart.sprite.textureName;
        size += Serialize.utf8Size(key);
        size += Serialize.utf8Size(parent);
        size += Serialize.utf8Size((!textureName ? "" : textureName));
        size += 33;
        if (bodypart.sprite && bodypart.sprite.frame)
            size += 16;
    }
    return size;
}

EntityBodyparts.prototype.destroy = function(entity) {

}

EntityBodyparts.prototype.getChildren = function(parentName) {
    var output = [];
    for (var key in this.bodyParts) {
        var bodypart = this.bodyParts[key];
        if (bodypart.parent && bodypart.parent.name == parentName)
            output.push(bodypart);
    }
    return output;
}

EntityBodyparts.prototype.positionBodyparts = function(x, y, rotation) {
    for (var bodypart in this.bodyParts) {
        bodypart = this.bodyParts[bodypart];
        if (!bodypart.parent)
            bodypart.position(x, y, rotation);
    }
}
*/
