
Player = function(playerId, entityId, name) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.name = name;
    this.text = null;
    this.inventory = new Inventory();
    this.oreInventory = new Array();
}

Player.prototype.setName = function(name, gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(this.text)
        entity.drawable.removeSprite("username");
    this.text = new PIXI.Text(name, { fontFamily: 'Monospace', fontSize: 15, fill: 0xffffff, align: 'center' });
    var sprite = new Sprite(null, this.text, true);
    entity.drawable.addSprite("username", sprite, v2.create(- this.text.width / 2, -60), false);
}

Player.prototype.getDigSpeed = function() {
    var defaultDigSpeed = 0.0;
    var itemType = this.inventory.getEquippedItemType("tool");
    if(!itemType || itemType.typeOfType != "shovel") return defaultDigSpeed;
    return itemType.digSpeed;
}

Player.prototype.getMaxDigHardness = function() {
    var defaultMaxDigHardness = 0.0;
    var itemType = this.inventory.getEquippedItemType("tool");
    if(!itemType || itemType.typeOfType != "shovel") return defaultMaxDigHardness;
    return itemType.maxDigHardness;
}

Player.prototype.hasRequiredRecipeResources = function(recipe) {
    for(var j = 0; j < recipe.requiredItems.length; ++j) {
        var itemType = recipe.requiredItems[j][0];
        var amount = recipe.requiredItems[j][1];
        if(this.inventory.hasItem(itemType.id, amount) === false)
            return false;
    }
    for(var j = 0; j < recipe.requiredOres.length; ++j) {
        var tileType = recipe.requiredOres[j][0];
        var amount = recipe.requiredOres[j][1] * 256.0;
        if(!this.oreInventory[tileType.id] || this.oreInventory[tileType.id] < amount)
            return false;
    }
    return true;
}

Player.prototype.onEquip = function(stackId, itemType) {
    if(itemType.typeOfType == "block")
        this.isBuilding = true;
}

Player.prototype.onDequip = function(stackId, itemType) {
    if(itemType.typeOfType == "block")
        this.isBuilding = false;
}

Player.prototype.canPlaceBlock = function(gameData, x, y) {
    var distBlockPos = [x * 32 + 16, y * 32 + 16];
    var entity = gameData.entityWorld.objects[this.entityId];
    if(!entity) return false;
    var bodies = [];
    gameData.physicsWorld.getBodiesInRadius(bodies, [x + 0.5, y + 0.5], 0.25);
    if(bodies.length != 0) return false;
    var distPlayerPos = [entity.physicsBody.pos[0] * 32, entity.physicsBody.pos[1] * 32];
    var dist = Math.sqrt((distPlayerPos[0] - distBlockPos[0]) * (distPlayerPos[0] - distBlockPos[0]) + (distPlayerPos[1] - distBlockPos[1]) * (distPlayerPos[1] - distBlockPos[1]));
    var blockChunkX = Math.floor(x / BLOCK_CHUNK_DIM);
    var blockChunkY = Math.floor(y / BLOCK_CHUNK_DIM);
    var blockChunk = gameData.blockWorld.get(blockChunkX, blockChunkY);
    var localX = Math.floor(x) - blockChunkX * BLOCK_CHUNK_DIM;
    var localY = Math.floor(y) - blockChunkY * BLOCK_CHUNK_DIM;
    if(dist < gameData.blockPlaceDistance && (!blockChunk || !blockChunk.getForeground(localX, localY)))
        return true;
    return false;
}

Player.prototype.destroy = function(player) {

}