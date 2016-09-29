
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
        player.oreInventory.addItem(gameData, this.id, this.amount);
    } else if(this.actionId == InventoryActions.ADD_ITEM) {
        player.inventory.addItem(gameData, this.id, this.amount);
    } else if(this.actionId == InventoryActions.REMOVE_ITEM) {
        player.inventory.removeItem(gameData, this.id, this.amount);
    } else if(this.actionId == InventoryActions.DROP_STACK) {
        var item = player.inventory.removeStack(this.id);
        if(isServer) {
            var entity = gameData.entityWorld.objects[player.entityId];
            var physicsBody = entity.physicsBody;
            var pos = v2.create(Math.cos(physicsBody.angle), -Math.sin(physicsBody.angle));
            var pos2 = {};
            v2.mul(2.0, pos, pos2);
            var pos3 = {};
            v2.add(pos2, physicsBody.pos, pos3);
            var message = new MessageItemDrop(idList.next(), item.id, item.amount, pos3[0], pos3[1], physicsBody.angle);
            message.execute(gameData);
            message.send(io.sockets);
        }
    }
    if(!isServer)
        updateHUD(gameData);
}

MessagePlayerInventory.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.actionId);
    serializeInt32(byteArray, index, this.id);
    serializeInt32(byteArray, index, this.amount);
}

MessagePlayerInventory.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.actionId = deserializeInt32(byteArray, index);
    this.id = deserializeInt32(byteArray, index);
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