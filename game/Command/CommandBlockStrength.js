var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var TileWorld = require("engine/TileWorld.js")
var BlockWorld = require("engine/BlockWorld.js")

var Command = require("game/Command/Command.js")
var Config = require("game/Config.js")
var Global = require("game/Global.js")

var CommandBlockStrength = function(x, y, strength) {
    this.x = x;
    this.y = y;
    this.strength = Math.max(strength, 0);
}
module.exports = CommandBlockStrength
Command.Register.push(module.exports)

CommandBlockStrength.prototype.execute = function() {
    if (this.strength > 0)
        BlockWorld.setStrength(Global.gameData.world.blockWorld, this.x, this.y, this.strength);
    else
        BlockWorld.setForeground(Global.gameData.world.blockWorld, this.x, this.y, 0);
}

CommandBlockStrength.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.x);
    Serialize.int32(byteArray, index, this.y);
    Serialize.int8(byteArray, index, this.strength);
}

CommandBlockStrength.prototype.deserialize = function(byteArray, index) {
    this.x = Deserialize.int32(byteArray, index);
    this.y = Deserialize.int32(byteArray, index);
    this.strength = Deserialize.int8(byteArray, index);
}

CommandBlockStrength.prototype.getSerializationSize = function() {
    return 9;
}
