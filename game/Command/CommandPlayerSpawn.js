
CommandPlayerSpawn = function(playerId, entityId, playerName) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.playerName = playerName;
}

CommandPlayerSpawn.prototype.execute = function() {
    // Associate with existing, already spawned entity (from MessageRequestSpawn)
    var entity = gameData.entityWorld.objects[this.entityId];
    var player = gameData.playerWorld.objects[this.playerId];
    player.entityId = this.entityId;
    player.name = this.playerName;

    if (!isServer && global.player.id == this.playerId) {
        global.playerEntityId = this.entityId;
        global.playerEntity = entity;
        gameData.events.trigger("ownPlayerSpawned", entity, player);
    }
    gameData.events.trigger("playerSpawned", entity, player);
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
