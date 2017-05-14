





;


var MessageAmmoChange = function(entity, itemIds) {
    this.ammo = {};
    if (entity && itemIds) {
        itemIds.forEach(function(itemId) {
            this.ammo[itemId] = entity.ammo[itemId];
        }.bind(this));
    }
}
global.MessageAmmoChange = MessageAmmoChange;
TypeRegister.add(RegisterMessage.ToClient, MessageAmmoChange);

MessageAmmoChange.prototype.execute = function() {

}

MessageAmmoChange.prototype.send = function(socket) {
    var keys = Object.keys(this.ammo);
    var serializationSize = 4 + 8 * keys.length;
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, keys.length);
    keys.forEach(function(itemId) {
        Serialize.int32(byteArray, counter, itemId);
        Serialize.int32(byteArray, counter, this.ammo[itemId]);
    }.bind(this));
    socket.emit(this.idString, byteArray);
}

MessageAmmoChange.prototype.receive = function(byteArray) {
    if (!Client.playerEntity || !Client.playerEntity.ammo) return;
    var entity = Client.playerEntity;
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    var length = Deserialize.int32(byteArray, counter);
    for (var i = 0; i < length; i++)  {
        var itemId = Deserialize.int32(byteArray, counter);
        var amount = Deserialize.int32(byteArray, counter);
        entity.ammo[itemId] = amount;
    }
    Event.trigger(EntityAmmo.Events.onChange, entity);
}
