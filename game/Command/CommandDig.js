import { Serialize, Deserialize } from "engine/Serialization.js"

var CommandDig = function(pos, radius) {
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.radius = toFix(radius);
}
export CommandDig

CommandDig.prototype.execute = function() {
    var tileWorld = gameData.world.tileWorld;
    carveCircle(gameData, this.pos[0], this.pos[1], this.radius, 5000.0, 5000.0);
}

CommandDig.prototype.serialize = function(byteArray, index) {
    Serialize.v2(byteArray, index, this.pos);
    Serialize.fix(byteArray, index, this.radius);
}

CommandDig.prototype.deserialize = function(byteArray, index) {
    this.pos = Deserialize.v2(byteArray, index);
    this.radius = Deserialize.fix(byteArray, index);
}

CommandDig.prototype.getSerializationSize = function() {
    return 12;
}
