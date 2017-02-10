import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import TileWorld from "Engine/TileWorld.js";
import BlockWorld from "Engine/BlockWorld.js";

import CommandRegister from "Game/Register/Command.js";
import Config from "Game/Config.js";
import Global from "Game/Global.js";

var CommandBlockStrength = function(x, y, strength) {
    this.x = x;
    this.y = y;
    this.strength = Math.max(strength, 0);
}
export default CommandBlockStrength;
CommandRegister.push(CommandBlockStrength);

CommandBlockStrength.prototype.execute = function() {
    if (this.strength > 0)
        Global.gameData.world.blockWorld.setStrength([this.x, this.y], this.strength);
    else
        Global.gameData.world.blockWorld.setForeground([this.x, this.y], 0);
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
