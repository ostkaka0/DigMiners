import { Serialize, Deserialize } from "engine/Serialization.js"

import Config from "game/Config.js"
import Global from "game/Global.js"

var CommandEntityInteractEntity = function(entityId, interactableEntityId, interacting) {
    this.entityId = entityId;
    this.interactableEntityId = interactableEntityId;
    this.interacting = interacting;
}
export default CommandEntityInteractEntity

CommandEntityInteractEntity.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;
    var interactableEntity = Global.gameData.world.entityWorld.objects[this.interactableEntityId];
    if (!interactableEntity || !interactableEntity.interactable) return;
    Interactable.setInteracting(interactableEntity, entity, this.interacting);
}

CommandEntityInteractEntity.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.interactableEntityId);
    var booleans = [];
    booleans[0] = this.interacting;
    Serialize.booleans(byteArray, index, booleans);
}

CommandEntityInteractEntity.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.interactableEntityId = Deserialize.int32(byteArray, index);
    this.interacting = Deserialize.booleans(byteArray, index)[0];
}

CommandEntityInteractEntity.prototype.getSerializationSize = function() {
    return 9;
}
