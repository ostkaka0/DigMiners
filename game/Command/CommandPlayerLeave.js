var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize

var Config = require("game/Config.js")
var Global = require("game/Global.js")

var CommandPlayerLeave = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
}
module.exports = CommandPlayerLeave

CommandPlayerLeave.prototype.execute = function() {
    var player = Global.gameData.playerWorld.objects[this.playerId];
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (player)
        Global.gameData.playerWorld.remove(player);
    if (entity)
        Global.gameData.world.entityWorld.remove(entity);
    if (isServer)
        console.log(player.name + " disconnected.");
    else if (entity && entity.nameComponent)
        Global.gameData.HUD.chat.write(entity.nameComponent.entityName + " disconnected.");
}

CommandPlayerLeave.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.entityId);
}

CommandPlayerLeave.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandPlayerLeave.prototype.getSerializationSize = function() {
    return 8;
}
