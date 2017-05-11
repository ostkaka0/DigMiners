









var EntityBlockPlacer = function(blockPos, blockId, duration, entityId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
    this.duration = duration;
    this.entityId = entityId;
}
global.EntityBlockPlacer = EntityBlockPlacer;
TypeRegister.add(RegisterEntity, EntityBlockPlacer);

EntityBlockPlacer.prototype.name = blockPlacer.name; function blockPlacer() { };

EntityBlockPlacer.prototype.init = function(entity) {
    this.update(entity);
}

EntityBlockPlacer.prototype.update = function(entity) {
    this.duration--;

    if (!this.isInitialized) {
        this.isInitialized = true;
        var placerEntity = World.entities.objects[this.entityId];
        if (placerEntity)
            placerEntity.blockPlacerId = entity.id;
        if (!isServer) {
            var block = Game.blockRegister[this.blockId];
            this.sprite = new Sprite(block.name);
            this.sprite.anchor[0] = 0.5;
            this.sprite.anchor[1] = 0.5;
            this.sprite.alpha = 0.75;
            Client.zindices[2].add(this.sprite);
        }
    }
    var placerEntity = World.entities.objects[this.entityId];
    var playerId = (placerEntity && placerEntity.controlledByPlayer) ? placerEntity.controlledByPlayer.playerId : undefined;
    var player = (playerId != undefined) ? Game.playerWorld.objects[playerId] : undefined;
    var inventoryItem = (placerEntity && placerEntity.inventory) ? placerEntity.inventory.getEquippedItemType("tool") : undefined;
    var blockType = Game.blockRegister[this.blockId];
    var buildFailure = false;

    if (!placerEntity || placerEntity.blockPlacerId != entity.id)
        buildFailure = true;
    if (player && !player.canPlaceBlock(this.blockPos[0], this.blockPos[1]))
        buildFailure = true;
    if (inventoryItem && inventoryItem.blockId != this.blockId)
        buildFailure = true;
    if (blockType.oreRecipe && player && player.calcOreRecipeQuantity(blockType.oreRecipe) == 0)
        buildFailure = true;

    var shouldDestroy = (buildFailure && this.duration >= 0) || this.duration <= -2;
    if (!isServer && shouldDestroy) {
        Client.zindices[2].remove(this.sprite);
    }

    if (shouldDestroy) {
        if (placerEntity && placerEntity.blockPlacerId == entity.id)
            placerEntity.blockPlacerId = undefined;
        World.entities.remove(entity);
        return;
    }

    if (isServer && this.duration == 0 && inventoryItem && inventoryItem.id) {
        // Remove from inventory and place block
        sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.REMOVE_ITEM, inventoryItem.id, 1));
        sendCommand(new CommandPlaceBlock(this.blockPos, this.blockId));
    }
    if (shouldDestroy) {
        if (placerEntity)
            placerEntity.blockPlacerId = undefined;
        World.entities.remove(entity);
    }
    worldSetTimeout(() => this.update(entity), Config.tickDuration);
}

EntityBlockPlacer.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.blockPos[0]);
    Serialize.int32(byteArray, index, this.blockPos[1]);
    Serialize.int32(byteArray, index, this.blockId);
    Serialize.int32(byteArray, index, this.duration);
    Serialize.int32(byteArray, index, this.entityId);
}

EntityBlockPlacer.prototype.deserialize = function(byteArray, index) {
    this.blockPos = [Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index)]
    this.blockId = Deserialize.int32(byteArray, index);
    this.duration = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
}

EntityBlockPlacer.prototype.getSerializationSize = function() {
    return 20;
}
