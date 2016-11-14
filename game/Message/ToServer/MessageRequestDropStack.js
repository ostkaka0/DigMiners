
MessageRequestDropStack = function(id) {
    this.id = id;
}

MessageRequestDropStack.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[player.entityId];
    if (!entity) return;
    var item = entity.inventory.items[this.id];
    if (item) {
        var physicsBody = entity.physicsBody;
        if (!physicsBody) return;
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
        sendCommand(new CommandEntitySpawn(gameData, itemEntity, itemEntityId));

        sendCommand(new CommandPlayerInventory(player.playerId, InventoryActions.DROP_STACK, this.id, 0));

        if (item.equipped)
            sendCommand(new CommandEntityEquipItem(player.entityId, this.id, item.id, false));
    }
}

MessageRequestDropStack.prototype.send = function(socket) {
    socket.emit(this.idString, this.id);
}

MessageRequestDropStack.prototype.receive = function(gameData, data) {
    this.id = data;
}
