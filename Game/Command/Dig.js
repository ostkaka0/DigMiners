









var CommandDig = function(pos, radius) {
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.radius = fix.toFix(radius);
}
global.CommandDig = CommandDig;
TypeRegister.add(RegisterCommand, CommandDig);

CommandDig.prototype.execute = function() {
    var tileWorld = World.tiles;
    World.tiles.carveCircle(Game.tileRegister, this.pos, this.radius, 5000.0, 5000.0);
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
