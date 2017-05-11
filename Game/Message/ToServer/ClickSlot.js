
var MessageRequestClickSlot = function(inventoryId, slotId, clickType) {
    this.inventoryId = inventoryId;
    this.slotId = slotId;
    this.clickType = clickType;
}
TypeRegister.add(RegisterMessage.ToServer, MessageRequestClickSlot);

MessageRequestClickSlot.prototype.execute = function(player) {
    var entity = World.entities.objects[player.entityId];
    if (!entity) return;
    var inventory = World.inventories[this.inventoryId];
    if (!inventory) return;
    if (entity.inventory && entity.inventory.inventoryId != this.inventoryId) {
        if (!entity.interacter || !entity.interacter.interacting)
            return;
        var interactableEntity = World.entities.objects[entity.interacter.interacting];
        if (!interactableEntity || !interactableEntity.inventory)
            return;
        if (interactableEntity.inventory.inventoryId != this.inventoryId)
            return;
        return;
    }
    var item = inventory.items[this.slotId];
    if (!item) return;
    // Uncomment to enable throwing items on the ground
    /*if (this.clickType == EntityInventoryClickTypes.RIGHT_CLICK) {
        // Drop stack
        var physicsBody = entity.physicsBody;
        if (!physicsBody) return;
        var displacement1 = Math.random() / 5 - 0.1;
        var displacement2 = Math.random() / 5 - 0.1;
        var displacement3 = Math.random() / 5 - 0.1 + 1;
        var speed = v2.create(Math.cos(displacement1 + physicsBody.angle), -Math.sin(displacement2 + physicsBody.angle));
        var speed2 = {};
        v2.mul(10.0 * displacement3, speed, speed2);

<<<<<<< HEAD
        var itemEntityId = idList.next();
        var itemEntity = entityTemplateItem(item.id, item.amount);
=======
        var itemEntityId = World.idList.next();
        var itemEntity = entityTemplates.Item(item.id, item.amount);
>>>>>>> master
        itemEntity.physicsBody.setPos(physicsBody.getPos());
        itemEntity.physicsBody.posOld = v2.clone(physicsBody.getPos());
        itemEntity.physicsBody.setVelocity([speed2[0], speed2[1]]);
        itemEntity.physicsBody.speedOld = v2.create(speed2[0], speed2[1]);
        itemEntity.physicsBody.angle = physicsBody.angle;
        itemEntity.physicsBody.angleOld = physicsBody.angle;
        itemEntity.item.dropped = new Date();
        sendCommand(new CommandEntitySpawn(itemEntity, itemEntityId));

        sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.DROP_STACK, this.slotId, 0));

        if (item.equipped)
            sendCommand(new CommandEntityEquipItem(player.entityId, this.slotId, item.id, false));
    } else if (this.clickType == EntityInventoryClickTypes.LEFT_CLICK)*/ {
        // Only equip items in own inventory
        if (entity.inventory && entity.inventory.inventoryId == this.inventoryId) {
            // Equip stack
            var itemType = RegisterItem[item.id];
            if (itemType && itemType.isEquipable) {
                if (item.equipped == null || item.equipped == undefined)
                    item.equipped = false;
                var equipped = !item.equipped;
                if (equipped && inventory) {
                    // Dequip all other items of the same type
                    var dequippedItems = inventory.dequipAll(itemType.type, entity.id);
                    for (var i = 0; i < dequippedItems.length; ++i) {
                        var entry = dequippedItems[i];
                        sendCommand(new CommandEntityEquipItem(player.entityId, entry[0], entry[1], false));
                    };
                }
                sendCommand(new CommandEntityEquipItem(player.entityId, this.slotId, item.id, equipped));
            }
        }
    }
}

MessageRequestClickSlot.prototype.send = function(socket) {
    socket.emit(this.idString, [this.inventoryId, this.slotId, this.clickType]);
}

MessageRequestClickSlot.prototype.receive = function(data) {
    this.inventoryId = data[0];
    this.slotId = data[1];
    this.clickType = data[2];
}
