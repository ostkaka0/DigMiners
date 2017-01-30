var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize

var Config = require("game/Config.js")
var Global = require("game/Global.js")

var CommandPlayerOreInventoryActions = {
    ADD_ORE: 0,
    REMOVE_ORE: 1
}

var CommandPlayerOreInventory = function(playerId, actionId, itemId, amount) {
    this.playerId = playerId;
    this.actionId = actionId;
    this.itemId = itemId;
    this.amount = amount;
}
CommandPlayerOreInventory.Actions = CommandPlayerOreInventoryActions
module.exports = CommandPlayerOreInventory

CommandPlayerOreInventory.prototype.execute = function() {
    var player = Global.gameData.playerWorld.objects[this.playerId];
    if (!player) return;
    if (this.actionId == CommandPlayerOreInventory.Actions.ADD_ORE) {
        if (!player.oreInventory[this.itemId])
            player.oreInventory[this.itemId] = 0;
        player.oreInventory[this.itemId] += this.amount;
    } else if (this.actionId == CommandPlayerOreInventory.Actions.REMOVE_ORE) {
        if (!player.oreInventory[this.itemId])
            player.oreInventory[this.itemId] = 0;
        player.oreInventory[this.itemId] -= this.amount;
    }
    if (!isServer && global.player && this.playerId == global.player.playerId) {
        Global.gameData.HUD.update();
        Global.gameData.HUD.checkCanAffordRecipe();
    }
}

CommandPlayerOreInventory.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.actionId);
    Serialize.int32(byteArray, index, this.itemId);
    Serialize.int32(byteArray, index, this.amount);
}

CommandPlayerOreInventory.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.actionId = Deserialize.int32(byteArray, index);
    this.itemId = Deserialize.int32(byteArray, index);
    this.amount = Deserialize.int32(byteArray, index);
}

CommandPlayerOreInventory.prototype.getSerializationSize = function() {
    return 16;
}
