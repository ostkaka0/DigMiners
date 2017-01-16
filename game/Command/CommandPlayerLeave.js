
CommandPlayerLeave = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
}

CommandPlayerLeave.prototype.execute = function() {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (player)
        gameData.playerWorld.remove(player);
    if (entity) {
        gameData.world.entityWorld.remove(entity);
        if (entity.nameComponent)
            console.log(entity.nameComponent.entityName + " with playerId " + this.playerId + " disconnected.");
    } else {
        console.log(this.playerId + " disconnected.");
    }
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
