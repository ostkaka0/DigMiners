
ComponentItem = function(itemId, amount) {
    this.itemId = itemId;
    this.amount = amount;
}

ComponentItem.prototype.name = "item";

ComponentItem.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.itemId);
    serializeInt32(byteArray, index, this.amount);
}

ComponentItem.prototype.deserialize = function(byteArray, index) {
    this.itemId = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
}

ComponentItem.prototype.getSerializationSize = function() {
    return 8;
}