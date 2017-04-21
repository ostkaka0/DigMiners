
var EntityEquippedItems = function(items) {
    this.items = (items ? items : {});
}
EntityEquippedItems.Events = { onEquip: new Map(), onDequip: new Map() };
TypeRegister.add(RegisterEntity, EntityEquippedItems);

EntityEquippedItems.prototype.name = equippedItems.name; function equippedItems() { };

EntityEquippedItems.prototype.serialize = function(byteArray, index) {
    //todo: make sure all equipped items are not undefined
    var keys = Object.keys(this.items);
    Serialize.int32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        var value = this.items[key];
        Serialize.utf8(byteArray, index, key);
        Serialize.int32(byteArray, index, (value != null ? value.id : -1));
    }.bind(this));
}

EntityEquippedItems.prototype.deserialize = function(byteArray, index) {
    var itemsLength = Deserialize.int32(byteArray, index);
    this.items = {};
    for (var i = 0; i < itemsLength; ++i) {
        var key = Deserialize.utf8(byteArray, index);
        var id = Deserialize.int32(byteArray, index);
        this.items[key] = RegisterItem[id];
    }
}

EntityEquippedItems.prototype.getSerializationSize = function() {
    var size = 4;
    var keys = Object.keys(this.items);
    keys.forEach(function(key) {
        var value = this.items[key];
        size += Serialize.utf8Size(key) + 4;
    }.bind(this));
    return size;
}

EntityEquippedItems.prototype.destroy = function(entity) {

}
