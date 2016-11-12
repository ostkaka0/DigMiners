
MessageRequestDropStack = function(id) {
    this.id = id;
}

MessageRequestDropStack.prototype.execute = function(gameData, player) {
    var item = player.inventory.items[this.id];
    if(item) {
        var playerEntity = gameData.entityWorld.objects[player.entityId];
        if(!playerEntity) return;
        var physicsBody = playerEntity.physicsBody;
        if(!physicsBody) return;
        var displacement1 = Math.random() / 5 - 0.1;
        var displacement2 = Math.random() / 5 - 0.1;
        var displacement3 = Math.random() / 5 - 0.1 + 1;
        //console.log(displacement);
        var speed = v2.create(Math.cos(displacement1 + physicsBody.angle), -Math.sin(displacement2 + physicsBody.angle));
        var speed2 = {};
        v2.mul(10.0 * displacement3, speed, speed2);

        var itemEntityId = idList.next();
        var itemEntity = entityTemplates.item(item.id, item.amount, gameData);
        itemEntity.physicsBody.setPos(physicsBody.getPos());
        itemEntity.physicsBody.posOld = v2.create(physicsBody.pos[0], physicsBody.pos[1]);
        itemEntity.physicsBody.setVelocity([speed2[0], speed2[1]]);
        itemEntity.physicsBody.speedOld = v2.create(speed2[0], speed2[1]);
        itemEntity.physicsBody.angle = physicsBody.angle;
        itemEntity.physicsBody.angleOld = physicsBody.angle;
        itemEntity.item.dropped = new Date();
        gameData.commands.push(new CommandEntitySpawn(gameData, itemEntity, itemEntityId));

        var message = new MessagePlayerInventory(player.playerId, InventoryActions.DROP_STACK, this.id, 0);
        message.execute(gameData);
        message.send(player.socket);

        if(item.equipped)
            gameData.commands.push(new CommandPlayerEquipItem(player.playerId, this.id, item.id, false));
    }
}

MessageRequestDropStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestDropStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
