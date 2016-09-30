
MessageRequestEquipStack = function(id) {
    this.id = id;
}

MessageRequestEquipStack.prototype.execute = function(gameData, player) {
    var item = player.inventory.items[this.id];
    var itemType = gameData.itemRegister.getById(item.id);
    if(item && itemType && itemType.isEquipable) {
        var command = new CommandPlayerEquipStack(player.playerId, this.id);
        gameData.commands.push(command);
    }
}

MessageRequestEquipStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestEquipStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
