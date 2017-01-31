var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var IndexCounter = require("Engine/IndexCounter.js")
var Chunk = require("Engine/Chunk.js")
var BlockChunk = require("Engine/BlockChunk.js")

var Global = require("Game/Global.js")
var Config = require("Game/Config.js")
var Message = require("game/Message/Message.js");
var CommandEntityBuild = require("Game/Command/CommandEntityBuild.js")
var Blocks = require("Game/Blocks.js")

var MessageRequestPlaceBlock = function(stackId, x, y) {
    this.stackId = stackId;
    this.x = Math.floor(x);
    this.y = Math.floor(y);
}
module.exports = MessageRequestPlaceBlock
Message.ToServer.push(module.exports);

MessageRequestPlaceBlock.prototype.execute = function(gameData, player) {
    var entity = Global.gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var item = entity.inventory.items[this.stackId];
    if (!item) return;
    var itemType = Config.itemRegister[item.id];
    if (itemType && itemType.typeOfType == "block") {

        if (!entity.inventory.hasItem(item.id, 1))
            return;

        if (!player.canPlaceBlock(Global.gameData, this.x, this.y))
            return;

        var blockChunkX = Math.floor(this.x / BlockChunk.dim);
        var blockChunkY = Math.floor(this.y / BlockChunk.dim);
        var localX = Math.floor(this.x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(this.y) - blockChunkY * BlockChunk.dim;

        var blockType = Config.blockRegister[itemType.blockId];
        var type = blockType.type;

        var blockChunk = Global.gameData.world.blockWorld.get(blockChunkX, blockChunkY);
        //if (type == BlockTypes.FOREGROUND) {
            if (blockChunk && blockChunk.getForeground(localX, localY) > 0)
                return;
        //} else if (type == BlockTypes.BACKGROUND) {
        //    if (blockChunk && blockChunk.getBackground(localX, localY) > 0)
        //        return;
        //}

        // Send block change
        var command = new CommandEntityBuild(player.entityId, this.x, this.y, itemType.blockId, type);
        sendCommand(command);
    }
}

MessageRequestPlaceBlock.prototype.send = function(socket) {
    socket.emit(this.idString, [this.stackId, this.x, this.y]);
}

MessageRequestPlaceBlock.prototype.receive = function(gameData, data) {
    this.stackId = data[0];
    this.x = data[1];
    this.y = data[2];
}
