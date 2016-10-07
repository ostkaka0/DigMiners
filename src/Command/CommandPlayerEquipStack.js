
CommandPlayerEquipStack = function(playerId, stackId) {
    this.playerId = playerId;
    this.stackId = stackId;
}

CommandPlayerEquipStack.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = gameData.entityWorld.objects[player.entityId];
    if(!entity) return;
    var item = player.inventory.items[this.stackId];
    if(!item) return;
    var itemType = gameData.itemRegister[item.id];
    if(item.equipped == null || item.equipped == undefined)
        item.equipped = false;
    item.equipped = !item.equipped;

    if(itemType.type == "hat") {
        if(item.equipped) {
            player.inventory.dequipAll(gameData, "hat", entity.id);
            item.equipped = true;
            item.onDequip = function(gameData, arg) {
                var entity = gameData.entityWorld.objects[arg];
                entity.drawable.removeSprite("hat");
            };
            entity.drawable.addSprite("hat", new Sprite(itemType.texture), [0, 0], true);
        } else
            item.onDequip(gameData, entity.id);
    }
    else if(itemType.type == "tool") {
        if(item.equipped) {
            player.inventory.dequipAll(gameData, "tool", entity.id);
            item.equipped = true;
            if(!isServer) {
                item.onDequip = function(gameData, arg) {
                    var entity = gameData.entityWorld.objects[arg];
                    var sprite = entity.drawable.bodyparts["itemHolder"].sprite;
                    if(sprite.sprite)
                        sprite.sprite.visible = false;
                };
                entity.drawable.setBodypartSprite("itemHolder", entity.drawable.bodyparts["itemHolder"], new Sprite(itemType.texture));
            }
        } else {
            if(!isServer)
                item.onDequip(gameData, entity.id);
        }
    }

    if(!isServer && this.playerId == global.player.playerId)
        updateHUD(gameData);

}

CommandPlayerEquipStack.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.stackId);
}

CommandPlayerEquipStack.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.stackId = deserializeInt32(byteArray, index);
}

CommandPlayerEquipStack.prototype.getSerializationSize = function() {
    return 8;
}
