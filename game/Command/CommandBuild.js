
CommandBuild = function(x, y, blockId, type) {
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}

CommandBuild.prototype.execute = function() {
    if (this.type == BlockTypes.FOREGROUND)
        setForeground(gameData.world.blockWorld, this.x, this.y, this.blockId);
    else if (this.type == BlockTypes.BACKGROUND)
        setBackground(gameData.world.blockWorld, this.x, this.y, this.blockId);
}

CommandBuild.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.x);
    serializeInt32(byteArray, index, this.y);
    serializeInt32(byteArray, index, this.blockId);
    serializeInt32(byteArray, index, this.type);
}

CommandBuild.prototype.deserialize = function(byteArray, index) {
    this.x = deserializeInt32(byteArray, index);
    this.y = deserializeInt32(byteArray, index);
    this.blockId = deserializeInt32(byteArray, index);
    this.type = deserializeInt32(byteArray, index);
}

CommandBuild.prototype.getSerializationSize = function() {
    return 16;
}
