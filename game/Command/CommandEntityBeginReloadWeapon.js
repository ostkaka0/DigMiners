import { Serialize, Deserialize } from "engine/Serialization.js"

import Config from "game/Config.js"
import Global from "game/Global.js"

var CommandEntityBeginReloadWeapon = function(entityId) {
    this.entityId = entityId;
}
export default CommandEntityBeginReloadWeapon

CommandEntityBeginReloadWeapon.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;
    entity.movement.isReloading = true;
    Global.gameData.world.events.trigger("beginReload", entity);
}

CommandEntityBeginReloadWeapon.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
}

CommandEntityBeginReloadWeapon.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandEntityBeginReloadWeapon.prototype.getSerializationSize = function() {
    return 4;
}
