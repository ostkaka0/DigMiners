import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import Event from "Engine/Core/Event.js";
import RegisterEntity from "Engine/Register/Entity.js";

var EntityInteractable = function(canInteractFunction) {
    this.interacting = [];
    this.canInteractFunction = canInteractFunction || (function(interactableEntity, entity) { return true; });
    this.canInteractFunction.bind(this);
}
export default EntityInteractable
RegisterEntity.push(EntityInteractable);
EntityInteractable.Events = { onInteract: new Map(), onFinishInteract: new Map() };

EntityInteractable.prototype.name = interactable.name; function interactable() { };

EntityInteractable.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.interacting.length);
    for (var i = 0; i < this.interacting.length; ++i)
        Serialize.int32(byteArray, index, this.interacting[i]);
}

EntityInteractable.prototype.deserialize = function(byteArray, index) {
    this.interacting = [];
    var length = Deserialize.int32(byteArray, index);
    for (var i = 0; i < length; ++i)
        this.interacting[i] = Deserialize.int32(byteArray, index);
}

EntityInteractable.prototype.getSerializationSize = function() {
    return 4 + this.interacting.length;
}

EntityInteractable.prototype.destroy = function(interactableEntity) {
    for (var i = 0; i < this.interacting.length; ++i) {
        var interactingEntity = global.gameData.world.entityWorld.objects[i];
        Event.trigger(EntityInteractable.Events.onFinishInteract, interactableEntity, interactingEntity);
    }
}

EntityInteractable.isInteracting = function(interactableEntity, entity) {
    return interactableEntity.interactable.interacting.indexOf(entity.id) != -1;
}

EntityInteractable.canInteract = function(interactableEntity, entity) {
    return interactableEntity.interactable.canInteractFunction(interactableEntity, entity);
}

EntityInteractable.setInteracting = function(interactableEntity, entity, booleanValue) {
    if (booleanValue) {
        interactableEntity.interactable.interacting.push(entity.id);
        Event.trigger(EntityInteractable.Events.onInteract, interactableEntity, entity);
    } else if (!booleanValue) {
        var index = interactableEntity.interactable.interacting.indexOf(entity.id);
        if (index != -1)
            interactableEntity.interactable.interacting.splice(index, 1);
        Event.trigger(EntityInteractable.Events.onFinishInteract, interactableEntity, entity);
    }
}
