



var EntityItem = function(itemId, amount) {
    this.itemId = itemId;
    this.amount = amount;
    this.dropped = new Date();
}
global.EntityItem = EntityItem;
TypeRegister.add(RegisterEntity, EntityItem);

EntityItem.prototype.name = item.name; function item() { };

EntityItem.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.itemId);
    Serialize.int32(byteArray, index, this.amount);
}

EntityItem.prototype.deserialize = function(byteArray, index) {
    this.itemId = Deserialize.int32(byteArray, index);
    this.amount = Deserialize.int32(byteArray, index);
    this.dropped = new Date();
}

EntityItem.prototype.getSerializationSize = function() {
    return 8;
}

EntityItem.prototype.destroy = function(entity) {

}
