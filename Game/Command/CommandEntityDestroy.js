import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import Config from "Game/Config.js";

import CommandRegister from "Engine/Register/Command.js";

var CommandEntityDestroy = function(entityId) {
    this.entityId = entityId;
}
export default CommandEntityDestroy;
CommandRegister.push(CommandEntityDestroy);

CommandEntityDestroy.prototype.execute = function() {
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    global.gameData.world.entityWorld.remove(entity);
}

CommandEntityDestroy.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
}

CommandEntityDestroy.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandEntityDestroy.prototype.getSerializationSize = function() {
    return 4;
}
