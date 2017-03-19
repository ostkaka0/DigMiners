



var CommandPlayerLeave = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
}
global.CommandPlayerLeave = CommandPlayerLeave;
RegisterCommand.push(CommandPlayerLeave);

CommandPlayerLeave.prototype.execute = function() {
    var player = global.gameData.playerWorld.objects[this.playerId];
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (player)
        global.gameData.playerWorld.remove(player);
    if (entity)
        global.gameData.world.entityWorld.remove(entity);
    if (isServer)
        console.log(player.name + " disconnected.");
    else if (entity && entity.name)
        global.gameData.HUD.chat.write(entity.name.entityName + " disconnected.");
}

CommandPlayerLeave.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.entityId);
}

CommandPlayerLeave.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandPlayerLeave.prototype.getSerializationSize = function() {
    return 8;
}
