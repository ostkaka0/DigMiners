







;




var MessageRequestItemPickup = function(entityId) {
    this.entityId = entityId;
}
global.MessageRequestItemPickup = MessageRequestItemPickup;
RegisterMessage.ToServer.push(MessageRequestItemPickup);

MessageRequestItemPickup.prototype.execute = function(gameData, player) {
    var entity = World.entities.objects[this.entityId];
    if (!entity) return;
    if (entity.item && !entity.pickedUp) {
        var playerEntity = World.entities.objects[player.entityId];
        if (!playerEntity) return;
        var physicsBody = entity.physicsBody;
        var playerPhysicsBody = playerEntity.physicsBody;

        var dis = v2.distance(physicsBody.getPos(), playerPhysicsBody.getPos());
        if (dis <= Config.itemPickupDistance + 0.1) {
            entity.pickedUp = true;
            // Add item to player inventory
            sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.ADD_ITEM, entity.item.itemId, entity.item.amount));
            // Destroy entity
            sendCommand(new CommandEntityDestroy(this.entityId));
        }
    }
}

MessageRequestItemPickup.prototype.send = function(socket) {
    socket.emit(this.idString, this.entityId);
}

MessageRequestItemPickup.prototype.receive = function(gameData, data) {
    this.entityId = data;
}
