var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var TileWorld = require("Engine/TileWorld.js")

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Command = require("Game/Command/Command.js")

var CommandDig = function(pos, radius) {
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.radius = fix.toFix(radius);
}
module.exports = CommandDig
Command.Register.push(module.exports)

CommandDig.prototype.execute = function() {
    var tileWorld = Global.gameData.world.tileWorld;
    TileWorld.carveCircle(Global.gameData, this.pos[0], this.pos[1], this.radius, 5000.0, 5000.0);
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
