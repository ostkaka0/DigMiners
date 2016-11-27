
BlockPlacer = function(blockPos, blockId, duration, entityId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
    this.duration = duration;
    this.entityId = entityId;
}

BlockPlacer.prototype.name = blockPlacer.name; function blockPlacer() { };

BlockPlacer.prototype.update = function(entity) {
    if (!this.isInitialized) {
        this.isInitialized = true;
        var placerEntity = gameData.entityWorld.objects[this.entityId];
        placerEntity.blockPlacerId = entity.id;
    }
        
    this.duration--;
    var placerEntity = gameData.entityWorld.objects[this.entityId];
    var playerId = (placerEntity.controlledByPlayer)? placerEntity.controlledByPlayer.playerId : undefined;
    var player = (playerId != undefined)? gameData.playerWorld.objects[playerId] : undefined;
    var inventoryItem = (placerEntity && placerEntity.inventory)? placerEntity.inventory.getEquippedItemType("tool") : undefined;
    var bodiesInRadius = [];
    gameData.physicsWorld.getBodiesInRadius(bodiesInRadius, [this.blockPos[0]+0.5, this.blockPos[1]+0.5], 0.5);
    var buildFailure = false;
    
    if (!placerEntity || placerEntity.blockPlacerId != entity.id)
        buildFailure = true;
    if (player && !player.canPlaceBlock(gameData, this.blockPos[0], this.blockPos[1]))
        buildFailure = true;
    if (inventoryItem && inventoryItem.blockId != this.blockId)
        buildFailure = true;
    if (bodiesInRadius.length != 0)
        buildFailure = true;
    
    if (buildFailure) {
        placerEntity.blockPlacerId = undefined;
        gameData.entityWorld.remove(entity);
        return;
    }
    
    if (isServer && this.duration == 0) {
        sendCommand(new CommandPlaceBlock(this.blockPos, this.blockId));
    }
    if (this.duration == 0) {
        placerEntity.blockPlacerId = undefined;
        gameData.entityWorld.remove(entity);
    }
}

BlockPlacer.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.blockPos[0]);
    serializeInt32(byteArray, index, this.blockPos[1]);
    serializeInt32(byteArray, index, this.blockId);
    serializeInt32(byteArray, index, this.duration);
    serializeInt32(byteArray, index, this.entityId);
}

BlockPlacer.prototype.deserialize = function(byteArray, index) {
    this.blockPos = [deserializeInt32(byteArray, index), deserializeInt32(byteArray, index)]
    this.blockId = deserializeInt32(byteArray, index);
    this.duration = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
}

BlockPlacer.prototype.getSerializationSize = function() {
    return 20;
}
