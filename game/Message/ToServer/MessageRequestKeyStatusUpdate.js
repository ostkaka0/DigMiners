
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
        var angle = physicsBody.angle;
        var dir = [Math.cos(-angle), Math.sin(-angle)];
        var interactablePos = [physicsBody.getPos()[0] + 1.0 * dir[0], physicsBody.getPos()[1] + 1.0 * dir[1]];
        var bodies = [];
        var distances = [];
        gameData.world.physicsWorld.getBodiesInRadiusSorted(bodies, distances, interactablePos, 0.25);
        if (bodies.length > 0) {
            var targetEntity = gameData.world.physicsEntities[bodies[0]];
            // Interact only if player has nothing equipped in hands
            if (targetEntity && targetEntity.interactable && entity.equippedItems && !entity.equippedItems.items["tool"]) {
                if (!Interactable.isInteracting(targetEntity, entity)) {
                    if (Interactable.canInteract(targetEntity, entity))
                        sendCommand(new CommandEntityInteractEntity(entity.id, targetEntity.id, true));
                } else
                    sendCommand(new CommandEntityInteractEntity(entity.id, targetEntity.id, false));
            }
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
