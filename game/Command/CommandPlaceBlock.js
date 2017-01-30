var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var BlockWorld = require("engine/BlockWorld.js")
var TileWorld = require("engine/TileWorld.js")

var Config = require("game/Config.js")
var Global = require("game/Global.js")

var CommandPlaceBlock = function(blockPos, blockId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
}
module.exports = CommandPlaceBlock

CommandPlaceBlock.prototype.execute = function() {
    BlockWorld.setForeground(Global.gameData.world.blockWorld, this.blockPos[0], this.blockPos[1], this.blockId);
    var block = Config.blockRegister[this.blockId];
    if (block.onPlace)
        block.onPlace(this.blockPos, block);
}

CommandPlaceBlock.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.blockPos[0]);
    Serialize.int32(byteArray, index, this.blockPos[1]);
    Serialize.int32(byteArray, index, this.blockId);
}

CommandPlaceBlock.prototype.deserialize = function(byteArray, index) {
    this.blockPos = [Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index)];
    this.blockId = Deserialize.int32(byteArray, index);
}

CommandPlaceBlock.prototype.getSerializationSize = function() {
    return 12;
}
