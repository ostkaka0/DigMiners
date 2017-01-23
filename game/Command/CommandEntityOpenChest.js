
CommandEntityOpenChest = function(entityId, chestEntityId) {
    this.entityId = entityId;
    this.chestEntityId = chestEntityId;
}

CommandEntityOpenChest.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;
    var chestEntity = gameData.world.entityWorld.objects[this.chestEntityId];
    if (!chestEntity || !chestEntity.chest) return;
    //TODO: store who has chest opened and who has not
    if (!isServer) {
        entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArmAction", 200, true);
        entity.bodyparts.bodyparts["leftArm"].cycle(gameData, "leftArmAction", 200, true);
        if (global.playerEntity && global.playerEntity.id == this.entityId) {
            if (chestEntity.inventory) {
                if (gameData.HUD.inventory2) {
                    gameData.HUD.inventory2.remove();
                    gameData.HUD.inventory2 = null;
                } else {
                    //TODO: inventory size
                    gameData.HUD.inventory2 = new InventoryHUD(chestEntity.inventory, 10, 1, "Chest", 80);
                    gameData.HUD.inventory2.update();
                }
            }
        }
    }
}

CommandEntityOpenChest.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.chestEntityId);
}

CommandEntityOpenChest.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.chestEntityId = deserializeInt32(byteArray, index);
}

CommandEntityOpenChest.prototype.getSerializationSize = function() {
    return 8;
}
