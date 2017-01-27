
CommandPlayerLeave = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
}

CommandPlayerLeave.prototype.execute = function() {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (player)
        gameData.playerWorld.remove(player);
    if (entity)
        gameData.world.entityWorld.remove(entity);
    if (isServer)
        console.log(player.name + " disconnected.");
    else if (entity && entity.nameComponent)
        gameData.HUD.chat.write(entity.nameComponent.entityName + " disconnected.");
}

CommandPlayerLeave.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.entityId);
}

CommandPlayerLeave.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.entityId = deserializeInt32(byteArray, index);
}

CommandPlayerLeave.prototype.getSerializationSize = function() {
    return 8;
}
