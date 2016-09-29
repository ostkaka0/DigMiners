
MessageRequestItemPickup = function(entityId) {
    this.entityId = entityId;
}

MessageRequestItemPickup.prototype.execute = function(gameData, player, socket) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(!entity) return;
    if(entity.isItem && !entity.destroying) {
        var playerEntity = gameData.entityWorld.objects[player.entityId];
        if(!playerEntity) return;
        var physicsBody = entity.physicsBody;
        var playerPhysicsBody = playerEntity.physicsBody;

        var dis = v2.distance(physicsBody.pos, playerPhysicsBody.pos);
        //console.log("dis: " + dis);
        if(dis <= gameData.itemPickupDistance + 0.1) {
            entity.destroying = true;
            // Add item to player inventory
            var message = new MessagePlayerInventory(player.id, 0, entity.itemId, entity.amount);
            message.execute(gameData);
            message.send(player.socket);
            // Destroy entity
            message = new MessageEntityDestroy(this.entityId);
            message.execute(gameData);
            message.send(io.sockets);
        }
    }
}

MessageRequestItemPickup.prototype.send = function(socket) {
    socket.emit(this.idString, this.entityId);
}

MessageRequestItemPickup.prototype.receive = function(gameData, data) {
    this.entityId = data;
}
