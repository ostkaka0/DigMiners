






;

var MessageRequestClickBlock = function(blockPos, clickType) {
    this.blockPos = blockPos;
    this.clickType = clickType;
}
global.MessageRequestClickBlock = MessageRequestClickBlock;
TypeRegister.add(RegisterMessage.ToServer, MessageRequestClickBlock);

MessageRequestClickBlock.prototype.execute = function(player) {
    var entity = World.entities.objects[player.entityId];
    if (!entity || !this.blockPos) return;
    //console.log("player " + player.playerId + " clicked block " + this.blockPos + ", clicktype: " + this.clickType);
    var blockId = World.blocks.getForeground(this.blockPos);
    var blockType = Game.blockRegister[blockId];
    if (blockType && blockType.isDoor)
        blockType.clickFunction(this.blockPos, blockType, entity, this.clickType);
}

MessageRequestClickBlock.prototype.send = function(socket) {
    socket.emit(this.idString, [this.blockPos, this.clickType]);
}

MessageRequestClickBlock.prototype.receive = function(data) {
    this.blockPos = data[0];
    this.clickType = data[1];
}
