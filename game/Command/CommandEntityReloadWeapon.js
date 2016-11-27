
CommandEntityReloadWeapon = function(entityId, stackId, ammo) {
    this.entityId = entityId;
    this.stackId = stackId;
    this.ammo = ammo;
}

CommandEntityReloadWeapon.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;
    var item = entity.inventory.items[this.stackId];
    if (!item) return;
    item.magazine = this.ammo;
}

CommandEntityReloadWeapon.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.stackId);
    serializeInt32(byteArray, index, this.ammo);
}

CommandEntityReloadWeapon.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.stackId = deserializeInt32(byteArray, index);
    this.ammo = deserializeInt32(byteArray, index);
}

CommandEntityReloadWeapon.prototype.getSerializationSize = function() {
    return 12;
}
