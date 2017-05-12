
var MessageRequestItemPickup = function(entityId) {
    this.entityId = entityId;
}
TypeRegister.add(RegisterMessage.ToServer, MessageRequestItemPickup);

MessageRequestItemPickup.prototype.execute = function(player) {
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

MessageRequestItemPickup.prototype.receive = function(data) {
    this.entityId = data;
}
