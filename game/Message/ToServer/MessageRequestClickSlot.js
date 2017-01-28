import { Serialize, Deserialize } from "engine/Serialization.js"

var MessageRequestClickSlot = function(inventoryId, slotId, clickType) {
    this.inventoryId = inventoryId;
    this.slotId = slotId;
    this.clickType = clickType;
}
export default MessageRequestClickSlot

MessageRequestClickSlot.prototype.execute = function(gameData, player) {
    var entity = gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var inventory = gameData.world.inventories[this.inventoryId];
    if (!inventory) return;
    if (entity.inventory && entity.inventory.inventoryId != this.inventoryId) {
        if (!entity.interacter || !entity.interacter.interacting)
            return;
        var interactableEntity = gameData.world.entityWorld.objects[entity.interacter.interacting];
        if (!interactableEntity || !interactableEntity.inventory)
            return;
        if (interactableEntity.inventory.inventoryId != this.inventoryId)
            return;
        return;
    }
    var item = inventory.items[this.slotId];
    if (!item) return;
    /*if (this.clickType == InventoryClickTypes.RIGHT_CLICK) {
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
        var itemEntity = entityTemplateItem(item.id, item.amount, gameData);
        itemEntity.physicsBody.setPos(physicsBody.getPos());
        itemEntity.physicsBody.posOld = v2.clone(physicsBody.getPos());
        itemEntity.physicsBody.setVelocity([speed2[0], speed2[1]]);
        itemEntity.physicsBody.speedOld = v2.create(speed2[0], speed2[1]);
        itemEntity.physicsBody.angle = physicsBody.angle;
        itemEntity.physicsBody.angleOld = physicsBody.angle;
        itemEntity.item.dropped = new Date();
        sendCommand(new CommandEntitySpawn(gameData, itemEntity, itemEntityId));

        sendCommand(new CommandEntityInventory(player.entityId, InventoryActions.DROP_STACK, this.slotId, 0));

        if (item.equipped)
            sendCommand(new CommandEntityEquipItem(player.entityId, this.slotId, item.id, false));
    } else if (this.clickType == InventoryClickTypes.LEFT_CLICK)*/ {
        // Only equip items in own inventory
        if (entity.inventory && entity.inventory.inventoryId == this.inventoryId) {
            // Equip stack
            var itemType = Config.itemRegister[item.id];
            if (itemType && itemType.isEquipable) {
                if (item.equipped == null || item.equipped == undefined)
                    item.equipped = false;
                var equipped = !item.equipped;
                if (equipped && inventory) {
                    // Dequip all other items of the same type
                    var dequippedItems = inventory.dequipAll(gameData, itemType.type, entity.id);
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

MessageRequestClickSlot.prototype.receive = function(gameData, data) {
    this.inventoryId = data[0];
    this.slotId = data[1];
    this.clickType = data[2];
}
