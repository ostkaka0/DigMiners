
MessageRequestKeyStatusUpdate = function(key, pressed) {
    this.key = key;
    this.pressed = pressed;
}

MessageRequestKeyStatusUpdate.prototype.execute = function(gameData, player) {
    var entity = gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;

    if (this.key == Keys.SPACEBAR && this.pressed) {
        var bodies = [];
        var distances = [];
        gameData.world.physicsWorld.getBodiesInRadiusSorted(bodies, distances, physicsBody.getPos(), 1.0);
        if (bodies.length > 0) {
            var targetEntity = gameData.world.physicsEntities[bodies[0]];
            // Open only if player has nothing equipped in hands
            if (targetEntity.chest && entity.equippedItems && !entity.equippedItems.items["tool"])
                sendCommand(new CommandEntityOpenChest(entity.id, targetEntity.id));
        }
    }

    sendCommand(new CommandKeyStatusUpdate(player.entityId, this.key, this.pressed, physicsBody.getPos()));
}

MessageRequestKeyStatusUpdate.prototype.send = function(socket) {
    socket.emit(this.idString, [this.key, this.pressed]);
}

MessageRequestKeyStatusUpdate.prototype.receive = function(gameData, data) {
    this.key = data[0];
    this.pressed = data[1];
}
