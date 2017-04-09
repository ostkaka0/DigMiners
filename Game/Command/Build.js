









var CommandBuild = function(x, y, blockId, type) {
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}
global.CommandBuild = CommandBuild;
RegisterCommand.push(CommandBuild);

CommandBuild.prototype.execute = function() {
    //if (this.type == BlockTypes.FOREGROUND)
        World.blockWorld.setForeground([this.x, this.y], this.blockId);
    //else if (this.type == BlockTypes.BACKGROUND)
    //    setBackground(World.blockWorld, this.x, this.y, this.blockId);
}

CommandBuild.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.x);
    Serialize.int32(byteArray, index, this.y);
    Serialize.int32(byteArray, index, this.blockId);
    Serialize.int32(byteArray, index, this.type);
}

CommandBuild.prototype.deserialize = function(byteArray, index) {
    this.x = Deserialize.int32(byteArray, index);
    this.y = Deserialize.int32(byteArray, index);
    this.blockId = Deserialize.int32(byteArray, index);
    this.type = Deserialize.int32(byteArray, index);
}

CommandBuild.prototype.getSerializationSize = function() {
    return 16;
}
