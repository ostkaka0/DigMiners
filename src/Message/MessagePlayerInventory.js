
MessagePlayerInventory = function(playerId, actionId, itemName, amount) {
    this.playerId = playerId;
    this.actionId = actionId;
    this.itemName = itemName;
    this.amount = amount;
}

MessagePlayerInventory.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    if(!player.inventory[this.itemName])
        player.inventory[this.itemName] = 0;
    if(this.actionId == 0) { // Add
        player.inventory[this.itemName] += this.amount;
        console.log("Inventory added " + this.amount + " " + this.itemName);
        // todo: fire item add event
    } else if(this.actionId == 0) { // Subtract
        player.inventory[this.itemName] -= this.amount;
        if(player.inventory[this.itemName] < 0)
            player.inventory[this.itemName] = 0;
        // todo: fire item remove event
    }
}

MessagePlayerInventory.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.actionId);
    serializeUTF8(byteArray, index, this.itemName);
    serializeInt32(byteArray, index, this.amount);
}

MessagePlayerInventory.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.actionId = deserializeInt32(byteArray, index);
    this.itemName = deserializeUTF8(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
}

MessagePlayerInventory.prototype.getSerializationSize = function() {
    return 12 + getUTF8SerializationSize(this.itemName);
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