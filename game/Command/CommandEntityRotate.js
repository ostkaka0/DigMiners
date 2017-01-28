import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import { Serialize, Deserialize } from "engine/Serialization.js"

import Config from "game/Config.js"
import Global from "game/Global.js"

var CommandEntityRotate = function(entityId, direction) {
    this.entityId = entityId;
    this.direction = direction;
}
export default CommandEntityRotate

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
