import { Serialize, Deserialize } from "engine/Serialization.js"

import Config from "game/Config.js"
import gameData from "game/GameData.js"

var CommandEntityLookAtEntity = function(entityId, targetEntityId) {
    this.entityId = entityId;
    this.targetEntityId = targetEntityId;
}
export default CommandEntityLookAtEntity

CommandEntityLookAtEntity.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    var targetEntity = gameData.world.entityWorld.objects[this.targetEntityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.entityLookTarget = targetEntity;
}

CommandEntityLookAtEntity.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.targetEntityId);
}

CommandEntityLookAtEntity.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.targetEntityId = Deserialize.int32(byteArray, index);
}

CommandEntityLookAtEntity.prototype.getSerializationSize = function() {
    return 8;
}
