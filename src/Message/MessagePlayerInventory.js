
InventoryActions = {
    ADD_ORE: 0,
    REMOVE_ORE: 1,
    ADD_ITEM: 2,
    REMOVE_ITEM: 3,
    DROP_STACK: 4
}

MessagePlayerInventory = function(playerId, actionId, id, amount) {
    this.playerId = playerId;
    this.actionId = actionId;
    this.id = id;
    this.amount = amount;
}

MessagePlayerInventory.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    if(this.actionId == InventoryActions.ADD_ORE) {
        if(!player.oreInventory[this.id])
            player.oreInventory[this.id] = 0;
        player.oreInventory[this.id] += this.amount;
    } else if(this.actionId == InventoryActions.REMOVE_ORE) {
        if(!player.oreInventory[this.id])
            player.oreInventory[this.id] = 0;
        player.oreInventory[this.id] -= this.amount;
    } else if(this.actionId == InventoryActions.ADD_ITEM) {
        player.inventory.addItem(gameData, this.id, this.amount);
    } else if(this.actionId == InventoryActions.REMOVE_ITEM) {
        player.inventory.removeItem(gameData, this.id, this.amount);
    } else if(this.actionId == InventoryActions.DROP_STACK) {
        var item = player.inventory.removeStack(this.id);
    }
    if(!isServer && this.playerId == global.player.playerId) {
        updateHUD(gameData);
        checkCanAffordRecipe();
    }
}

MessagePlayerInventory.prototype.getSerializationSize = function() {
    return 16;
}

MessagePlayerInventory.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.actionId);
    serializeInt32(byteArray, index, this.id);
    serializeInt32(byteArray, index, this.amount);
    socket.emit(this.idString, byteArray);
}

MessagePlayerInventory.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();
    this.playerId = deserializeInt32(byteArray, index);
    this.actionId = deserializeInt32(byteArray, index);
    this.id = deserializeInt32(byteArray, index);
    this.amount = deserializeInt32(byteArray, index);
}
