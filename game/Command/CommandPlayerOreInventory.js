
OreInventoryActions = {
    ADD_ORE: 0,
    REMOVE_ORE: 1
}

CommandPlayerOreInventory = function(playerId, actionId, itemId, amount) {
    this.playerId = playerId;
    this.actionId = actionId;
    this.itemId = itemId;
    this.amount = amount;
}

CommandPlayerOreInventory.prototype.execute = function() {
    var player = gameData.playerWorld.objects[this.playerId];
    if (!player) return;
    if (this.actionId == OreInventoryActions.ADD_ORE) {
        if (!player.oreInventory[this.itemId])
            player.oreInventory[this.itemId] = 0;
        player.oreInventory[this.itemId] += this.amount;
    } else if (this.actionId == OreInventoryActions.REMOVE_ORE) {
        if (!player.oreInventory[this.itemId])
            player.oreInventory[this.itemId] = 0;
        player.oreInventory[this.itemId] -= this.amount;
    }
    if (!isServer && global.player && this.playerId == global.player.playerId) {
        updateHUD(gameData);
        checkCanAffordRecipe();
    }
}

CommandPlayerOreInventory.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.actionId);
    serializeInt32(byteArray, index, this.itemId);
    serializeInt32(byteArray, index, this.amount);
}

CommandPlayerOreInventory.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.actionId = deserializeInt32(byteArray, index);
    this.itemId = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
}

CommandPlayerOreInventory.prototype.getSerializationSize = function() {
    return 16;
}
