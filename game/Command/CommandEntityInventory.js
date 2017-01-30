var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Entity = require("game/Entity/Entity.js")

var CommandEntityInventoryActions = {
    ADD_ITEM: 0,
    REMOVE_ITEM: 1,
    DROP_STACK: 2
}

var CommandEntityInventory = function(entityId, actionId, itemId, amount) {
    this.entityId = entityId;
    this.actionId = actionId;
    this.itemId = itemId;
    this.amount = amount;
}
module.exports = CommandEntityInventory
CommandEntityInventory.Actions = CommandEntityInventoryActions;

CommandEntityInventory.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.inventory) return;
    if (this.actionId == CommandEntityInventory.Actions.ADD_ITEM) {
        entity.inventory.addItem(Global.gameData, this.itemId, this.amount);
    } else if (this.actionId == CommandEntityInventory.Actions.REMOVE_ITEM) {
        var removed = entity.inventory.removeItem(Global.gameData, this.itemId, this.amount);
        for (var i = 0; i < removed.length; ++i) {
            // Dequip item when removed from inventory
            var entry = removed[i];
            var stackId = entry[0];
            var item = entry[1];
            var itemType = Config.itemRegister[item.id];
            if (item.equipped)
                Entity.onDequip(entity, stackId, itemType);
        };
    } else if (this.actionId == CommandEntityInventory.Actions.DROP_STACK) {
        var item = entity.inventory.removeStack(this.itemId);
    }
    if (!isServer && global.playerEntity && this.entityId == global.playerEntity.id) {
        Global.gameData.HUD.update();
        Global.gameData.HUD.checkCanAffordRecipe();
    }
}

CommandEntityInventory.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.actionId);
    Serialize.int32(byteArray, index, this.itemId);
    Serialize.int32(byteArray, index, this.amount);
}

CommandEntityInventory.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.actionId = Deserialize.int32(byteArray, index);
    this.itemId = Deserialize.int32(byteArray, index);
    this.amount = Deserialize.int32(byteArray, index);
}

CommandEntityInventory.prototype.getSerializationSize = function() {
    return 16;
}
