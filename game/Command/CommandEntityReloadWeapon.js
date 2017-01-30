var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var Event = require("engine/Core/Event.js")

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Command = require("game/Command/Command.js")
var Items = require("game/Items.js")
var Ammo = require("game/Entity/Ammo.js")

var CommandEntityReloadWeapon = function(entityId, stackId) {
    this.entityId = entityId;
    this.stackId = stackId;
}
module.exports = CommandEntityReloadWeapon
Command.Register.push(module.exports)

CommandEntityReloadWeapon.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.inventory) return;
    var item = entity.inventory.items[this.stackId];
    var itemType = Config.itemRegister[item.id];
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
