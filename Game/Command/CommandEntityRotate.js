import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";
import CommandRegister from "Game/Register/Command.js";

var CommandEntityRotate = function(entityId, direction) {
    this.entityId = entityId;
    this.direction = direction;
}
export default CommandEntityRotate;
CommandRegister.push(CommandEntityRotate);

CommandEntityRotate.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.rotationDirection = this.direction;
}

CommandEntityRotate.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.v2(byteArray, index, this.direction);
}

CommandEntityRotate.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.direction = Deserialize.v2(byteArray, index);
}

CommandEntityRotate.prototype.getSerializationSize = function() {
    return 12;
}
