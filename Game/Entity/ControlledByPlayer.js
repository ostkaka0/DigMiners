var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize

var ControlledByPlayer = function(playerId) {
    this.playerId = playerId;
}
module.exports = ControlledByPlayer

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
