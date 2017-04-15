



var CommandPlayerLeave = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
}
global.CommandPlayerLeave = CommandPlayerLeave;
TypeRegister.add(RegisterCommand, CommandPlayerLeave);

CommandPlayerLeave.prototype.execute = function() {
    var player = Game.playerWorld.objects[this.playerId];
    var entity = World.entities.objects[this.entityId];
    if (player)
        Game.playerWorld.remove(player);
    if (entity)
        World.entities.remove(entity);
    if (isServer)
        console.log(player.name + " disconnected.");
    else if (entity && entity.name)
        Game.HUD.chat.write(entity.name.entityName + " disconnected.");
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
