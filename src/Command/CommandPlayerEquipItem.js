
CommandPlayerEquipItem = function(playerId, stackId, itemId, equipped) {
    this.playerId = playerId;
    this.stackId = stackId;
    this.itemId = itemId;
    this.equipped = equipped;
}

CommandPlayerEquipItem.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = gameData.entityWorld.objects[player.entityId];

    var itemType = gameData.itemRegister[this.itemId];

    var sprite = entity.bodyparts.bodyparts[itemType.type].sprite;
    if(!isServer && sprite.sprite && !this.equipped)
        sprite.sprite.visible = false;
    else if(this.equipped) {
        entity.drawable.setBodypartSprite(entity.bodyparts.bodyparts[itemType.type], new Sprite(itemType.name));
        var equippedOffset = (itemType.texture.equippedOffset ? itemType.texture.equippedOffset : [0, 0]);
        entity.bodyparts.bodyparts[itemType.type].offset[0] += equippedOffset[0];
        entity.bodyparts.bodyparts[itemType.type].offset[1] += equippedOffset[1];
    }

    if(this.equipped)
        player.onEquip(this.stackId, itemType);
    else
        player.onDequip(this.stackId, itemType);

    if(isServer || this.playerId == global.player.playerId) {
        var item = player.inventory.items[this.stackId];
        if(item && item.id == this.itemId) {
            if(this.equipped)
                player.inventory.dequipAll(gameData, itemType.type, entity.id);
            item.equipped = this.equipped;
            if(!isServer)
                updateHUD(gameData);
        }
    }
}

CommandPlayerEquipItem.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.stackId);
    serializeInt32(byteArray, index, this.itemId);
    var booleans = [];
    booleans[0] = this.equipped;
    serializeBooleans(byteArray, index, booleans);
}

CommandPlayerEquipItem.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.stackId = deserializeInt32(byteArray, index);
    this.itemId = deserializeInt32(byteArray, index);
    this.equipped = deserializeBooleans(byteArray, index)[0];
}

CommandPlayerEquipItem.prototype.getSerializationSize = function() {
    return 13;
}
