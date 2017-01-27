import { Serialize, Deserialize } from "engine/Serialization.js"

var Bodyparts = function(bodyparts) {
    this.bodyparts = bodyparts;

    // Set parents
    for (var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        bodypart.name = key;
        if (bodypart.parent) {
            var name = bodypart.parent;
            bodypart.parent = this.bodyparts[name];
        }
    }

    for (var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        bodypart.children = this.getChildren(bodypart.name);
    }
}
export default Bodyparts

Bodyparts.prototype.name = bodyparts.name; function bodyparts() { };

Bodyparts.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, Object.keys(this.bodyparts).length);
    for (var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
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
        serializeBooleans(byteArray, index, booleans);
    }
}

Bodyparts.prototype.deserialize = function(byteArray, index, gameData) {
    this.bodyparts = {};
    var bodypartsLength = Deserialize.int32(byteArray, index);
    for (var i = 0; i < bodypartsLength; ++i) {
        var key = Deserialize.utf8(byteArray, index);
        var parent = Deserialize.utf8(byteArray, index);
        var textureName = Deserialize.utf8(byteArray, index);
        var offset = [Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index)];
        var defaultOffset = [Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index), Deserialize.fix(byteArray, index)];
        var pivot = Deserialize.v2(byteArray, index);
        var disableRotation = deserializeBooleans(byteArray, index)[0];
        var sprite = new Sprite(textureName);
        this.bodyparts[key] = new BodyPart(sprite, defaultOffset[0], defaultOffset[1], defaultOffset[2], pivot, null, disableRotation);
        this.bodyparts[key].offset = offset;
        if (parent && parent.length > 0)
            this.bodyparts[key].parent = parent;
    }

    if (!isServer) {
        // Set parents
        for (var key in this.bodyparts) {
            var bodypart = this.bodyparts[key];
            bodypart.name = key;
            if (bodypart.parent) {
                var name = bodypart.parent;
                bodypart.parent = this.bodyparts[name];
            }
        }

        for (var key in this.bodyparts) {
            var bodypart = this.bodyparts[key];
            bodypart.children = this.getChildren(bodypart.name);
        }
    }
}

Bodyparts.prototype.getSerializationSize = function() {
    var size = 4;

    for (var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        var parent = (!bodypart.parent ? "" : bodypart.parent.name);
        var textureName = bodypart.sprite.textureName;
        size += Serialize.utf8Size(key);
        size += Serialize.utf8Size(parent);
        size += Serialize.utf8Size((!textureName ? "" : textureName));
        size += 33;
    }
    return size;
}

Bodyparts.prototype.destroy = function(entity) {

}

Bodyparts.prototype.getChildren = function(parentName) {
    var output = [];
    for (var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        if (bodypart.parent && bodypart.parent.name == parentName)
            output.push(bodypart);
    }
    return output;
}

Bodyparts.prototype.positionBodyparts = function(x, y, rotation) {
    for (var bodypart in this.bodyparts) {
        bodypart = this.bodyparts[bodypart];
        if (!bodypart.parent)
            bodypart.position(x, y, rotation);
    }
}
