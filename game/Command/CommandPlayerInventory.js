
InventoryActions = {
    ADD_ORE: 0,
    REMOVE_ORE: 1,
    ADD_ITEM: 2,
    REMOVE_ITEM: 3,
    DROP_STACK: 4
}

CommandPlayerInventory = function(playerId, actionId, itemId, amount) {
    this.playerId = playerId;
    this.actionId = actionId;
    this.itemId = itemId;
    this.amount = amount;
}

CommandPlayerInventory.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if (!player) return;
    var entity = gameData.entityWorld.objects[player.entityId];
    if (!entity) return;
    if (this.actionId == InventoryActions.ADD_ORE) {
        if (!player.oreInventory[this.itemId])
            player.oreInventory[this.itemId] = 0;
        player.oreInventory[this.itemId] += this.amount;
    } else if (this.actionId == InventoryActions.REMOVE_ORE) {
        if (!player.oreInventory[this.itemId])
            player.oreInventory[this.itemId] = 0;
        player.oreInventory[this.itemId] -= this.amount;
    } else if (this.actionId == InventoryActions.ADD_ITEM) {
        entity.inventory.addItem(gameData, this.itemId, this.amount);
    } else if (this.actionId == InventoryActions.REMOVE_ITEM) {
        var removed = entity.inventory.removeItem(gameData, this.itemId, this.amount);
        for (var i = 0; i < removed.length; ++i) {
            // Dequip item when removed from inventory
            var entry = removed[i];
            var stackId = entry[0];
            var item = entry[1];
            var itemType = gameData.itemRegister[item.id];
            if (item.equipped)
                player.onDequip(stackId, itemType);
        };
    } else if (this.actionId == InventoryActions.DROP_STACK) {
        var item = entity.inventory.removeStack(this.itemId);
    }
    if (!isServer && global.player && this.playerId == global.player.playerId) {
        updateHUD(gameData);
        checkCanAffordRecipe();
    }
}

CommandPlayerInventory.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.actionId);
    serializeInt32(byteArray, index, this.itemId);
    serializeInt32(byteArray, index, this.amount);
}

CommandPlayerInventory.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.actionId = deserializeInt32(byteArray, index);
    this.itemId = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
}

CommandPlayerInventory.prototype.getSerializationSize = function() {
    return 16;
}
