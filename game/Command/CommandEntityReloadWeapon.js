import { Serialize, Deserialize } from "engine/Serialization.js"

import Config from "game/Config.js"
import gameData from "game/GameData.js"

var CommandEntityReloadWeapon = function(entityId, stackId) {
    this.entityId = entityId;
    this.stackId = stackId;
}
export default CommandEntityReloadWeapon

CommandEntityReloadWeapon.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.inventory) return;
    var item = entity.inventory.items[this.stackId];
    var itemType = Config.itemRegister[item.id];
    if (!item) return;
    var ammoAmount = (entity.ammo) ? entity.ammo[item.id] || 0 : itemType.ammoCapacity;
    var ammoToReload = Math.min(ammoAmount, itemType.ammoCapacity - item.magazine);
    item.magazine += ammoToReload;
    if (entity.ammo && entity.ammo[item.id]) {
        entity.ammo[item.id] -= ammoToReload;
        Event.trigger(AmmoEvents.onChange, entity);
    }
}

CommandEntityReloadWeapon.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.stackId);
    Serialize.int32(byteArray, index, this.ammo);
}

CommandEntityReloadWeapon.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.stackId = Deserialize.int32(byteArray, index);
    this.ammo = Deserialize.int32(byteArray, index);
}

CommandEntityReloadWeapon.prototype.getSerializationSize = function() {
    return 12;
}
