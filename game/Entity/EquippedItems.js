
EquippedItems = function(items) {
    this.items = (items ? items : {});
}

EquippedItems.prototype.name = equippedItems.name; function equippedItems() { };

EquippedItems.prototype.serialize = function(byteArray, index) {
    //todo: make sure all equipped items are not undefined
    var keys = Object.keys(this.items);
    serializeInt32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        var value = this.items[key];
        serializeUTF8(byteArray, index, key);
        serializeInt32(byteArray, index, (value != null ? value.id : -1));
    }.bind(this));
}

EquippedItems.prototype.deserialize = function(byteArray, index) {
    var itemsLength = deserializeInt32(byteArray, index);
    this.items = {};
    for (var i = 0; i < itemsLength; ++i) {
        var key = deserializeUTF8(byteArray, index);
        var id = deserializeInt32(byteArray, index);
        this.items[key] = Config.itemRegister[id];
    }
}

EquippedItems.prototype.getSerializationSize = function() {
    var size = 4;
    var keys = Object.keys(this.items);
    keys.forEach(function(key) {
        var value = this.items[key];
        size += getUTF8SerializationSize(key) + 4;
    }.bind(this));
    return size;
}

EquippedItems.prototype.destroy = function(entity) {

}
