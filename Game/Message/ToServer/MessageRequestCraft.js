import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import IndexCounter from "Engine/IndexCounter.js";

import Global from "Game/Global.js";
import Message from "Game/Message/Message.js";
import CommandEntityInventory from "Game/Command/CommandEntityInventory.js";
import CommandPlayerOreInventory from "Game/Command/CommandPlayerOreInventory.js";

var MessageRequestCraft = function(recipeId) {
    this.recipeId = recipeId;
}
export default MessageRequestCraft;
Message.ToServer.push(MessageRequestCraft);

MessageRequestCraft.prototype.execute = function(gameData, player) {
    var playerEntity = Global.gameData.entityWorld.objects[player.entityId];
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

MessageRequestCraft.prototype.receive = function(gameData, data) {
    this.recipeId = data;
}
