var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var Global = require("Game/Global.js")
var Event = require("Engine/Core/Event.js")

var Interactable = function(canInteractFunction) {
    this.interacting = [];
    this.canInteractFunction = canInteractFunction || (function(interactableEntity, entity) { return true; });
    this.canInteractFunction.bind(this);
}
module.exports = Interactable
Interactable.Events = {};
Interactable.Events.onInteract = [];
Interactable.Events.onFinishInteract = [];

Interactable.prototype.name = interactable.name; function interactable() { };

Interactable.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.interacting.length);
    for (var i = 0; i < this.interacting.length; ++i)
        Serialize.int32(byteArray, index, this.interacting[i]);
}

Interactable.prototype.deserialize = function(byteArray, index) {
    this.interacting = [];
    var length = Deserialize.int32(byteArray, index);
    for (var i = 0; i < length; ++i)
        this.interacting[i] = Deserialize.int32(byteArray, index);
}

Interactable.prototype.getSerializationSize = function() {
    return 4 + this.interacting.length;
}

Interactable.prototype.destroy = function(interactableEntity) {
    for (var i = 0; i < this.interacting.length; ++i) {
        var interactingEntity = Global.gameData.world.entityWorld.objects[i];
        Event.trigger(Interactable.Events.onFinishInteract, interactableEntity, interactingEntity);
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
        Event.trigger(Interactable.Events.onInteract, interactableEntity, entity);
    } else if (!booleanValue) {
        var index = interactableEntity.interactable.interacting.indexOf(entity.id);
        if (index != -1)
            interactableEntity.interactable.interacting.splice(index, 1);
        Event.trigger(Interactable.Events.onFinishInteract, interactableEntity, entity);
    }
}
