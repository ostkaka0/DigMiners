
ItemComponent = function(itemId, amount) {
    this.itemId = itemId;
    this.amount = amount;
    this.dropped = new Date();
}

ItemComponent.prototype.name = item.name; function item(){};

ItemComponent.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.itemId);
    serializeInt32(byteArray, index, this.amount);
}

ItemComponent.prototype.deserialize = function(byteArray, index) {
    this.itemId = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
    this.dropped = new Date();
}

ItemComponent.prototype.getSerializationSize = function() {
    return 8;
}

ItemComponent.prototype.destroy = function(entity) {
    
}
