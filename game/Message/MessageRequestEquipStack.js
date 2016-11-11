
MessageRequestEquipStack = function(id) {
    this.id = id;
}

MessageRequestEquipStack.prototype.execute = function(gameData, player) {
    var item = player.inventory.items[this.id];
    if(!item) return;
    var itemType = gameData.itemRegister[item.id];
    if(itemType && itemType.isEquipable) {
        if(item.equipped == null || item.equipped == undefined)
            item.equipped = false;
        var equipped = !item.equipped;
        var command = new CommandPlayerEquipItem(player.playerId, this.id, item.id, equipped);
        gameData.commands.push(command);
    }
}

MessageRequestEquipStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestEquipStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
