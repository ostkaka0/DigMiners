import { Serialize, Deserialize } from "engine/Serialization.js"

var CommandEntityEquipItem = function(entityId, stackId, itemId, equipped) {
    this.entityId = entityId;
    this.stackId = stackId;
    this.itemId = itemId;
    this.equipped = equipped;
}
export default CommandEntityEquipItem

CommandEntityEquipItem.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;

    var itemType = Config.itemRegister[this.itemId];
    if (!itemType.isEquipable) return;

    if (!entity.equippedItems) return;
    if (this.equipped)
        entity.equippedItems.items[itemType.type] = itemType;
    else
        entity.equippedItems.items[itemType.type] = null;

    var sprite = entity.bodyparts.bodyparts[itemType.type].sprite;
    if (!isServer && sprite && !this.equipped)
        sprite.visible = false;
    else if (this.equipped) {
        entity.drawable.setBodypartSprite(entity.bodyparts.bodyparts[itemType.type], new Sprite(itemType.name));
        var equippedOffset = (itemType.texture.equippedOffset ? itemType.texture.equippedOffset : [0, 0]);
        entity.bodyparts.bodyparts[itemType.type].offset[0] += equippedOffset[0];
        entity.bodyparts.bodyparts[itemType.type].offset[1] += equippedOffset[1];
    }

    if (entity.inventory) {
        var item = entity.inventory.items[this.stackId];
        if (item && itemType.itemFunction == ItemFunctions.RangedWeapon && (item.magazine == undefined || item.magazine == null)) {
            item.magazine = itemType.ammoCapacity;
        }


        if (isServer || (global.playerEntity && this.entityId == global.playerEntity.id)) {
            if (item && item.id == this.itemId) {
                item.equipped = this.equipped;
                if (!isServer)
                    gameData.HUD.update();
            }
        }
    }

    if (this.equipped)
        Entity.onEquip(entity, this.stackId, itemType);
    else
        Entity.onDequip(entity, this.stackId, itemType);
}

CommandEntityEquipItem.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.stackId);
    Serialize.int32(byteArray, index, this.itemId);
    var booleans = [];
    booleans[0] = this.equipped;
    serializeBooleans(byteArray, index, booleans);
}

CommandEntityEquipItem.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.stackId = Deserialize.int32(byteArray, index);
    this.itemId = Deserialize.int32(byteArray, index);
    this.equipped = deserializeBooleans(byteArray, index)[0];
}

CommandEntityEquipItem.prototype.getSerializationSize = function() {
    return 13;
}
