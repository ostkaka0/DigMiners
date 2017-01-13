
CommandEntityEquipItem = function(entityId, stackId, itemId, equipped) {
    this.entityId = entityId;
    this.stackId = stackId;
    this.itemId = itemId;
    this.equipped = equipped;
}

CommandEntityEquipItem.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity) return;

    var itemType = Config.itemRegister[this.itemId];
    if (!itemType.isEquipable) return;

    if (!entity.equippedItems) return;
    if (this.equipped)
        entity.equippedItems.items[itemType.type] = itemType;
    else
        entity.equippedItems.items[itemType.type] = null;

    var sprite = entity.bodyparts.bodyparts[itemType.type].sprite;
    if (!isServer && sprite.sprite && !this.equipped)
        sprite.sprite.visible = false;
    else if (this.equipped) {
        entity.drawable.setBodypartSprite(entity.bodyparts.bodyparts[itemType.type], new Sprite(itemType.name));
        var equippedOffset = (itemType.texture.equippedOffset ? itemType.texture.equippedOffset : [0, 0]);
        entity.bodyparts.bodyparts[itemType.type].offset[0] += equippedOffset[0];
        entity.bodyparts.bodyparts[itemType.type].offset[1] += equippedOffset[1];
    }

    if (isServer || (global.playerEntity && this.entityId == global.playerEntity.id)) {
        if (entity.inventory) {
            var item = entity.inventory.items[this.stackId];
            if (item && item.id == this.itemId) {
                item.equipped = this.equipped;
                if (!isServer)
                    updateHUD(gameData);
            }
        }
    }

    if (this.equipped)
        Entity.onEquip(entity, this.stackId, itemType);
    else
        Entity.onDequip(entity, this.stackId, itemType);
}

CommandEntityEquipItem.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.stackId);
    serializeInt32(byteArray, index, this.itemId);
    var booleans = [];
    booleans[0] = this.equipped;
    serializeBooleans(byteArray, index, booleans);
}

CommandEntityEquipItem.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.stackId = deserializeInt32(byteArray, index);
    this.itemId = deserializeInt32(byteArray, index);
    this.equipped = deserializeBooleans(byteArray, index)[0];
}

CommandEntityEquipItem.prototype.getSerializationSize = function() {
    return 13;
}
