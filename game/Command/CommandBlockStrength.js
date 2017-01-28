import { Serialize, Deserialize } from "engine/Serialization.js"

import Config from "game/Config.js"
import gameData from "game/GameData.js"

var CommandBlockStrength = function(x, y, strength) {
    this.x = x;
    this.y = y;
    this.strength = Math.max(strength, 0);
}
export default CommandBlockStrength

CommandBlockStrength.prototype.execute = function() {
    if (this.strength > 0)
        setStrength(gameData.world.blockWorld, this.x, this.y, this.strength);
    else
        setForeground(gameData.world.blockWorld, this.x, this.y, 0);
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
