






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
global.CommandEntityInventory = CommandEntityInventory;
RegisterCommand.push(CommandEntityInventory);
CommandEntityInventory.Actions = CommandEntityInventoryActions;

CommandEntityInventory.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    if (!entity || !entity.inventory) return;
    if (this.actionId == CommandEntityInventory.Actions.ADD_ITEM) {
        entity.inventory.addItem(gameData, this.itemId, this.amount);
    } else if (this.actionId == CommandEntityInventory.Actions.REMOVE_ITEM) {
        console.log(entity.inventory.isStatic(this.itemId));
        if (entity.controlledByPlayer && RegisterItem[this.itemId].oreRecipe && entity.inventory.isStatic(this.itemId)) {
            var player = gameData.playerWorld.objects[entity.controlledByPlayer.playerId];
            player.consumeOreRecipe(RegisterItem[this.itemId].oreRecipe);
            if (player.calcOreRecipeQuantity(RegisterItem[this.itemId].oreRecipe) == 0 && entity.equippedItems) {
                entity.isBuilding = false;
                Event.trigger(EntityEquippedItems.Events.onDequip, entity, this.stackId, RegisterItem[this.itemId]);
                if (!isServer && entity.bodyparts && entity.bodyparts.bodyparts["tool"])
                    entity.bodyparts.bodyparts["tool"].sprite.visible = false;
            }
        } else {
            var removed = entity.inventory.removeItem(gameData, this.itemId, this.amount);
            if (isServer) {
                for (var i = 0; i < removed.length; ++i) {
                    // Dequip item when removed from inventory
                    var entry = removed[i];
                    var stackId = entry[0];
                    var item = entry[1];
                    var itemType = RegisterItem[item.id];
                    if (item.equipped)
                        sendCommand(new CommandEntityEquipItem(entity.id, stackId, itemType.id, false));
                };
            }
        }
    } else if (this.actionId == CommandEntityInventory.Actions.DROP_STACK) {
        var item = entity.inventory.removeStack(this.itemId);
    }
    if (!isServer && global.playerEntity && this.entityId == global.playerEntity.id) {
        gameData.HUD.update();
        gameData.HUD.checkCanAffordRecipe();
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
