
var MessageRequestCraft = function(recipeId) {
    this.recipeId = recipeId;
}
TypeRegister.add(RegisterMessage.ToServer, MessageRequestCraft);

MessageRequestCraft.prototype.execute = function(player) {
    var playerEntity = World.entities.objects[player.entityId];
    if (!playerEntity) return;
    var recipe = Recipes[this.recipeId];
    if (!recipe) return;
    if (!player.hasRequiredRecipeResources(recipe)) return;
    for (var j = 0; j < recipe.requiredItems.length; ++j) {
        var itemType = recipe.requiredItems[j][0];
        var amount = recipe.requiredItems[j][1];
        sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.REMOVE_ITEM, itemType.id, amount));
    }
    for (var j = 0; j < recipe.requiredOres.length; ++j) {
        var tileType = recipe.requiredOres[j][0];
        var amount = recipe.requiredOres[j][1] * 256.0;
        sendCommand(new CommandPlayerOreInventory(player.playerId, CommandPlayerOreInventory.Actions.REMOVE_ORE, tileType.id, amount));
    }
    for (var j = 0; j < recipe.item.length; ++j) {
        var resultItemType = recipe.item[j][0];
        var amount = recipe.item[j][1];
        sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.ADD_ITEM, resultItemType.id, amount));
    }
}

MessageRequestCraft.prototype.send = function(socket) {
    socket.emit(this.idString, this.recipeId);
}

MessageRequestCraft.prototype.receive = function(data) {
    this.recipeId = data;
}
