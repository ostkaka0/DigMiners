import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import CommandRegister from "Engine/Register/Command.js";

var CommandEntityAnimate = function(entityId, bodypart, animation, speed) {
    this.entityId = entityId;
    this.bodypart = bodypart;
    this.animation = animation;
    this.speed = speed;
}
export default CommandEntityAnimate;
CommandRegister.push(CommandEntityAnimate);

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
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.utf8(byteArray, index, this.bodypart);
    Serialize.utf8(byteArray, index, this.animation);
    Serialize.fix(byteArray, index, this.speed);
}

CommandEntityAnimate.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.bodypart = Deserialize.utf8(byteArray, index);
    this.animation = Deserialize.utf8(byteArray, index);
    this.speed = Deserialize.fix(byteArray, index);
}

CommandEntityAnimate.prototype.getSerializationSize = function() {
    return 8 + Serialize.utf8Size(this.bodypart) + Serialize.utf8Size(this.animation);
}
