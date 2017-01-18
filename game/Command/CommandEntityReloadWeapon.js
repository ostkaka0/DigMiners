
CommandEntityReloadWeapon = function(entityId, stackId) {
    this.entityId = entityId;
    this.stackId = stackId;
}

CommandEntityReloadWeapon.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.inventory) return;
    var item = entity.inventory.items[this.stackId];
    var itemType = Config.itemRegister[item.id];
    if (!item) return;
    var ammoAmount = (entity.ammo)? entity.ammo[item.id] || 0 : itemType.ammoCapacity;
    var ammoToReload = Math.min(ammoAmount, itemType.ammoCapacity - item.magazine);
    item.magazine += ammoToReload;
    if (entity.ammo && entity.ammo[item.id])
        entity.ammo[item.id] -= ammoToReload;
    if (!isServer) // TODO: Replace with hud
        console.log(item.name + " ammo: " + item.magazine + " / " + ((entity.ammo != undefined)? entity.ammo[item.id] : -1));
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
