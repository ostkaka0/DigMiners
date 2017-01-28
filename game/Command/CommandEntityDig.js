import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import { Serialize, Deserialize } from "engine/Serialization.js"
import TileWorld from "engine/TileWorld.js"

import Config from "game/Config.js"
import Global from "game/Global.js"
import Tiles from "game/Blocks.js"
import Items from "game/Items.js"

import { CommandPlayerOreInventory, OreInventoryActions } from "game/Command/CommandPlayerOreInventory.js"
import CommandEntitySpawn from "game/Command/CommandEntitySpawn.js"

var CommandEntityDig = function(entityId, pos, dir, radius, digSpeed, maxDigHardness) {
    this.entityId = entityId;
    if (pos)
        this.pos = v2.cloneFix(pos);
    this.dir = dir;
    this.radius = fix.toFix(radius);
    this.digSpeed = digSpeed;
    this.maxDigHardness = maxDigHardness;
}
export default CommandEntityDig

CommandEntityDig.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.movement) return;

    var tileWorld = Global.gameData.world.tileWorld;
    var targetTile = Config.tileRegister[TileWorld.getTileId(Global.gameData.world.tileWorld, this.pos[0] + 1.0 * this.dir[0], this.pos[1] + 1.0 * this.dir[1])];
    var targetDensity = TileWorld.getDensity(Global.gameData.world.tileWorld, this.pos[0] + 1.0 * this.dir[0], this.pos[1] + 1.0 * this.dir[1]);
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
        onDensityChange = function(tileX, tileY, tile, oldDensity, newDensity) { return (tile.isOre) ? oldDensity : newDensity; };
    }

    var dug = TileWorld.carveCircle(Global.gameData, this.pos[0] + digDis * this.dir[0], this.pos[1] + digDis * this.dir[1], this.radius, this.digSpeed, this.maxDigHardness, onDensityChange);
    if (isServer) {
        // Only process dug ores on server
        for (var i = 0; i < dug.length; ++i) {
            if (!dug[i] || dug[i] <= 0) continue;
            var tileName = Config.tileRegister[i].name;
            var itemId = i;
            if (entity.inventory && entity.controlledByPlayer)
                sendCommand(new CommandPlayerOreInventory(entity.controlledByPlayer.playerId, OreInventoryActions.ADD_ORE, itemId, dug[i]));
            /*if (tileName == Tiles.Dirt.name) {
                var rand = Math.random() * 1000;
                var itemId = null;
                if (rand > 990)
                    itemId = Items.RottenRoot.id;
                if (itemId != null) {
                    var physicsBody = entity.physicsBody;

                    var itemEntityId = Global.gameData.world.idList.next();
                    var itemEntity = entityTemplateItem(itemId, 1, Global.gameData);
                    itemEntity.physicsBody.setPos(v2.clone(physicsBody.getPos()));
                    itemEntity.physicsBody.angle = physicsBody.angle;
                    itemEntity.physicsBody.angleOld = physicsBody.angle;
                    sendCommand(new CommandEntitySpawn(Global.gameData, itemEntity, itemEntityId));
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
