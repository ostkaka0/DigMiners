
MessageRequestPlaceBlock = function(stackId, x, y) {
    this.stackId = stackId;
    this.x = Math.floor(x);
    this.y = Math.floor(y);
}

MessageRequestPlaceBlock.prototype.execute = function(gameData, player) {
    var entity = gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var item = entity.inventory.items[this.stackId];
    if (!item) return;
    var itemType = Config.itemRegister[item.id];
    if (itemType && itemType.typeOfType == "block") {

        if (!entity.inventory.hasItem(item.id, 1))
            return;

        if (!player.canPlaceBlock(gameData, this.x, this.y))
            return;

        var blockChunkX = Math.floor(this.x / BLOCK_CHUNK_DIM);
        var blockChunkY = Math.floor(this.y / BLOCK_CHUNK_DIM);
        var localX = Math.floor(this.x) - blockChunkX * BLOCK_CHUNK_DIM;
        var localY = Math.floor(this.y) - blockChunkY * BLOCK_CHUNK_DIM;

        var blockType = Config.blockRegister[itemType.blockId];
        var type = blockType.type;

        var blockChunk = gameData.world.blockWorld.get(blockChunkX, blockChunkY);
        if (type == BlockTypes.FOREGROUND) {
            if (blockChunk && blockChunk.getForeground(localX, localY) > 0)
                return;
        } else if (type == BlockTypes.BACKGROUND) {
            if (blockChunk && blockChunk.getBackground(localX, localY) > 0)
                return;
        }

        // Send block change
        var command = new CommandEntityBuild(player.entityId, this.x, this.y, itemType.blockId, type);
        sendCommand(command);
    }
}

MessageRequestPlaceBlock.prototype.send = function(socket) {
    socket.emit(this.idString, [this.stackId, this.x, this.y]);
}

MessageRequestPlaceBlock.prototype.receive = function(gameData, data) {
    this.stackId = data[0];
    this.x = data[1];
    this.y = data[2];
}
