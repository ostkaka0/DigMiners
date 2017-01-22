
Bodyparts = function(bodyparts) {
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

Bodyparts.prototype.name = bodyparts.name; function bodyparts() { };

Bodyparts.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, Object.keys(this.bodyparts).length);
    for (var key in this.bodyparts) {
        var bodypart = this.bodyparts[key];
        serializeUTF8(byteArray, index, key);
        serializeUTF8(byteArray, index, (!bodypart.parent ? "" : bodypart.parent.name));
        serializeUTF8(byteArray, index, bodypart.sprite.textureName);
        serializeFix(byteArray, index, bodypart.offset[0]);
        serializeFix(byteArray, index, bodypart.offset[1]);
        serializeFix(byteArray, index, bodypart.offset[2]);
        serializeFix(byteArray, index, bodypart.defaultOffset[0]);
        serializeFix(byteArray, index, bodypart.defaultOffset[1]);
        serializeFix(byteArray, index, bodypart.defaultOffset[2]);
        serializeV2(byteArray, index, bodypart.pivot);
    }
}

Bodyparts.prototype.deserialize = function(byteArray, index, gameData) {
    this.bodyparts = {};
    var bodypartsLength = deserializeInt32(byteArray, index);
    for (var i = 0; i < bodypartsLength; ++i) {
        var key = deserializeUTF8(byteArray, index);
        var parent = deserializeUTF8(byteArray, index);
        var textureName = deserializeUTF8(byteArray, index);
        var offset = [deserializeFix(byteArray, index), deserializeFix(byteArray, index), deserializeFix(byteArray, index)];
        var defaultOffset = [deserializeFix(byteArray, index), deserializeFix(byteArray, index), deserializeFix(byteArray, index)];
        var pivot = deserializeV2(byteArray, index);
        var sprite = new Sprite(textureName);
        this.bodyparts[key] = new BodyPart(sprite, defaultOffset[0], defaultOffset[1], defaultOffset[2], pivot);
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
        size += getUTF8SerializationSize(key);
        size += getUTF8SerializationSize(parent);
        size += getUTF8SerializationSize((!textureName ? "" : textureName));
        size += 32;
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
