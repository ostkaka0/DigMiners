



var CommandEntityDestroy = function(entityId) {
    this.entityId = entityId;
}
global.CommandEntityDestroy = CommandEntityDestroy;
RegisterCommand.push(CommandEntityDestroy);

CommandEntityDestroy.prototype.execute = function() {
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    global.gameData.world.entityWorld.remove(entity);
}

CommandEntityDestroy.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
}

CommandEntityDestroy.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandEntityDestroy.prototype.getSerializationSize = function() {
    return 4;
}
