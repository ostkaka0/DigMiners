
var Player = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.classId = 0;
    this.text = null;
    this.deathTick = global.gameData.world.tickId;
    this.oreInventory = new Array();
    this.xp = 0;
    this.level = 1;
}
Player.events = { onLevelChange: new Map(), onXPChange: new Map() };

Player.prototype.getRequiredXP = function() {
    var requiredXP = 10 * Math.pow(10.0, (this.level-1)/10.0);
    return 10 * Math.round( requiredXP / Math.pow(10, Math.floor(Math.log10(requiredXP/10)))) *  Math.pow(10, Math.floor(Math.log10(requiredXP/10)));
}

Player.prototype.addXP = function(xp) {
    var oldLevel = this.level;
    var requiredXP = this.getRequiredXP();
    this.xp += xp;
    while(this.xp >= requiredXP) {
        this.xp -= requiredXP;
        this.level++;
        requiredXP = this.getRequiredXP();
    }
    Event.trigger(Player.events.onXPChange, this);
    if (oldLevel != this.level)
        Event.trigger(Player.events.onLevelChange, this);
}

Player.prototype.hasRequiredRecipeResources = function(recipe) {
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
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
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return false;
    var bodies = [];
    global.gameData.world.physicsWorld.getBodiesInRadius(bodies, [x + 0.5, y + 0.5], 0.0);
    if (bodies.length != 0) return false;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return false;
    var distPlayerPos = [physicsBody.getPos()[0] * 32, physicsBody.getPos()[1] * 32];
    var dist = Math.sqrt((distPlayerPos[0] - distBlockPos[0]) * (distPlayerPos[0] - distBlockPos[0]) + (distPlayerPos[1] - distBlockPos[1]) * (distPlayerPos[1] - distBlockPos[1]));
    var blockChunkX = Math.floor(x / BlockChunk.dim);
    var blockChunkY = Math.floor(y / BlockChunk.dim);
    var blockChunk = global.gameData.world.blockWorld.get([blockChunkX, blockChunkY]);
    var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
    var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;
    if (global.gameData.world.tileWorld.getDensity([x, y]) > 127) return false;
    if (dist < Config.blockPlaceDistance && (!blockChunk || !blockChunk.getForeground(localX, localY)))
        return true;
    return false;
}

Player.prototype.destroy = function(player) {

}
