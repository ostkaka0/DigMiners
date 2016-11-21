
CommandBlockStrength = function(x, y, strength) {
    this.x = x;
    this.y = y;
    this.strength = Math.max(strength, 0);
}

CommandBlockStrength.prototype.execute = function(gameData) {
    if (this.strength > 0)
        setStrength(gameData.blockWorld, this.x, this.y, this.strength);
    else
        setForeground(gameData.blockWorld, this.x, this.y, 0);
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
