
BlockPlacer = function(blockPos, blockId, duration, entityId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
    this.duration = duration;
    this.entityId = entityId;
}

BlockPlacer.prototype.name = blockPlacer.name; function blockPlacer() { };

BlockPlacer.prototype.update = function(entity) {
    this.duration--;

    if (!this.isInitialized) {
        this.isInitialized = true;
        var placerEntity = gameData.world.entityWorld.objects[this.entityId];
        if (placerEntity)
            placerEntity.blockPlacerId = entity.id;
        if (!isServer) {
            var block = Config.blockRegister[this.blockId];
            this.sprite = new PIXI.Sprite(gameData.textures[block.name]);
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;
            this.sprite.alpha = 0.75;
            zindices[2].add(this.sprite);
        }
    }
    var placerEntity = gameData.world.entityWorld.objects[this.entityId];
    var playerId = (placerEntity && placerEntity.controlledByPlayer) ? placerEntity.controlledByPlayer.playerId : undefined;
    var player = (playerId != undefined) ? gameData.playerWorld.objects[playerId] : undefined;
    var inventoryItem = (placerEntity && placerEntity.inventory) ? placerEntity.inventory.getEquippedItemType("tool") : undefined;
    var buildFailure = false;

    if (!placerEntity || placerEntity.blockPlacerId != entity.id)
        buildFailure = true;
    if (player && !player.canPlaceBlock(gameData, this.blockPos[0], this.blockPos[1]))
        buildFailure = true;
    if (inventoryItem && inventoryItem.blockId != this.blockId)
        buildFailure = true;

    var shouldDestroy = (buildFailure && this.duration >= 0) || this.duration <= -2;
    if (!isServer && shouldDestroy) {
        zindices[2].remove(this.sprite);
    }

    if (shouldDestroy) {
        if (placerEntity && placerEntity.blockPlacerId == entity.id)
            placerEntity.blockPlacerId = undefined;
        gameData.world.entityWorld.remove(entity);
        return;
    }

    if (isServer && this.duration == 0 && inventoryItem && inventoryItem.id) {
        // Remove from inventory and place block
        sendCommand(new CommandEntityInventory(player.entityId, InventoryActions.REMOVE_ITEM, inventoryItem.id, 1));
        sendCommand(new CommandPlaceBlock(this.blockPos, this.blockId));
    }
    if (shouldDestroy) {
        if (placerEntity)
            placerEntity.blockPlacerId = undefined;
        gameData.world.entityWorld.remove(entity);
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
