



var CommandEntityBeginReloadWeapon = function(entityId) {
    this.entityId = entityId;
}
global.CommandEntityBeginReloadWeapon = CommandEntityBeginReloadWeapon;
TypeRegister.add(RegisterCommand, CommandEntityBeginReloadWeapon);

CommandEntityBeginReloadWeapon.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    if (!entity || !entity.movement) return;
    entity.movement.isReloading = true;
    // TODO: fix: World.events.trigger("beginReload", entity);
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
