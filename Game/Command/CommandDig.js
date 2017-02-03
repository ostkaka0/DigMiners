import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import TileWorld from "Engine/TileWorld.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";
import Command from "Game/Command/Command.js";

var CommandDig = function(pos, radius) {
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.radius = fix.toFix(radius);
}
export default CommandDig;
Command.Register.push(CommandDig);

CommandDig.prototype.execute = function() {
    var tileWorld = Global.gameData.world.tileWorld;
    TileWorld.carveCircle(Global.gameData, this.pos[0], this.pos[1], this.radius, 5000.0, 5000.0);
}

CommandDig.prototype.serialize = function(byteArray, index) {
    Serialize.v2(byteArray, index, this.pos);
    Serialize.fix(byteArray, index, this.radius);
}

CommandDig.prototype.deserialize = function(byteArray, index) {
    this.pos = Deserialize.v2(byteArray, index);
    this.radius = Deserialize.fix(byteArray, index);
}

CommandDig.prototype.getSerializationSize = function() {
    return 12;
}
