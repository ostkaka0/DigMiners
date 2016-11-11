
ControlledByPlayer = function(playerId) {
    this.playerId = playerId;
}

ControlledByPlayer.prototype.name = controlledByPlayer.name; function controlledByPlayer() { };

ControlledByPlayer.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
}

ControlledByPlayer.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
}

ControlledByPlayer.prototype.getSerializationSize = function() {
    return 4;
}

ControlledByPlayer.prototype.destroy = function(entity) {

}