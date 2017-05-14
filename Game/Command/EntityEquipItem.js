
var CommandEntityEquipItem = function(entityId, stackId, itemId, equipped) {
    this.entityId = entityId;
    this.stackId = stackId;
    this.itemId = itemId;
    this.equipped = equipped;
}
TypeRegister.add(RegisterCommand, CommandEntityEquipItem);

CommandEntityEquipItem.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    if (!entity) return;

    var itemType = RegisterItem[this.itemId];
    if (!itemType.isEquipable) return;

    if (!entity.equippedItems) return;
    if (this.equipped)
        entity.equippedItems.items[itemType.type] = itemType;
    else
        entity.equippedItems.items[itemType.type] = null;

    if (!isServer) {
        var sprite = entity.bodyParts.bodyParts[itemType.type].sprite;
        if (!isServer && sprite && !this.equipped)
            entity.bodyParts.bodyParts[itemType.type].sprite = null;
        else if (this.equipped) {
            var sprite = new Sprite(Client.textures[itemType.texture.path]); /* TODO: Fix: , [
                (itemType.textureId % itemType.texture.dimX >> 0) * itemType.texture.spriteWidth,
                (itemType.textureId / itemType.texture.dimX >> 0) * itemType.texture.spriteHeight,
                itemType.texture.spriteWidth,
                itemType.texture.spriteHeight]);*/

            entity.bodyParts.bodyParts[itemType.type].sprite = sprite;
            //entity.drawable.setBodypartSprite(entity.bodyParts.bodyParts[itemType.type], sprite);
            //var equippedOffset = (itemType.texture.equippedOffset ? itemType.texture.equippedOffset : [0, 0]);
            //entity.bodyParts.bodyParts[itemType.type].offset[0] += equippedOffset[0];
            //entity.bodyParts.bodyParts[itemType.type].offset[1] += equippedOffset[1];
        }
    }

    if (entity.inventory) {
        var item = entity.inventory.items[this.stackId];
        if (item && itemType.itemFunction == ItemFunctions.projectile && (item.magazine == undefined || item.magazine == null)) {
            item.magazine = itemType.ammoCapacity;
        }


        if (isServer || (Client.playerEntity && this.entityId == Client.playerEntity.id)) {
            if (item && item.id == this.itemId) {
                item.equipped = this.equipped;
                if (!isServer)
                    Game.HUD.update();
            }
        }
    }

    if (this.equipped) {
        if (itemType.typeOfType == "block")
            entity.isBuilding = true;
        Event.trigger(EntityEquippedItems.Events.onEquip, entity, this.stackId, itemType);
    } else {
        if (itemType.typeOfType == "block")
            entity.isBuilding = false;
        Event.trigger(EntityEquippedItems.Events.onDequip, entity, this.stackId, itemType);
    }
}

CommandEntityEquipItem.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.stackId);
    Serialize.int32(byteArray, index, this.itemId);
    var booleans = [];
    booleans[0] = this.equipped;
    Serialize.booleans(byteArray, index, booleans);
}

CommandEntityEquipItem.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.stackId = Deserialize.int32(byteArray, index);
    this.itemId = Deserialize.int32(byteArray, index);
    this.equipped = Deserialize.booleans(byteArray, index)[0];
}

CommandEntityEquipItem.prototype.getSerializationSize = function() {
    return 13;
}
