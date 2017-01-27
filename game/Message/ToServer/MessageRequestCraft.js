import { Serialize, Deserialize } from "engine/Serialization.js"

var MessageRequestCraft = function(recipeId) {
    this.recipeId = recipeId;
}
export default MessageRequestCraft

MessageRequestCraft.prototype.execute = function(gameData, player) {
    var playerEntity = gameData.entityWorld.objects[player.entityId];
    if (!playerEntity) return;
    var recipe = Recipes[this.recipeId];
    if (!recipe) return;
    if (!player.hasRequiredRecipeResources(recipe)) return;
    for (var j = 0; j < recipe.requiredItems.length; ++j) {
        var itemType = recipe.requiredItems[j][0];
        var amount = recipe.requiredItems[j][1];
        sendCommand(new CommandEntityInventory(player.entityId, InventoryActions.REMOVE_ITEM, itemType.id, amount));
    }
    for (var j = 0; j < recipe.requiredOres.length; ++j) {
        var tileType = recipe.requiredOres[j][0];
        var amount = recipe.requiredOres[j][1] * 256.0;
        sendCommand(new CommandPlayerOreInventory(player.playerId, OreInventoryActions.REMOVE_ORE, tileType.id, amount));
    }
    for (var j = 0; j < recipe.item.length; ++j) {
        var resultItemType = recipe.item[j][0];
        var amount = recipe.item[j][1];
        sendCommand(new CommandEntityInventory(player.entityId, InventoryActions.ADD_ITEM, resultItemType.id, amount));
    }
}

MessageRequestCraft.prototype.send = function(socket) {
    socket.emit(this.idString, this.recipeId);
}

MessageRequestCraft.prototype.receive = function(gameData, data) {
    this.recipeId = data;
}
