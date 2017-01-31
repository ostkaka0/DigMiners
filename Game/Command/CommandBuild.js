var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var BlockWorld = require("Engine/BlockWorld.js")
var TileWorld = require("Engine/TileWorld.js")

var Command = require("Game/Command/Command.js")
var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Blocks = require("Game/Blocks.js")

var CommandBuild = function(x, y, blockId, type) {
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}
module.exports = CommandBuild
Command.Register.push(module.exports)

CommandBuild.prototype.execute = function() {
    //if (this.type == BlockTypes.FOREGROUND)
        BlockWorld.setForeground(Global.gameData.world.blockWorld, this.x, this.y, this.blockId);
    //else if (this.type == BlockTypes.BACKGROUND)
    //    setBackground(Global.gameData.world.blockWorld, this.x, this.y, this.blockId);
}

CommandBuild.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.x);
    Serialize.int32(byteArray, index, this.y);
    Serialize.int32(byteArray, index, this.blockId);
    Serialize.int32(byteArray, index, this.type);
}

CommandBuild.prototype.deserialize = function(byteArray, index) {
    this.x = Deserialize.int32(byteArray, index);
    this.y = Deserialize.int32(byteArray, index);
    this.blockId = Deserialize.int32(byteArray, index);
    this.type = Deserialize.int32(byteArray, index);
}

CommandBuild.prototype.getSerializationSize = function() {
    return 16;
}