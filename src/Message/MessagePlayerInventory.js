
MessagePlayerInventory = function(playerId, actionId, itemId, amount) {
    this.playerId = playerId;
    this.actionId = actionId;
    this.itemId = itemId;
    this.amount = amount;
}

MessagePlayerInventory.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    if(this.actionId == 0) { // Add
        player.inventory.addItem(gameData, this.itemId, this.amount);
        //console.log("Inventory added " + this.amount + " " + this.itemId);
    } else if(this.actionId == 0) { // Subtract
        player.inventory.removeItem(gameData, this.itemId, this.amount);
        //console.log("Inventory removed " + this.amount + " " + this.itemId);
    }
    if(!isServer)
        updateHUD(gameData);
}

MessagePlayerInventory.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.actionId);
    serializeInt32(byteArray, index, this.itemId);
    serializeInt32(byteArray, index, this.amount);
}

MessagePlayerInventory.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.actionId = deserializeInt32(byteArray, index);
    this.itemId = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
}

MessagePlayerInventory.prototype.getSerializationSize = function() {
    return 16;
}

MessagePlayerInventory.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var counter = new IndexCounter();
    this.serialize(byteArray, counter);
    socket.emit(this.idString, byteArray);
}

MessagePlayerInventory.prototype.receive = function(gameData, byteArray) {
    var counter = new IndexCounter();
    this.deserialize(new Uint8Array(byteArray), counter);
}