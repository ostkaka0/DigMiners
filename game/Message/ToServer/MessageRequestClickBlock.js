var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var IndexCounter = require("engine/IndexCounter.js")
var BlockWorld = require("engine/BlockWorld.js")

var Global = require("game/Global.js")
var Config = require("game/Config.js")

var MessageRequestClickBlock = function(blockPos, clickType) {
    this.blockPos = blockPos;
    this.clickType = clickType;
}
module.exports = MessageRequestClickBlock

MessageRequestClickBlock.prototype.execute = function(gameData, player) {
    var entity = Global.gameData.world.entityWorld.objects[player.entityId];
    if (!entity || !this.blockPos) return;
    //console.log("player " + player.playerId + " clicked block " + this.blockPos + ", clicktype: " + this.clickType);
    var blockId = BlockWorld.getForeground(Global.gameData.world.blockWorld, this.blockPos[0], this.blockPos[1]);
    var blockType = Config.blockRegister[blockId];
    if (blockType && blockType.isDoor)
        blockType.clickFunction(this.blockPos, blockType, entity, this.clickType);
}

MessageRequestClickBlock.prototype.send = function(socket) {
    socket.emit(this.idString, [this.blockPos, this.clickType]);
}

MessageRequestClickBlock.prototype.receive = function(gameData, data) {
    this.blockPos = data[0];
    this.clickType = data[1];
}
