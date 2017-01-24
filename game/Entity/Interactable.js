
InteractableEvents = {};
InteractableEvents.onInteract = [];
InteractableEvents.onFinishInteract = [];

Interactable = function() {
    this.interacting = [];
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

Interactable.prototype.destroy = function(entity) {
    for (var i = 0; i < this.interacting.length; ++i) {
        var entity = gameData.world.entityWorld.objects[i];
        triggerEvent(InteractableEvents.onFinishInteract, this, entity);
    }

}

Interactable.prototype.isInteracting = function(entity) {
    return this.interacting.indexOf(entity.id) != -1;
}

Interactable.prototype.setInteracting = function(entity, booleanValue) {
    var index = this.interacting.indexOf(entity.id);
    if (booleanValue && index == -1) {
        this.interacting.push(entity.id);
        triggerEvent(InteractableEvents.onInteract, this, entity);
    } else if (!booleanValue && index != -1) {
        this.interacting.splice(index, 1);
        triggerEvent(InteractableEvents.onFinishInteract, this, entity);
    }
}