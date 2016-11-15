
InventoryActions = {
    ADD_ITEM: 0,
    REMOVE_ITEM: 1,
    DROP_STACK: 2
}

CommandEntityInventory = function(entityId, actionId, itemId, amount) {
    this.entityId = entityId;
    this.actionId = actionId;
    this.itemId = itemId;
    this.amount = amount;
}

CommandEntityInventory.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity || !entity.inventory) return;
    if (this.actionId == InventoryActions.ADD_ITEM) {
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
                Entity.onDequip(entity, stackId, itemType);
        };
    } else if (this.actionId == InventoryActions.DROP_STACK) {
        var item = entity.inventory.removeStack(this.itemId);
    }
    if (!isServer && global.playerEntity && this.entityId == global.playerEntity.id) {
        updateHUD(gameData);
        checkCanAffordRecipe();
    }
}

CommandEntityInventory.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.actionId);
    serializeInt32(byteArray, index, this.itemId);
    serializeInt32(byteArray, index, this.amount);
}

CommandEntityInventory.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.actionId = deserializeInt32(byteArray, index);
    this.itemId = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
}

CommandEntityInventory.prototype.getSerializationSize = function() {
    return 16;
}
