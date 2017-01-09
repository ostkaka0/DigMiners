
CommandPlayerSpawn = function(playerId, entityId, playerName, pos) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.pos = (pos != undefined)? pos : gameData.spawnPoints[Math.floor(Math.random() * gameData.spawnPoints.length)];
    this.playerName = playerName;
}

CommandPlayerSpawn.prototype.execute = function() {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
    entity.physicsBody.setPos(this.pos);
    entity.physicsBody.posOld = v2.clone(this.pos);
    console.log(this.pos);
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
    serializeV2(byteArray, index, this.pos);
    serializeUTF8(byteArray, index, this.playerName);
}

CommandPlayerSpawn.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);
}

CommandPlayerSpawn.prototype.getSerializationSize = function() {
    return 16 + getUTF8SerializationSize(this.playerName);
}
