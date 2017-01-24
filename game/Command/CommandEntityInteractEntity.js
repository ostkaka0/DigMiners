
CommandEntityInteractEntity = function(entityId, interactableEntityId, interacting) {
    this.entityId = entityId;
    this.interactableEntityId = interactableEntityId;
    this.interacting = interacting;
}

CommandEntityInteractEntity.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;
    var interactableEntity = gameData.world.entityWorld.objects[this.interactableEntityId];
    if (!interactableEntity || !interactableEntity.interactable) return;
    //TODO: un-interact old 
    Interactable.setInteracting(interactableEntity, entity, this.interacting);
    if (!isServer) {
        entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArmAction", 200, true);
        entity.bodyparts.bodyparts["leftArm"].cycle(gameData, "leftArmAction", 200, true);
        /*if (global.playerEntity && global.playerEntity.id == this.entityId) {
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
        }*/
    }
}

CommandEntityInteractEntity.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.interactableEntityId);
    var booleans = [];
    booleans[0] = this.interacting;
    serializeBooleans(byteArray, index, booleans);
}

CommandEntityInteractEntity.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.interactableEntityId = deserializeInt32(byteArray, index);
    this.interacting = deserializeBooleans(byteArray, index)[0];
}

CommandEntityInteractEntity.prototype.getSerializationSize = function() {
    return 9;
}
