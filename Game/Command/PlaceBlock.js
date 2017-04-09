








var CommandPlaceBlock = function(blockPos, blockId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
}
global.CommandPlaceBlock = CommandPlaceBlock;
RegisterCommand.push(CommandPlaceBlock);

CommandPlaceBlock.prototype.execute = function() {
    World.blockWorld.setForeground(this.blockPos, this.blockId);
    var block = gameData.blockRegister[this.blockId];
    if (block.onPlace)
        block.onPlace(this.blockPos, block);
}

CommandPlaceBlock.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.blockPos[0]);
    Serialize.int32(byteArray, index, this.blockPos[1]);
    Serialize.int32(byteArray, index, this.blockId);
}

CommandPlaceBlock.prototype.deserialize = function(byteArray, index) {
    this.blockPos = [Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index)];
    this.blockId = Deserialize.int32(byteArray, index);
}

CommandPlaceBlock.prototype.getSerializationSize = function() {
    return 12;
}
