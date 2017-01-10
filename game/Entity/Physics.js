PHYSICS_MAX_STEP_LENGTH = 1.0;

COLLISION_BLOCKS = [
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

BlockCollisionSide = {
    TOP: 0,
    LEFT: 1,
    RIGHT: 2,
    BOTTOM: 3
}

entityFunctionPhysicsBodySimulate = function(dt) {
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody)
            physicsBodySimulate(entity.physicsBody, dt);
    });
}

physicsBodySimulate = function(physicsBody, dt) {
    var playerFatness = 1; // player is 1 block wide

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
            var blockId = getForeground(gameData.blockWorld, worldPos[0], worldPos[1]);
            if (!blockId) continue; // Air
            var block = gameData.blockRegister[blockId];
            if (!block || !block.isSolid) continue;

            var worldBlockPos = v2.create(0, 0);
            v2.floor(worldPos, worldBlockPos);
            var dx = pos[0] - (worldBlockPos[0] + 0.5);
            var dy = pos[1] - (worldBlockPos[1] + 0.5);

            if (Math.abs(dx) < playerFatness && Math.abs(dy) < playerFatness) {
                if (dy > dx) {
                    if (dy > -dx)
                        gameData.events.trigger("entityHitBlockSide", gameData.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.TOP);
                    else
                        gameData.events.trigger("entityHitBlockSide", gameData.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.LEFT);
                } else if (dy > -dx)
                    gameData.events.trigger("entityHitBlockSide", gameData.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.RIGHT);
                else
                    gameData.events.trigger("entityHitBlockSide", gameData.physicsEntities[physicsBody.bodyId], worldBlockPos, block, BlockCollisionSide.BOTTOM);
            }
        }

        // Block collision
        for (var j = 0; j < COLLISION_BLOCKS.length; ++j) {
            var worldPos = v2.clone(pos);
            worldPos[0] += COLLISION_BLOCKS[j][0];
            worldPos[1] += COLLISION_BLOCKS[j][1];
            var blockId = getForeground(gameData.blockWorld, worldPos[0], worldPos[1]);
            if (!blockId) continue; // Air
            var block = gameData.blockRegister[blockId];
            if (!block || !block.isSolid) continue;

            var worldBlockPos = v2.create(0, 0);
            v2.floor(worldPos, worldBlockPos);
            var dx = pos[0] - (worldBlockPos[0] + 0.5);
            var dy = pos[1] - (worldBlockPos[1] + 0.5);

            if (Math.abs(dx) < playerFatness && Math.abs(dy) < playerFatness) {
                var blockLeft = worldBlockPos[0];
                var blockRight = worldBlockPos[0] + 1.0
                var blockTop = worldBlockPos[1] + 1.0;
                var blockBottom = worldBlockPos[1];

                if (dy > dx) {
                    if (dy > -dx) {
                        pos[1] = blockTop + playerFatness / 2;
                        velocity[1] = 0;

                    } else {
                        pos[0] = blockLeft - playerFatness / 2;
                        velocity[0] = 0;
                    }
                } else if (dy > -dx) {
                    pos[0] = blockRight + playerFatness / 2;
                    velocity[0] = 0;
                } else {
                    pos[1] = blockBottom - playerFatness / 2;
                    velocity[1] = 0;
                }
            }
        }

        // Terrain collision
        var density = calcDensity(gameData.tileWorld, pos[0], pos[1]);
        if (density > 0) {
            var dir = calcDir(gameData.tileWorld, pos[0], pos[1]);
            //v2.mul(2.0, dir, dir);
            v2.add(pos, dir, pos);
            var normal = v2.create(0, 0);
            v2.normalize(dir, normal);
            if (normal[0] || normal[1]) {
                var dot = v2.dot(normal, physicsBody.getVelocity());
                var deltaSpeed = [0, 0];
                v2.mul(-1.0 * dot, normal, deltaSpeed);
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