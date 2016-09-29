
MessageRequestDropStack = function(id) {
    this.id = id;
}

MessageRequestDropStack.prototype.execute = function(gameData, player) {
    var message = new MessagePlayerInventory(player.playerId, InventoryActions.DROP_STACK, this.id, 0);
    message.execute(gameData);
    message.send(player.socket);
}

MessageRequestDropStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestDropStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
