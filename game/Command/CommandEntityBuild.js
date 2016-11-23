
CommandEntityBuild = function(entityId, x, y, blockId, type) {
    this.entityId = entityId;
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}

CommandEntityBuild.prototype.execute = function(gameData) {
    if (this.type == BlockTypes.FOREGROUND)
        setForeground(gameData.blockWorld, this.x, this.y, this.blockId);
    else if (this.type == BlockTypes.BACKGROUND)
        setBackground(gameData.blockWorld, this.x, this.y, this.blockId);

    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    if (!isServer && this.blockId)
        entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArm", 256, false);
}

CommandEntityBuild.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.x);
    serializeInt32(byteArray, index, this.y);
    serializeInt32(byteArray, index, this.blockId);
    serializeInt32(byteArray, index, this.type);
}

CommandEntityBuild.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.x = deserializeInt32(byteArray, index);
    this.y = deserializeInt32(byteArray, index);
    this.blockId = deserializeInt32(byteArray, index);
    this.type = deserializeInt32(byteArray, index);
}

CommandEntityBuild.prototype.getSerializationSize = function() {
    return 20;
}
