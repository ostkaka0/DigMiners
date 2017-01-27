import { Serialize, Deserialize } from "engine/Serialization.js"

ControlledByPlayer = function(playerId) {
    this.playerId = playerId;
}
export default ControlledByPlayer

ControlledByPlayer.prototype.name = controlledByPlayer.name; function controlledByPlayer() { };

ControlledByPlayer.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
}

ControlledByPlayer.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
}

ControlledByPlayer.prototype.getSerializationSize = function() {
    return 4;
}

ControlledByPlayer.prototype.destroy = function(entity) {

}
