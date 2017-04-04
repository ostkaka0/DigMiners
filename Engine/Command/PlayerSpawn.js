



var CommandPlayerSpawn = function(playerId, entityId, playerName) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.playerName = playerName;
}
global.CommandPlayerSpawn = CommandPlayerSpawn;
RegisterCommand.push(CommandPlayerSpawn);

CommandPlayerSpawn.prototype.execute = function() {
    // Associate with existing, already spawned entity (from MessageRequestSpawn)
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    var player = global.gameData.playerWorld.objects[this.playerId];
    player.onSpawn(entity);
    if (isServer)
        player.name = this.playerName;

    if (!isServer && global.player.id == this.playerId) {
        global.playerEntityId = this.entityId;
        global.playerEntity = entity;
        global.gameData.HUD.update();
        global.gameData.world.events.trigger("ownPlayerSpawned", entity, player);
    }
    global.gameData.world.events.trigger("playerSpawned", entity, player);
}

CommandPlayerSpawn.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.utf8(byteArray, index, this.playerName);
}

CommandPlayerSpawn.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
    this.playerName = Deserialize.utf8(byteArray, index);
}

CommandPlayerSpawn.prototype.getSerializationSize = function() {
    return 8 + Serialize.utf8Size(this.playerName);
}
