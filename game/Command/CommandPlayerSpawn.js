var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Command = require("game/Command/Command.js")

var CommandPlayerSpawn = function(playerId, entityId, playerName) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.playerName = playerName;
}
module.exports = CommandPlayerSpawn
Command.Register.push(module.exports)

CommandPlayerSpawn.prototype.execute = function() {
    // Associate with existing, already spawned entity (from MessageRequestSpawn)
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    var player = Global.gameData.playerWorld.objects[this.playerId];
    player.entityId = this.entityId;
    if (isServer)
        player.name = this.playerName;

    if (!isServer && global.player.id == this.playerId) {
        global.playerEntityId = this.entityId;
        global.playerEntity = entity;
        Global.gameData.HUD.update();
        Global.gameData.world.events.trigger("ownPlayerSpawned", entity, player);
    }
    Global.gameData.world.events.trigger("playerSpawned", entity, player);
}

CommandPlayerSpawn.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.utf8(byteArray, index, this.playerName);
}

CommandPlayerSpawn.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
    this.playerName = Deserialize.utf8(byteArray, index);
}

CommandPlayerSpawn.prototype.getSerializationSize = function() {
    return 8 + Serialize.utf8Size(this.playerName);
}
