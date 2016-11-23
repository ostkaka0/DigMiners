PHYSICS_MAX_STEP_LENGTH = 0.125;

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

entityFunctionPhysicsBodySimulate = function(gameData, dt) {
    var entityWorld = gameData.entityWorld;
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody)
            physicsBodySimulate(gameData, entity.physicsBody, dt);
    });
}

physicsBodySimulate = function(gameData, physicsBody, dt) {
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
        // Block collision
        for (var j = 0; j < COLLISION_BLOCKS.length; ++j) {
            var chunkPos = v2.create(0, 0);
            var localPos = v2.create(0, 0);
            var worldPos = v2.clone(pos);
            worldPos[0] += COLLISION_BLOCKS[j][0];
            worldPos[1] += COLLISION_BLOCKS[j][1];
            v2WorldToBlockChunk(worldPos, chunkPos, localPos);
            var blockChunk = gameData.blockWorld.get(chunkPos[0], chunkPos[1]);
            if (!blockChunk) continue;
            var blockId = blockChunk.getForeground(localPos[0], localPos[1]);
            if (!blockId) continue; // Air
            var block = gameData.blockRegister[blockId];
            if (!block || !block.isSolid) continue;

            var playerFatness = 1; // player is 1 block wide

            var dx = pos[0] - (chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0] + 0.5);
            var dy = pos[1] - (chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1] + 0.5);

            if (Math.abs(dx) < playerFatness && Math.abs(dy) < playerFatness) {

                var blockLeft = chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0];
                var blockRight = chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0] + 1.0
                var blockTop = chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1] + 1.0;
                var blockBottom = chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1]

                if (dy > dx) {
                    if (dy > -dx) {
                        pos[1] = blockTop + playerFatness / 2;
                        //console.log("top, set ypos to " + pos[1]);
                        velocity[1] = 0;
                    } else {
                        pos[0] = blockLeft - playerFatness / 2;
                        //console.log("left, set xpos to " + pos[0]);
                        velocity[0] = 0;
                    }
                } else if (dy > -dx) {
                    pos[0] = blockRight + playerFatness / 2;
                    //console.log("right, set xpos to " + pos[0]);
                    velocity[0] = 0;
                } else {
                    pos[1] = blockBottom - playerFatness / 2;
                    //console.log("bottom, set ypos to " + pos[1]);
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