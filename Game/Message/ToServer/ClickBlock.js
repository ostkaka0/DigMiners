






;

var MessageRequestClickBlock = function(blockPos, clickType) {
    this.blockPos = blockPos;
    this.clickType = clickType;
}
global.MessageRequestClickBlock = MessageRequestClickBlock;
RegisterMessage.ToServer.push(MessageRequestClickBlock);

MessageRequestClickBlock.prototype.execute = function(gameData, player) {
    var entity = World.entities.objects[player.entityId];
    if (!entity || !this.blockPos) return;
    //console.log("player " + player.playerId + " clicked block " + this.blockPos + ", clicktype: " + this.clickType);
    var blockId = World.blockWorld.getForeground(this.blockPos);
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
