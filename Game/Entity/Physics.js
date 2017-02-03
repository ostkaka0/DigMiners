import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import TileWorld from "Engine/TileWorld.js";
import BlockWorld from "Engine/BlockWorld.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";

var PHYSICS_MAX_STEP_LENGTH = 0.25;

var COLLISION_BLOCKS = [
    [0, 0],
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1]
];

var COLLISION_BLOCKS_LARGE = [
    [0, 0],
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [-2, -2],
    [-2, -1],
    [-2, 0],
    [-2, 1],
    [-2, 2],
    [2, -2],
    [2, -1],
    [2, 0],
    [2, 1],
    [2, -2],
    [-1, 2],
    [0, 2],
    [1, 2],
    [-1, -2],
    [0, -2],
    [1, -2],
];

var BlockCollisionSide = {
    TOP: 0,
    LEFT: 1,
    RIGHT: 2,
    BOTTOM: 3
}

var entityFunctionPhysicsBodySimulate = function(dt) {
    Global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
        if (entity.isDead || !entity.isActive) return;
        if (entity.physicsBody)
            physicsBodySimulate(entity.physicsBody, dt);
    });
}
export default entityFunctionPhysicsBodySimulate

var physicsBodySimulate = function(physicsBody, dt) {
    var radius = physicsBody.getRadius();

    // Calculate deltaPos and number of steps
    var pos = physicsBody.getPos();

    var deltaPos = v2.create(0, 0);
    v2.sub(pos, physicsBody.posOld, deltaPos);
    var deltaPosLength = v2.length(deltaPos);
    var numSteps = Math.ceil(deltaPosLength / PHYSICS_MAX_STEP_LENGTH);
    v2.div(deltaPos, numSteps, deltaPos);
    deltaPosLength /= numSteps;
    pos = v2.clone(physicsBody.posOld);
    var velocity = physicsBody.getVelocity();
    // Simulate steps
    for (var i = 0; i < numSteps; i++) {
        v2.add(deltaPos, pos, pos);

        // Trigger block hit events
        for (var j = 0; j < COLLISION_BLOCKS.length; ++j) {
            var worldPos = v2.clone(pos);
            worldPos[0] += COLLISION_BLOCKS[j][0];
            worldPos[1] += COLLISION_BLOCKS[j][1];
            var blockId = BlockWorld.getForeground(Global.gameData.world.blockWorld, worldPos[0], worldPos[1]);
            if (!blockId) continue; // Air
            var block = Config.blockRegister[blockId];
            if (!block || !block.isSolid) continue;

            var worldBlockPos = v2.create(0, 0);
            v2.floor(worldPos, worldBlockPos);
            var dx = pos[0] - (worldBlockPos[0] + 0.5);
            var dy = pos[1] - (worldBlockPos[1] + 0.5);

            if (radius > 0 && Math.abs(dx) < radius + 0.5 && Math.abs(dy) < radius + 0.5) {
                if (dy > dx) {
                    if (dy > -dx)
                        Global.gameData.world.events.trigger("entityHitBlockSide", Global.gameData.world.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.TOP);
                    else
                        Global.gameData.world.events.trigger("entityHitBlockSide", Global.gameData.world.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.LEFT);
                } else if (dy > -dx)
                    Global.gameData.world.events.trigger("entityHitBlockSide", Global.gameData.world.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.RIGHT);
                else
                    Global.gameData.world.events.trigger("entityHitBlockSide", Global.gameData.world.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.BOTTOM);
            }
        }

        // Block collision
        for (var j = 0; j < COLLISION_BLOCKS.length; ++j) {
            var worldPos = v2.clone(pos);
            worldPos[0] += COLLISION_BLOCKS[j][0];
            worldPos[1] += COLLISION_BLOCKS[j][1];
            var blockId = BlockWorld.getForeground(Global.gameData.world.blockWorld, worldPos[0], worldPos[1]);
            if (!blockId) continue; // Air
            var block = Config.blockRegister[blockId];
            if (!block || !block.isSolid) continue;

            var worldBlockPos = v2.create(0, 0);
            v2.floor(worldPos, worldBlockPos);
            var dx = pos[0] - (worldBlockPos[0] + 0.5);
            var dy = pos[1] - (worldBlockPos[1] + 0.5);

            if (radius > 0 && Math.abs(dx) < radius + 0.5 && Math.abs(dy) < radius + 0.5) {
                var blockLeft = worldBlockPos[0];
                var blockRight = worldBlockPos[0] + 1.0
                var blockTop = worldBlockPos[1] + 1.0;
                var blockBottom = worldBlockPos[1];

                if (dy > dx) {
                    if (dy > -dx) {
                        pos[1] = blockTop + radius;
                        velocity[1] = 0;

                    } else {
                        pos[0] = blockLeft - radius;
                        velocity[0] = 0;
                    }
                } else if (dy > -dx) {
                    pos[0] = blockRight + radius;
                    velocity[0] = 0;
                } else {
                    pos[1] = blockBottom - radius;
                    velocity[1] = 0;
                }
            }
        }

        // Terrain collision
        var density = TileWorld.calcDensity(Global.gameData.world.tileWorld, pos[0], pos[1]);
        if (density > 1) {
            var dir = TileWorld.calcDir(Global.gameData.world.tileWorld, pos[0], pos[1]);
            //v2.mul(2.0, dir, dir);
            var tempDir = v2.clone(dir);
            v2.mul(0.5 + density / 255, tempDir, tempDir);
            v2.add(pos, tempDir, pos);
            var normal = v2.create(0, 0);
            v2.normalize(dir, normal);
            if (normal[0] || normal[1]) {
                var dot = v2.dot(normal, physicsBody.getVelocity());
                var deltaSpeed = [0, 0];
                v2.mul(-4.0 * density / 255 * density / 255 * dot, normal, deltaSpeed);
                v2.div(deltaSpeed, numSteps, deltaSpeed);
                v2.add(deltaSpeed, velocity, velocity);
            }
        }
    }

    physicsBody.setPos(pos);
    physicsBody.setVelocity(velocity);
    v2.copy(pos, physicsBody.posOld);
    v2.copy(physicsBody.getVelocity(), physicsBody.speedOld);
}
