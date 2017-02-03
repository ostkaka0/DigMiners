import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";
import Command from "Game/Command/Command.js";

var CommandEntityLookAtEntity = function(entityId, targetEntityId) {
    this.entityId = entityId;
    this.targetEntityId = targetEntityId;
}
export default CommandEntityLookAtEntity;
Command.Register.push(CommandEntityLookAtEntity);

CommandEntityLookAtEntity.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    var targetEntity = Global.gameData.world.entityWorld.objects[this.targetEntityId];
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
