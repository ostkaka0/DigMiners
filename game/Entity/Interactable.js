
InteractableEvents = {};
InteractableEvents.onInteract = [];
InteractableEvents.onFinishInteract = [];

Interactable = function(canInteractFunction) {
    this.interacting = [];
    this.canInteractFunction = canInteractFunction || (function(interactableEntity, entity) { return true; });
    this.canInteractFunction.bind(this);
}

Interactable.prototype.name = interactable.name; function interactable() { };

Interactable.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.interacting.length);
    for (var i = 0; i < this.interacting.length; ++i)
        serializeInt32(byteArray, index, this.interacting[i]);
}

Interactable.prototype.deserialize = function(byteArray, index) {
    this.interacting = [];
    var length = deserializeInt32(byteArray, index);
    for (var i = 0; i < length; ++i)
        this.interacting[i] = deserializeInt32(byteArray, index);
}

Interactable.prototype.getSerializationSize = function() {
    return 4 + this.interacting.length;
}

Interactable.prototype.destroy = function(interactableEntity) {
    for (var i = 0; i < this.interacting.length; ++i) {
        var interactingEntity = gameData.world.entityWorld.objects[i];
        triggerEvent(InteractableEvents.onFinishInteract, interactableEntity, interactingEntity);
    }
}

Interactable.isInteracting = function(interactableEntity, entity) {
    return interactableEntity.interactable.interacting.indexOf(entity.id) != -1;
}

Interactable.canInteract = function(interactableEntity, entity) {
    return interactableEntity.interactable.canInteractFunction(interactableEntity, entity);
}

Interactable.setInteracting = function(interactableEntity, entity, booleanValue) {
    if (booleanValue) {
        interactableEntity.interactable.interacting.push(entity.id);
        triggerEvent(InteractableEvents.onInteract, interactableEntity, entity);
    } else if (!booleanValue) {
        var index = interactableEntity.interactable.interacting.indexOf(entity.id);
        if (index != -1)
            interactableEntity.interactable.interacting.splice(index, 1);
        triggerEvent(InteractableEvents.onFinishInteract, interactableEntity, entity);
    }
}