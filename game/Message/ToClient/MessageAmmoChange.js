
MessageAmmoChange = function(entity, itemIds) {
    this.ammo = {};
    if (entity && itemIds) {
        itemIds.forEach(function(itemId) {
            this.ammo[itemId] = entity.ammo[itemId];
        }.bind(this));
    }
}

MessageAmmoChange.prototype.execute = function(gameData) {

}

MessageAmmoChange.prototype.send = function(socket) {
    var keys = Object.keys(this.ammo);
    var serializationSize = 4 + 8 * keys.length;
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    serializeInt32(byteArray, counter, keys.length);
    keys.forEach(function(itemId) {
        serializeInt32(byteArray, counter, itemId);
        serializeInt32(byteArray, counter, this.ammo[itemId]);
    }.bind(this));
    socket.emit(this.idString, byteArray);
}

MessageAmmoChange.prototype.receive = function(gameData, byteArray) {
    if (!global.playerEntity || !global.playerEntity.ammo) return;
    var entity = global.playerEntity;
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    var length = deserializeInt32(byteArray, counter);
    for (var i = 0; i < length; i++)  {
        var itemId = deserializeInt32(byteArray, counter);
        var amount = deserializeInt32(byteArray, counter);
        entity.ammo[itemId] = amount;
    }
    triggerEvent(AmmoEvents.onChange, entity);
}
