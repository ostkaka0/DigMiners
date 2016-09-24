CommandDig = function (x, y, radius) {
    this.x = toFix(x);
    this.y = toFix(y);
    this.radius = toFix(radius);
}

CommandDig.prototype.execute = function (gameData) {
    var tileWorld = gameData.tileWorld;
    carveCircle(gameData, this.x, this.y, this.radius);
}

CommandDig.prototype.serialize = function (byteArray, index) {
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index += 4, this.y);
    serializeFix(byteArray, index += 4, this.radius);
}

CommandDig.prototype.deserialize = function (byteArray, index) {
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index += 4);
    this.radius = deserializeFix(byteArray, index += 4);
}

CommandDig.prototype.getSerializationSize = function () {
    return 12;
}
