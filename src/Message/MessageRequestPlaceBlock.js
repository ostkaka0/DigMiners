
MessageRequestPlaceBlock = function(stackId, x, y) {
    this.stackId = stackId;
    this.x = Math.floor(x);
    this.y = Math.floor(y);
}

MessageRequestPlaceBlock.prototype.execute = function(gameData, player) {
    var item = player.inventory.items[this.stackId];
    if(!item) return;
    var itemType = gameData.itemRegister[item.id];
    if(itemType && itemType.typeOfType == "block") {

        if(!player.inventory.hasItem(item.id, 1))
            return;

        var blockChunkX = Math.floor(this.x / BLOCK_CHUNK_DIM);
        var blockChunkY = Math.floor(this.y / BLOCK_CHUNK_DIM);
        var localX = Math.floor(this.x) - blockChunkX * BLOCK_CHUNK_DIM;
        var localY = Math.floor(this.y) - blockChunkY * BLOCK_CHUNK_DIM;

        var blockChunk = gameData.blockWorld.get(blockChunkX, blockChunkY);
        if(blockChunk && blockChunk.getForeground(localX, localY) > 0)
            return;

        // Remove from inventory
        var message = new MessagePlayerInventory(player.playerId, InventoryActions.REMOVE_ITEM, item.id, 1);
        message.execute(gameData);
        message.send(player.socket);

        // Send block change
        //var blockType = gameData.blockRegister[itemType.blockId];
        var message = new MessagePlayerBuild(player.playerId, this.x, this.y, itemType.blockId, BlockTypes.FOREGROUND);
        message.execute(gameData);
        message.send(io.sockets);
    }
}

MessageRequestPlaceBlock.prototype.send = function(socket) {
    socket.emit(this.idString, { stackId: this.stackId, x: this.x, y: this.y });
}

MessageRequestPlaceBlock.prototype.receive = function(gameData, data) {
    this.stackId = data.stackId;
    this.x = data.x;
    this.y = data.y;
}
