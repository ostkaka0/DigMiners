import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import BlockWorld from "Engine/BlockWorld.js";
import TileWorld from "Engine/TileWorld.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";
import CommandRegister from "Game/Register/Command.js";

var CommandPlaceBlock = function(blockPos, blockId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
}
export default CommandPlaceBlock;
CommandRegister.push(CommandPlaceBlock);

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
