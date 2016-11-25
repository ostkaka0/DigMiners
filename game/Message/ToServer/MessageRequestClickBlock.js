
MessageRequestClickBlock = function(blockPos, clickType) {
    this.blockPos = blockPos;
    this.clickType = clickType;
}

MessageRequestClickBlock.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[player.entityId];
    if (!entity || !this.blockPos) return;
    //console.log("player " + player.playerId + " clicked block " + this.blockPos + ", clicktype: " + this.clickType);
    var blockId = getForeground(gameData.blockWorld, this.blockPos[0], this.blockPos[1]);
    var blockType = gameData.blockRegister[blockId];
    if (blockType && blockType.isDoor)
        blockType.clickFunction(this.blockPos, blockType, entity, this.clickType);
}

MessageRequestClickBlock.prototype.send = function(socket) {
    socket.emit(this.idString, [this.blockPos, this.clickType]);
}

MessageRequestClickBlock.prototype.receive = function(gameData, data) {
    this.blockPos = data[0];
    this.clickType = data[1];
}
