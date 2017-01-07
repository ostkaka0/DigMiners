
CommandPlayerSpawn = function(playerId, entityId, playerName) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.playerName = playerName;
}

CommandPlayerSpawn.prototype.execute = function() {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
    player.entityId = this.entityId;
    if (!isServer && global.player.id == this.playerId) {
        global.playerEntityId = this.entityId;
        global.playerEntity = this.entity;
    }
    gameData.entityWorld.add(entity, this.entityId);
}

CommandPlayerSpawn.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
    serializeUTF8(byteArray, index, this.playerName);
}

CommandPlayerSpawn.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);
}

CommandPlayerSpawn.prototype.getSerializationSize = function() {
    return 8 + getUTF8SerializationSize(this.playerName);
}
