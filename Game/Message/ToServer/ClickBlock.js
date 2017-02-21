import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import IndexCounter from "Engine/Core/IndexCounter.js";
import BlockWorld from "Engine/BlockWorld.js";


import Config from "Game/Config.js";
import MessageRegister from "Engine/Register/Message.js";;

var MessageRequestClickBlock = function(blockPos, clickType) {
    this.blockPos = blockPos;
    this.clickType = clickType;
}
export default MessageRequestClickBlock;
MessageRegister.ToServer.push(MessageRequestClickBlock);

MessageRequestClickBlock.prototype.execute = function(gameData, player) {
    var entity = global.gameData.world.entityWorld.objects[player.entityId];
    if (!entity || !this.blockPos) return;
    //console.log("player " + player.playerId + " clicked block " + this.blockPos + ", clicktype: " + this.clickType);
    var blockId = global.gameData.world.blockWorld.getForeground(this.blockPos);
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
