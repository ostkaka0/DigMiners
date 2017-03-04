import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import TileWorld from "Engine/TileWorld.js";

import Config from "Game/Config.js";

import RegisterCommand from "Engine/Register/Command.js";
import Tiles from "Game/Blocks.js";
import Items from "Game/Items.js";

import CommandPlayerOreInventory from "Game/Command/PlayerOreInventory.js";
import CommandEntitySpawn from "Engine/Command/EntitySpawn.js";

var CommandEntityDig = function(entityId, pos, dir, radius, digSpeed, maxDigHardness) {
    this.entityId = entityId;
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.dir = dir;
    this.radius = fix.toFix(radius);
    this.digSpeed = digSpeed;
    this.maxDigHardness = maxDigHardness;
}
export default CommandEntityDig;
RegisterCommand.push(CommandEntityDig);

CommandEntityDig.prototype.execute = function() {
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;

    var tileWorld = global.gameData.world.tileWorld;
    var targetTile = global.gameData.tileRegister[global.gameData.world.tileWorld.getTileId([this.pos[0] + 1.0 * this.dir[0], this.pos[1] + 1.0 * this.dir[1]])];
    var targetDensity = global.gameData.world.tileWorld.getDensity([this.pos[0] + 1.0 * this.dir[0], this.pos[1] + 1.0 * this.dir[1]]);
    var onDensityChange = null;
    var digDis = 1.5;

    if (targetTile.isOre && targetDensity > 0) {
        entity.movement.isMining = true;
        digDis = 1.0;
        this.radius = 1.0;
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) {
            if (tile.isOre) {
                var densityChange = (oldDensity - newDensity) / 2 >> 0;
                var newDensity2 = oldDensity - densityChange;
                if (newDensity2 < 128)
                    return 0;
                else return newDensity2;
            }
            else return oldDensity;

        };
        var velocity = v2.create(0, 0);
        v2.mul(0.5, entity.physicsBody.getVelocity(), velocity);
        entity.physicsBody.setVelocity(velocity);
    } else {

        entity.movement.isDigging = true;
        onDensityChange = function([tileX, tileY], tile, oldDensity, newDensity) { return (tile.isOre) ? oldDensity : newDensity; };
    }

    var dug = global.gameData.world.tileWorld.carveCircle(global.gameData.tileRegister, [this.pos[0] + digDis * this.dir[0], this.pos[1] + digDis * this.dir[1]], this.radius, this.digSpeed, this.maxDigHardness, onDensityChange);
    if (isServer) {
        // Only process dug ores on server
        for (var i = 0; i < dug.length; ++i) {
            if (!dug[i] || dug[i] <= 0) continue;
            var tileName = global.gameData.tileRegister[i].name;
            var itemId = i;
            if (entity.inventory && entity.controlledByPlayer)
                sendCommand(new CommandPlayerOreInventory(entity.controlledByPlayer.playerId, CommandPlayerOreInventory.Actions.ADD_ORE, itemId, dug[i]));
            /*if (tileName == Tiles.Dirt.name) {
                var rand = Math.random() * 1000;
                var itemId = null;
                if (rand > 990)
                    itemId = Items.Types.RottenRoot.id;
                if (itemId != null) {
                    var physicsBody = entity.physicsBody;

                    var itemEntityId = global.gameData.world.idList.next();
                    var itemEntity = entityTemplateItem(itemId, 1, global.gameData);
                    itemEntity.physicsBody.setPos(v2.clone(physicsBody.getPos()));
                    itemEntity.physicsBody.angle = physicsBody.angle;
                    itemEntity.physicsBody.angleOld = physicsBody.angle;
                    sendCommand(new CommandEntitySpawn(global.gameData, itemEntity, itemEntityId));
                }
            }*/
        }
    }
}

CommandEntityDig.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.v2(byteArray, index, this.pos);
    Serialize.v2(byteArray, index, this.dir);
    Serialize.fix(byteArray, index, this.radius);
    Serialize.fix(byteArray, index, this.digSpeed);
    Serialize.fix(byteArray, index, this.maxDigHardness);
}

CommandEntityDig.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.pos = Deserialize.v2(byteArray, index);
    this.dir = Deserialize.v2(byteArray, index);
    this.radius = Deserialize.fix(byteArray, index);
    this.digSpeed = Deserialize.fix(byteArray, index);
    this.maxDigHardness = Deserialize.fix(byteArray, index);
}

CommandEntityDig.prototype.getSerializationSize = function() {
    return 32;
}