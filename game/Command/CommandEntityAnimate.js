
CommandEntityAnimate = function(entityId, bodypart, animation, speed) {
    this.entityId = entityId;
    this.bodypart = bodypart;
    this.animation = animation;
    this.speed = speed;
}

CommandEntityAnimate.prototype.execute = function() {
    if (!isServer) {
        var entity = gameData.world.entityWorld.objects[this.entityId];
        if (!entity || !entity.bodyparts) return;
        var bodypart = entity.bodyparts.bodyparts[this.bodypart];
        if (!bodypart) return;
        bodypart.animate(this.animation, this.speed, true);
    }
}

CommandEntityAnimate.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.bodypart);
    serializeUTF8(byteArray, index, this.animation);
    serializeFix(byteArray, index, this.speed);
}

CommandEntityAnimate.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.bodypart = deserializeUTF8(byteArray, index);
    this.animation = deserializeUTF8(byteArray, index);
    this.speed = deserializeFix(byteArray, index);
}

CommandEntityAnimate.prototype.getSerializationSize = function() {
    return 8 + getUTF8SerializationSize(this.bodypart) + getUTF8SerializationSize(this.animation);
}
