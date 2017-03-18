import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import TileWorld from "Engine/TileWorld.js";
import BlockWorld from "Engine/BlockWorld.js";
import BlockChunk from "Engine/BlockChunk.js";
import ObjectRegister from "Engine/Core/ObjectRegister.js";

import Blocks from "Game/Blocks.js";
import Tiles from "Game/Tiles.js";
import Entity from "Game/Entity/Entity.js";
import ExplosionFunctions from "Game/ExplosionFunctions.js";

import Config from "Game/Config.js";
import RegisterItem from "Engine/Register/Item.js";

import CommandBlockStrength from "Game/Command/BlockStrength.js";
import CommandEntityDig from "Game/Command/EntityDig.js";

var Item = {};
export default Item;

Item.Flags = {
    Positive: 1,
    TargetSelf: 2,
    TargetEnemies: 4,
    TargetFriends: 8,
    Destructive: 16,
    //Constructive: 32,
};

Item.interact = function(itemType, entity) {
    if (!isServer) return;
    var physicsWorld = global.gameData.world.physicsWorld;
    var range = itemType.range || 1.0;
    var radius = itemType.radius || 0.5;
    var damage = (itemType.damage || 10.0) * ((itemType & Item.Flags.Positive)? -1 : 1);
    var bodies = [];
    var entityBodyId = entity.physicsBody.bodyId;
    var entityPos = entity.physicsBody.getPos();
    var angle = entity.physicsBody.angle;
    var dir = [Math.cos(-angle), Math.sin(-angle)];
    var hitPos = [0, 0];
    v2.mul(range, dir, hitPos);
    v2.add(entityPos, hitPos, hitPos);
    physicsWorld.getBodiesInRadius(bodies, hitPos, radius);

    var hitEntities = [];

    // Validate melee "collision"
    for (var i = 0; i < bodies.length; i++) {
        var bodyId = bodies[i];
        if (bodyId == entityBodyId && !(itemType.flags & Item.Flags.TargetSelf)) continue;
        var targetEntity = global.gameData.world.physicsEntities[bodyId];
        if (!targetEntity) continue;
        hitEntities.push(targetEntity);
    }

    // Do interaction
    for (var i = 0; i < hitEntities.length; i++) {
        var entity = hitEntities[i];
        if (targetEntity.health && damage)
            Entity.hurt(targetEntity, entity, damage, 1.0);
    }

    // TODO: CommandEntityHit
    //if (isServer) {
    //    global.gameData.world.commands.push(new CommandEntityHit(entity, hitEntities));
    //}

    // Digging
    if (itemType.flags & Item.Flags.Destructive) {
        // Break block
        var chunkPos = [0, 0];
        var localPos = [0, 0];
        BlockChunk.fromV2World(hitPos, chunkPos, localPos);
        var blockChunk = global.gameData.world.blockWorld.get(chunkPos);
        if (blockChunk) {
            var blockId = blockChunk.getForeground(localPos[0], localPos[1]);
            if (blockId) {
                var blockType = Config.blockRegister[blockId];
                var strength = blockChunk.getStrength(localPos[0], localPos[1]);
                // TODO: 16 magic value
                strength -= 16 * (Entity.getBlockBreakSpeed(entity) / blockType.hardness);
                var x = chunkPos[0] * BlockChunk.dim + localPos[0];
                var y = chunkPos[1] * BlockChunk.dim + localPos[1];
                sendCommand(new CommandBlockStrength(x, y, Math.max(strength, 0)));
                return;
            }
            // Dig terrain
            global.gameData.world.commands.push(new CommandEntityDig(entity.id, entityPos, dir, 1.5, Entity.getDigSpeed(entity), Entity.getMaxDigHardness(entity)));
            // Crete explosion
            //ExplosionFunctions.createExplosion(entityPos, 3.0, 50.0, 250.0, 1.0, entity);
        }
    }
}
