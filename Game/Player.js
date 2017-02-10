import TileWorld from "Engine/TileWorld.js";
import BlockWorld from "Engine/BlockWorld.js";
import Chunk from "Engine/Chunk.js";
import BlockChunk from "Engine/BlockChunk.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";

var Player = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.text = null;
    this.deathTick = Global.gameData.world.tickId;
    this.oreInventory = new Array();
}
export default Player

Player.prototype.hasRequiredRecipeResources = function(recipe) {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return false;
    for (var j = 0; j < recipe.requiredItems.length; ++j) {
        var itemType = recipe.requiredItems[j][0];
        var amount = recipe.requiredItems[j][1];
        if (entity.inventory.hasItem(itemType.id, amount) === false)
            return false;
    }
    for (var j = 0; j < recipe.requiredOres.length; ++j) {
        var tileType = recipe.requiredOres[j][0];
        var amount = recipe.requiredOres[j][1] * 256.0;
        if (!this.oreInventory[tileType.id] || this.oreInventory[tileType.id] < amount)
            return false;
    }
    return true;
}

Player.prototype.canPlaceBlock = function(gameData, x, y) {
    var distBlockPos = [x * 32 + 16, y * 32 + 16];
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return false;
    var bodies = [];
    Global.gameData.world.physicsWorld.getBodiesInRadius(bodies, [x + 0.5, y + 0.5], 0.0);
    if (bodies.length != 0) return false;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return false;
    var distPlayerPos = [physicsBody.getPos()[0] * 32, physicsBody.getPos()[1] * 32];
    var dist = Math.sqrt((distPlayerPos[0] - distBlockPos[0]) * (distPlayerPos[0] - distBlockPos[0]) + (distPlayerPos[1] - distBlockPos[1]) * (distPlayerPos[1] - distBlockPos[1]));
    var blockChunkX = Math.floor(x / BlockChunk.dim);
    var blockChunkY = Math.floor(y / BlockChunk.dim);
    var blockChunk = Global.gameData.world.blockWorld.get([blockChunkX, blockChunkY]);
    var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
    var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;
    if (TileWorld.getDensity(Global.gameData.world.tileWorld, x, y) > 127) return false;
    if (dist < Config.blockPlaceDistance && (!blockChunk || !blockChunk.getForeground(localX, localY)))
        return true;
    return false;
}

Player.prototype.destroy = function(player) {

}
