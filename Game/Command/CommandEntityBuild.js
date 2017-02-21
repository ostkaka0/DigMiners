import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import BlockWorld from "Engine/BlockWorld.js";
import TileWorld from "Engine/TileWorld.js";

import Config from "Game/Config.js";

import CommandRegister from "Engine/Register/Command.js";
import Blocks from "Game/Blocks.js";
import EntityBlockPlacer from "Game/Entity/BlockPlacer.js";
import CommandEntitySpawn from "Game/Command/CommandEntitySpawn.js";

var CommandEntityBuild = function(entityId, x, y, blockId, type) {
    this.entityId = entityId;
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.type = type;
}
export default CommandEntityBuild;
CommandRegister.push(CommandEntityBuild);

CommandEntityBuild.prototype.execute = function() {
    /*if (this.type == BlockTypes.FOREGROUND)
        global.gameData.world.blockWorld.setForeground([this.x, this.y], this.blockId);
    else if (this.type == BlockTypes.BACKGROUND)
        setBackground(global.gameData.world.blockWorld, this.x, this.y, this.blockId);*/

    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    if (!isServer && this.blockId)
        entity.bodyparts.bodyparts["rightArm"].cycle("rightArm", 256, true);
    if (isServer) {
        var block = Config.blockRegister[this.blockId];
        var entityBlockPlacer = { blockPlacer: new EntityBlockPlacer([this.x, this.y], this.blockId, block.buildDuration, entity.id) };
        var entityBlockPlacerId = global.gameData.world.idList.next();
        sendCommand(new CommandEntitySpawn(global.gameData, entityBlockPlacer, entityBlockPlacerId));
        entity.blockPlacerId = entityBlockPlacerId;
    }
}

CommandEntityBuild.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.int32(byteArray, index, this.x);
    Serialize.int32(byteArray, index, this.y);
    Serialize.int32(byteArray, index, this.blockId);
    Serialize.int32(byteArray, index, this.type);
}

CommandEntityBuild.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.x = Deserialize.int32(byteArray, index);
    this.y = Deserialize.int32(byteArray, index);
    this.blockId = Deserialize.int32(byteArray, index);
    this.type = Deserialize.int32(byteArray, index);
}

CommandEntityBuild.prototype.getSerializationSize = function() {
    return 20;
}
