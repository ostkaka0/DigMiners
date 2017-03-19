



var CommandEntityBeginReloadWeapon = function(entityId) {
    this.entityId = entityId;
}
global.CommandEntityBeginReloadWeapon = CommandEntityBeginReloadWeapon;
RegisterCommand.push(CommandEntityBeginReloadWeapon);

CommandEntityBeginReloadWeapon.prototype.execute = function() {
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;
    entity.movement.isReloading = true;
    global.gameData.world.events.trigger("beginReload", entity);
}

CommandEntityBeginReloadWeapon.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
}

CommandEntityBeginReloadWeapon.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandEntityBeginReloadWeapon.prototype.getSerializationSize = function() {
    return 4;
}
