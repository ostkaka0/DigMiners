var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Command = require("game/Command/Command.js")

var CommandEntityBeginReloadWeapon = function(entityId) {
    this.entityId = entityId;
}
module.exports = CommandEntityBeginReloadWeapon
Command.Register.push(module.exports)

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
