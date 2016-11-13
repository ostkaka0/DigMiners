
MessageRequestItemPickup = function(entityId) {
    this.entityId = entityId;
}

MessageRequestItemPickup.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(!entity) return;
    if(entity.item && !entity.pickedUp) {
        var playerEntity = gameData.entityWorld.objects[player.entityId];
        if(!playerEntity) return;
        var physicsBody = entity.physicsBody;
        var playerPhysicsBody = playerEntity.physicsBody;

        var dis = v2.distance(physicsBody.pos, playerPhysicsBody.pos);
        if(dis <= gameData.itemPickupDistance + 0.1) {
            entity.pickedUp = true;
            // Add item to player inventory
            var message = new MessagePlayerInventory(player.playerId, InventoryActions.ADD_ITEM, entity.item.itemId, entity.item.amount);
            message.execute(gameData);
            message.send(player.socket);
            // Destroy entity
            gameData.commands.push(new CommandEntityDestroy(this.entityId));
        }
    }
}

MessageRequestItemPickup.prototype.send = function(socket) {
    socket.emit(this.idString, this.entityId);
}

MessageRequestItemPickup.prototype.receive = function(gameData, data) {
    this.entityId = data;
}
