
BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1,
    STRENGTH: 2
}

CommandPlayerBuild = function(playerId, x, y, blockId, type) {
    this.playerId = playerId;
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}

CommandPlayerBuild.prototype.execute = function(gameData) {
    //TODO: Support other types
    setForeground(gameData.blockWorld, this.x, this.y, this.blockId);

    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    var entity = gameData.entityWorld.objects[player.entityId];
    if(!entity) return;
    if(!isServer && this.blockId)
        entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArm", 256, false);
}

CommandPlayerBuild.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.x);
    serializeInt32(byteArray, index, this.y);
    serializeInt32(byteArray, index, this.blockId);
    serializeInt32(byteArray, index, this.type);
}

CommandPlayerBuild.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.x = deserializeInt32(byteArray, index);
    this.y = deserializeInt32(byteArray, index);
    this.blockId = deserializeInt32(byteArray, index);
    this.type = deserializeInt32(byteArray, index);
}

CommandPlayerBuild.prototype.getSerializationSize = function() {
    return 20;
}
