
InventoryContainer = function(inventoryId) {
    this.inventoryId = inventoryId;
}

InventoryContainer.prototype.name = inventoryContainer.name; function inventoryContainer() { };

InventoryContainer.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.inventoryId);
}

InventoryContainer.prototype.deserialize = function(byteArray, index) {
    this.inventoryId = deserializeInt32(byteArray, index);
}

InventoryContainer.prototype.getSerializationSize = function() {
    return 4;
}

InventoryContainer.prototype.destroy = function(entity) {
    
}