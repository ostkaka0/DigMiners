











var CommandEntityBuild = function(entityId, x, y, blockId, type) {
    this.entityId = entityId;
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}
global.CommandEntityBuild = CommandEntityBuild;
RegisterCommand.push(CommandEntityBuild);

CommandEntityBuild.prototype.execute = function() {
    /*if (this.type == BlockTypes.FOREGROUND)
        global.gameData.world.blockWorld.setForeground([this.x, this.y], this.blockId);
    else if (this.type == BlockTypes.BACKGROUND)
        setBackground(global.gameData.world.blockWorld, this.x, this.y, this.blockId);*/

    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    var block = global.gameData.blockRegister[this.blockId];
    if (!entity) return;
    if (!isServer && this.blockId)
        entity.bodyparts.bodyparts["rightArm"].cycle("rightArm", 256, true);
    if (isServer) {
        var entityBlockPlacer = { blockPlacer: new EntityBlockPlacer([this.x, this.y], this.blockId, block.buildDuration, entity.id) };
        var entityBlockPlacerId = global.gameData.world.idList.next();
        sendCommand(new CommandEntitySpawn(global.gameData, entityBlockPlacer, entityBlockPlacerId));
        entity.blockPlacerId = entityBlockPlacerId;
    }

    if (entity.controlledByPlayer && block.oreRecipe) {
        var player = gameData.playerWorld.objects[entity.controlledByPlayer.playerId];
        if (player) {
            player.consumeOreRecipe(block.oreRecipe);
            if (player.calcOreRecipeQuantity(block.oreRecipe) == 0 && entity.equippedItems) {
                entity.isBuilding = false;
                Event.trigger(EntityEquippedItems.Events.onDequip, entity, this.stackId, RegisterItem[this.blockId]);
                if (!isServer && entity.bodyparts && entity.bodyparts.bodyparts["tool"])
                    entity.bodyparts.bodyparts["tool"].sprite.visible = false;
            }
        }
    }
}

CommandEntityBuild.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.x);
    Serialize.int32(byteArray, index, this.y);
    Serialize.int32(byteArray, index, this.blockId);
    Serialize.int32(byteArray, index, this.type);
}

CommandEntityBuild.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.x = Deserialize.int32(byteArray, index);
    this.y = Deserialize.int32(byteArray, index);
    this.blockId = Deserialize.int32(byteArray, index);
    this.type = Deserialize.int32(byteArray, index);
}

CommandEntityBuild.prototype.getSerializationSize = function() {
    return 20;
}
