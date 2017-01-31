var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize

var Command = require("Game/Command/Command.js")

CommandEntityAnimate = function(entityId, bodypart, animation, speed) {
    this.entityId = entityId;
    this.bodypart = bodypart;
    this.animation = animation;
    this.speed = speed;
}
module.exports = CommandEntityAnimate;
Command.Register.push(module.exports)

CommandEntityAnimate.prototype.execute = function() {
    if (!isServer) {
        var entity = gameData.world.entityWorld.objects[this.entityId];
        if (!entity || !entity.bodyparts) return;
        var bodypart = entity.bodyparts.bodyparts[this.bodypart];
        if (!bodypart) return;
        bodypart.animate(this.animation, this.speed, true);
    }
}

CommandEntityAnimate.prototype.Serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.utf8(byteArray, index, this.bodypart);
    Serialize.utf8(byteArray, index, this.animation);
    Serialize.fix(byteArray, index, this.speed);
}

CommandEntityAnimate.prototype.Deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.bodypart = Deserialize.utf8(byteArray, index);
    this.animation = Deserialize.utf8(byteArray, index);
    this.speed = Deserialize.fix(byteArray, index);
}

CommandEntityAnimate.prototype.getSerializationSize = function() {
    return 8 + Serialize.utf8Size(this.bodypart) + Serialize.utf8Size(this.animation);
}
