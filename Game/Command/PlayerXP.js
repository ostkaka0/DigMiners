import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import TileWorld from "Engine/TileWorld.js";

import Config from "Game/Config.js";

import RegisterCommand from "Engine/Register/Command.js";

var CommandPlayerXP = function(playerId, xp) {
    this.playerId = playerId;
    this.xp = xp;
}
export default CommandPlayerXP;
RegisterCommand.push(CommandPlayerXP);

CommandPlayerXP.prototype.execute = function() {
    var player = global.gameData.playerWorld.objects[this.playerId];
    if (!player) return;
    player.xp += this.xp;
    var nextLevelXP = 10 * Math.pow(10.0, (player.level+1)/10.0);
    nextLevelXP = Math.round( nextLevelXP / Math.pow(10, Math.floor(Math.log10(nextLevelXP/10)))) *  Math.pow(10, Math.floor(Math.log10(nextLevelXP/10)));
    while (player.xp >= nextLevelXP) {
        player.xp -= nextLevelXP;
        player.level++;
        console.log("level", player.level, "xp:", player.xp, "/", nextLevelXP);
    }
}

CommandPlayerXP.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.int32(byteArray, index, this.xp);
}

CommandPlayerXP.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.xp = Deserialize.int32(byteArray, index);
}

CommandPlayerXP.prototype.getSerializationSize = function() {
    return 8;
}
