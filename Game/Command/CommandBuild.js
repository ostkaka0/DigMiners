import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import BlockWorld from "Engine/BlockWorld.js";
import TileWorld from "Engine/TileWorld.js";

import CommandRegister from "Game/Register/Command.js";
import Config from "Game/Config.js";
import Global from "Game/Global.js";
import Blocks from "Game/Blocks.js";

var CommandBuild = function(x, y, blockId, type) {
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}
export default CommandBuild;
CommandRegister.push(CommandBuild);

CommandBuild.prototype.execute = function() {
    //if (this.type == BlockTypes.FOREGROUND)
        Global.gameData.world.blockWorld.setForeground([this.x, this.y], this.blockId);
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
