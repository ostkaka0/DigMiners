
MessageRequestEquipStack = function(id) {
    this.id = id;
}

MessageRequestEquipStack.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[player.entityId];
    if (!entity) return;
    var item = entity.inventory.items[this.id];
    if (!item) return;
    var itemType = gameData.itemRegister[item.id];
    if (itemType && itemType.isEquipable) {
        if (item.equipped == null || item.equipped == undefined)
            item.equipped = false;
        var equipped = !item.equipped;
        sendCommand(new CommandEntityEquipItem(player.entityId, this.id, item.id, equipped));
    }
}

MessageRequestEquipStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestEquipStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
