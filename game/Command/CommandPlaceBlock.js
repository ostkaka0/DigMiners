
CommandPlaceBlock = function(blockPos, blockId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
}

CommandPlaceBlock.prototype.execute = function(gameData) {
    setForeground(gameData.blockWorld, this.blockPos[0], this.blockPos[1], this.blockId);
}

CommandPlaceBlock.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.blockPos[0]);
    serializeInt32(byteArray, index, this.blockPos[1]);
    serializeInt32(byteArray, index, this.blockId);
}

CommandPlaceBlock.prototype.deserialize = function(byteArray, index) {
    this.blockPos = [deserializeInt32(byteArray, index), deserializeInt32(byteArray, index)];
    this.blockId = deserializeInt32(byteArray, index);
}

CommandPlaceBlock.prototype.getSerializationSize = function() {
    return 12;
}
