
CommandDig = function(x, y, radius) {
    this.x = toFix(x);
    this.y = toFix(y);
    this.radius = toFix(radius);
}

CommandDig.prototype.execute = function(gameData) {
    var tileWorld = gameData.tileWorld;
    carveCircle(gameData, this.x, this.y, this.radius);
}

CommandDig.prototype.serialize = function(byteArray, index) {
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
    serializeFix(byteArray, index, this.radius);
}

CommandDig.prototype.deserialize = function(byteArray, index) {
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
    this.radius = deserializeFix(byteArray, index);
}

CommandDig.prototype.getSerializationSize = function() {
    return 12;
}
