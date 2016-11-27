
CommandEntityBeginReloadWeapon = function(entityId) {
    this.entityId = entityId;
}

CommandEntityBeginReloadWeapon.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;
    entity.movement.isReloading = true;
}

CommandEntityBeginReloadWeapon.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
}

CommandEntityBeginReloadWeapon.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
}

CommandEntityBeginReloadWeapon.prototype.getSerializationSize = function() {
    return 4;
}
