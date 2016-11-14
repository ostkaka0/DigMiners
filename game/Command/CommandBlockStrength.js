
CommandBlockStrength = function(x, y, strength) {
    this.x = x;
    this.y = y;
    this.strength = strength;
}

CommandBlockStrength.prototype.execute = function(gameData) {
    setStrength(gameData.blockWorld, this.x, this.y, this.strength);
}

CommandBlockStrength.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.x);
    serializeInt32(byteArray, index, this.y);
    serializeInt8(byteArray, index, this.strength);
}

CommandBlockStrength.prototype.deserialize = function(byteArray, index) {
    this.x = deserializeInt32(byteArray, index);
    this.y = deserializeInt32(byteArray, index);
    this.strength = deserializeInt8(byteArray, index);
}

CommandBlockStrength.prototype.getSerializationSize = function() {
    return 9;
}
