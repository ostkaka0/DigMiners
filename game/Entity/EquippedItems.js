import { Serialize, Deserialize } from "engine/Serialization.js"
import Config from "game/Config.js"

var EquippedItems = function(items) {
    this.items = (items ? items : {});
}
export default EquippedItems

EquippedItems.prototype.name = equippedItems.name; function equippedItems() { };

EquippedItems.prototype.serialize = function(byteArray, index) {
    //todo: make sure all equipped items are not undefined
    var keys = Object.keys(this.items);
    Serialize.int32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        var value = this.items[key];
        Serialize.utf8(byteArray, index, key);
        Serialize.int32(byteArray, index, (value != null ? value.id : -1));
    }.bind(this));
}

EquippedItems.prototype.deserialize = function(byteArray, index) {
    var itemsLength = Deserialize.int32(byteArray, index);
    this.items = {};
    for (var i = 0; i < itemsLength; ++i) {
        var key = Deserialize.utf8(byteArray, index);
        var id = Deserialize.int32(byteArray, index);
        this.items[key] = Config.itemRegister[id];
    }
}

EquippedItems.prototype.getSerializationSize = function() {
    var size = 4;
    var keys = Object.keys(this.items);
    keys.forEach(function(key) {
        var value = this.items[key];
        size += Serialize.utf8Size(key) + 4;
    }.bind(this));
    return size;
}

EquippedItems.prototype.destroy = function(entity) {

}
