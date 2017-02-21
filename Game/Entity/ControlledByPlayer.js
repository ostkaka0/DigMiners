import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import EntityRegister from "Engine/Register/Entity.js";

var EntityControlledByPlayer = function(playerId) {
    this.playerId = playerId;
}
export default EntityControlledByPlayer
EntityRegister.push(EntityControlledByPlayer);

EntityControlledByPlayer.prototype.name = controlledByPlayer.name; function controlledByPlayer() { };

EntityControlledByPlayer.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
}

EntityControlledByPlayer.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
}

EntityControlledByPlayer.prototype.getSerializationSize = function() {
    return 4;
}

EntityControlledByPlayer.prototype.destroy = function(entity) {

}
