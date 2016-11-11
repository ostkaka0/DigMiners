
MessageRequestCraft = function(recipeId) {
    this.recipeId = recipeId;
}

MessageRequestCraft.prototype.execute = function(gameData, player) {
    var recipe = Recipes[this.recipeId];
    if(!recipe) return;
    if(!player.hasRequiredRecipeResources(recipe)) return;
    for(var j = 0; j < recipe.requiredItems.length; ++j) {
        var itemType = recipe.requiredItems[j][0];
        var amount = recipe.requiredItems[j][1];
        var message = new MessagePlayerInventory(player.playerId, InventoryActions.REMOVE_ITEM, itemType.id, amount);
        message.execute(gameData);
        message.send(player.socket);
    }
    for(var j = 0; j < recipe.requiredOres.length; ++j) {
        var tileType = recipe.requiredOres[j][0];
        var amount = recipe.requiredOres[j][1] * 256.0;
        var message = new MessagePlayerInventory(player.playerId, InventoryActions.REMOVE_ORE, tileType.id, amount);
        message.execute(gameData);
        message.send(player.socket);
    }
    for(var j = 0; j < recipe.item.length; ++j) {
        var resultItemType = recipe.item[j][0];
        var amount = recipe.item[j][1];
        var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, resultItemType.id, amount);
        message.execute(gameData);
        message.send(player.socket);
    }
}

MessageRequestCraft.prototype.send = function(socket) {
    socket.emit(this.idString, this.recipeId);
}

MessageRequestCraft.prototype.receive = function(gameData, data) {
    this.recipeId = data;
}
