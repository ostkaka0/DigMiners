
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
    Interactable.setInteracting(interactableEntity, entity, this.interacting);
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
