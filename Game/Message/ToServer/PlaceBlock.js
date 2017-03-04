import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import IndexCounter from "Engine/Core/IndexCounter.js";
import Chunk from "Engine/Chunk.js";
import BlockChunk from "Engine/BlockChunk.js";


import Config from "Game/Config.js";
import RegisterItem from "Engine/Register/Item.js"
import RegisterMessage from "Engine/Register/Message.js";;
import CommandEntityBuild from "Game/Command/EntityBuild.js";
import Blocks from "Game/Blocks.js";

var MessageRequestPlaceBlock = function(stackId, x, y) {
    this.stackId = stackId;
    this.x = Math.floor(x);
    this.y = Math.floor(y);
}
export default MessageRequestPlaceBlock;
RegisterMessage.ToServer.push(MessageRequestPlaceBlock);

MessageRequestPlaceBlock.prototype.execute = function(gameData, player) {
    var entity = global.gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var item = entity.inventory.items[this.stackId];
    if (!item) return;
    var itemType = RegisterItem[item.id];
    if (itemType && itemType.typeOfType == "block") {
        if (!entity.inventory.hasItem(item.id, 1))
            return;

        if (!player.canPlaceBlock(global.gameData, this.x, this.y))
            return;

        var blockChunkX = Math.floor(this.x / BlockChunk.dim);
        var blockChunkY = Math.floor(this.y / BlockChunk.dim);
        var localX = Math.floor(this.x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(this.y) - blockChunkY * BlockChunk.dim;

        var blockType = global.gameData.blockRegister[itemType.blockId];
        var type = blockType.type;

        var blockChunk = global.gameData.world.blockWorld.get([blockChunkX, blockChunkY]);
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
