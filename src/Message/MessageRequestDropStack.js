
MessageRequestDropStack = function(id) {
    this.id = id;
}

MessageRequestDropStack.prototype.execute = function(gameData, player) {
    var item = player.inventory.items[this.id];
    if(item) {
        var playerEntity = gameData.entityWorld.objects[player.entityId];
        var physicsBody = playerEntity.physicsBody;
        var displacement1 = Math.random() / 5 - 0.1;
        var displacement2 = Math.random() / 5 - 0.1;
        var displacement3 = Math.random() / 5 - 0.1 + 1;
        //console.log(displacement);
        var speed = v2.create(Math.cos(displacement1 + physicsBody.angle), -Math.sin(displacement2 + physicsBody.angle));
        var speed2 = {};
        v2.mul(10.0 * displacement3, speed, speed2);

        var itemEntity = entityTemplates.item(idList.next(), item.id, item.amount, gameData);
        itemEntity.physicsBody.pos = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
        itemEntity.physicsBody.posOld = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
        itemEntity.physicsBody.speed = v2.create(speed2[0], speed2[1]);
        itemEntity.physicsBody.speedOld = v2.create(speed2[0], speed2[1]);
        itemEntity.physicsBody.angle = physicsBody.angle;
        itemEntity.physicsBody.angleOld = physicsBody.angle;
        itemEntity.item.dropped = new Date();
        var message = new MessageEntitySpawn(gameData, itemEntity);
        // Do not execute message, entity is already spawned
        message.send(gameData, io.sockets);

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.DROP_STACK, this.id, 0);
        message.execute(gameData);
        message.send(io.sockets);
    }
}

MessageRequestDropStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestDropStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
