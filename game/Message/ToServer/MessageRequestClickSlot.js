
MessageRequestClickSlot = function(slotId, clickType) {
    this.slotId = slotId;
    this.clickType = clickType;
}

MessageRequestClickSlot.prototype.execute = function(gameData, player) {
    var entity = gameData.entityWorld.objects[player.entityId];
    if (!entity) return;
    var item = entity.inventory.items[this.slotId];
    if (!item) return;
    if (this.clickType == InventoryClickTypes.LEFT_CLICK) {
        // Drop stack
        var physicsBody = entity.physicsBody;
        if (!physicsBody) return;
        var displacement1 = Math.random() / 5 - 0.1;
        var displacement2 = Math.random() / 5 - 0.1;
        var displacement3 = Math.random() / 5 - 0.1 + 1;
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

        sendCommand(new CommandEntityInventory(player.entityId, InventoryActions.DROP_STACK, this.slotId, 0));

        if (item.equipped)
            sendCommand(new CommandEntityEquipItem(player.entityId, this.slotId, item.id, false));
    } else if (this.clickType == InventoryClickTypes.RIGHT_CLICK) {
        // Equip stack
        var itemType = gameData.itemRegister[item.id];
        if (itemType && itemType.isEquipable) {
            if (item.equipped == null || item.equipped == undefined)
                item.equipped = false;
            var equipped = !item.equipped;
            if (equipped && entity.inventory) {
                // Dequip all other items of the same type
                var dequippedItems = entity.inventory.dequipAll(gameData, itemType.type, entity.id);
                for (var i = 0; i < dequippedItems.length; ++i) {
                    var entry = dequippedItems[i];
                    sendCommand(new CommandEntityEquipItem(player.entityId, entry[0], entry[1], false));
                };
            }
            sendCommand(new CommandEntityEquipItem(player.entityId, this.slotId, item.id, equipped));
        }
    }
}

MessageRequestClickSlot.prototype.send = function(socket) {
    socket.emit(this.idString, [this.slotId, this.clickType]);
}

MessageRequestClickSlot.prototype.receive = function(gameData, data) {
    this.slotId = data[0];
    this.clickType = data[1];
}
