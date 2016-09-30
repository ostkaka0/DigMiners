
MessageRequestDropStack = function(id) {
    this.id = id;
}

MessageRequestDropStack.prototype.execute = function(gameData, player) {
    var item = player.inventory.items[this.id];
    if(item) {
        var entity = gameData.entityWorld.objects[player.entityId];
        var physicsBody = entity.physicsBody;
        var displacement1 = Math.random() / 5 - 0.1 + 1;
        var displacement2 = Math.random() / 5 - 0.1 + 1;
        var displacement3 = Math.random() / 5 - 0.1 + 1;
        //console.log(displacement);
        var speed = v2.create(Math.cos(displacement1 * physicsBody.angle), -Math.sin(displacement2 * physicsBody.angle));
        var speed2 = {};
        v2.mul(10.0 * displacement3, speed, speed2);
        var message = new MessageItemDrop(idList.next(), item.id, item.amount, physicsBody.pos[0], physicsBody.pos[1], speed2[0], speed2[1], physicsBody.angle);
        message.execute(gameData);
        message.send(io.sockets);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.DROP_STACK, this.id, 0);
        message.execute(gameData);
        message.send(player.socket);
    }
}

MessageRequestDropStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestDropStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
