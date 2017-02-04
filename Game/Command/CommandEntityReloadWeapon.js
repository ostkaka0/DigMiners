import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import Event from "Engine/Core/Event.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";
import ItemRegister from "Game/ItemRegister.js"
import Command from "Game/Command/Command.js";
import Items from "Game/Items.js";
import Ammo from "Game/Entity/Ammo.js";

var CommandEntityReloadWeapon = function(entityId, stackId) {
    this.entityId = entityId;
    this.stackId = stackId;
}
export default CommandEntityReloadWeapon;
Command.Register.push(CommandEntityReloadWeapon);

CommandEntityReloadWeapon.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.inventory) return;
    var item = entity.inventory.items[this.stackId];
    var itemType = ItemRegister[item.id];
    if (!item) return;
    var ammoAmount = (entity.ammo) ? entity.ammo[item.id] || 0 : itemType.ammoCapacity;
    var ammoToReload = Math.min(ammoAmount, itemType.ammoCapacity - item.magazine);
    item.magazine += ammoToReload;
    if (entity.ammo && entity.ammo[item.id]) {
        entity.ammo[item.id] -= ammoToReload;
        Event.trigger(Ammo.Events.onChange, entity);
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
