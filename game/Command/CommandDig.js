
CommandDig = function(pos, radius) {
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.radius = toFix(radius);
}

CommandDig.prototype.execute = function(gameData) {
    var tileWorld = gameData.tileWorld;
    carveCircle(gameData, this.x, this.y, this.radius);
}

CommandDig.prototype.serialize = function(byteArray, index) {
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.radius);
}

CommandDig.prototype.deserialize = function(byteArray, index) {
    this.pos = deserializeV2(byteArray, index);
    this.radius = deserializeFix(byteArray, index);
}

CommandDig.prototype.getSerializationSize = function() {
    return 12;
}
