PHYSICS_MAX_STEP_LENGTH = 0.5;

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

PhysicsBody = function(pos, damping) {
    this.bodyId = gameData.physicsWorld.add(pos);
    if (pos)
        this.posOld = v2.clone(pos);
    else
        this.posOld = [0, 0];
    this.speedOld = [0, 0];
    if (damping)
        this.damping = toFix(damping);
    this.angle = 0;
    this.angleOld = 0;
    this.rotationSpeed = toFix(10.0);
}

PhysicsBody.prototype.name = physicsBody.name; function physicsBody() { };

// TODO: Remove getters and setters
// Temporary getters and setters
Object.defineProperties(PhysicsBody.prototype, {
    pos: {
        get: function() { return gameData.physicsWorld.getPos(this.bodyId); },
        set: function(pos) { }
    },
    speed: {
        get: function() { return gameData.physicsWorld.getVelocity(this.bodyId); },
        set: function(speed) { }
    }
});

PhysicsBody.prototype.getPos = function() { return gameData.physicsWorld.getPos(this.bodyId); }
PhysicsBody.prototype.setPos = function(pos) { gameData.physicsWorld.setPos(this.bodyId, pos); }
PhysicsBody.prototype.getVelocity = function() { return gameData.physicsWorld.getVelocity(this.bodyId); }
PhysicsBody.prototype.setVelocity = function(velocity) { gameData.physicsWorld.setVelocity(this.bodyId, velocity); }


PhysicsBody.prototype.serialize = function(byteArray, index) {
    serializeV2(byteArray, index, this.getPos());
    serializeV2(byteArray, index, this.getVelocity());
    serializeFix(byteArray, index, this.angle);
    serializeFix(byteArray, index, this.rotationSpeed);
    serializeFix(byteArray, index, this.damping);
}

PhysicsBody.prototype.deserialize = function(byteArray, index) {
    this.setPos(deserializeV2(byteArray, index));
    this.posOld = v2.clone(this.pos);
    this.setVelocity(deserializeV2(byteArray, index));
    this.speedOld = v2.clone(this.speed);
    this.angle = deserializeFix(byteArray, index);
    this.angleOld = this.angle;
    this.rotationSpeed = deserializeFix(byteArray, index);
    this.damping = deserializeFix(byteArray, index);
}

PhysicsBody.prototype.getSerializationSize = function() {
    return 28;
}

PhysicsBody.prototype.destroy = function(entity) {
    gameData.physicsWorld.remove(this.bodyId);
}

physicsBodySimulate = function(gameData, physicsBody, dt) {
    // Calculate deltaPos and number of steps
    var pos = physicsBody.getPos();
    var deltaPos = v2.create(0, 0);
    v2.sub(pos, physicsBody.posOld, deltaPos);
    var deltaPosLength = v2.lengthSquared(deltaPos);
    var numSteps = Math.ceil(deltaPosLength / PHYSICS_MAX_STEP_LENGTH);
    v2.div(deltaPos, numSteps, deltaPos);
    deltaPosLength /= numSteps;
    v2.mul(fix.pow(physicsBody.damping, dt), physicsBody.speed, physicsBody.speed);
    // Simulate steps
    for (var i = 0; i < numSteps; i++) {

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
                        //console.log("top");
                        pos[1] = blockTop + playerFatness / 2;
                        physicsBody.speed[1] = 0;
                    } else {
                        //console.log("left");
                        pos[0] = blockLeft - playerFatness / 2;
                        physicsBody.speed[0] = 0;
                    }
                } else if (dy > -dx) {
                    //console.log("right");
                    pos[0] = blockRight + playerFatness / 2;
                    physicsBody.speed[0] = 0;
                } else {
                    //console.log("bottom");
                    pos[1] = blockBottom - playerFatness / 2;
                    physicsBody.speed[1] = 0;
                }
            }
        }

        // Terrain collision
        var density = calcDensity(gameData.tileWorld, pos[0], pos[1]);
        if (density > 0) {
            var dir = calcDir(gameData.tileWorld, pos[0], pos[1]);
            //v2.div(dir, 2.0, dir);
            v2.add(pos, dir, pos);
            var normal = v2.create(0, 0);
            v2.normalize(dir, normal);
            if (normal[0] || normal[1]) {
                var dot = v2.dot(normal, physicsBody.speed);
                var deltaSpeed = [0, 0];
                v2.mul(-dot, normal, deltaSpeed);
                deltaPos = [(1.0 - Math.abs(normal[0])) * deltaPos[0], (1.0 - Math.abs(normal[1])) * deltaPos[1]];
                v2.add(deltaSpeed, physicsBody.speed, physicsBody.speed);//physicsBody.speed = [(1.0 - Math.abs(normal[0])) * physicsBody.speed[0], (1.0 - Math.abs(normal[1])) * physicsBody.speed[1]];
            }
        }
        physicsBody.setPos(pos);


        // Update posOld, speedOld
        v2.copy(physicsBody.getPos(), physicsBody.posOld);
        v2.copy(physicsBody.getPos(), physicsBody.speedOld);
    }
}

entityFunctionPhysicsBodySimulate = function(gameData, dt) {
    var entityWorld = gameData.entityWorld;
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody)
            physicsBodySimulate(gameData, entity.physicsBody, dt);
    });
}

PhysicsBody.prototype.rotateTo = function(angle, speed, dt) {
    if (this.angle == angle)
        return;

    var newDirx = Math.cos(angle);
    var newDiry = Math.sin(angle);
    var oldDirx = Math.cos(this.angle);
    var oldDiry = Math.sin(this.angle);
    oldDirx += (newDirx - oldDirx) * speed * dt;
    oldDiry += (newDiry - oldDiry) * speed * dt;
    this.angle = Math.atan2(oldDiry, oldDirx);
}

angleLerp = function(from, to, factor) {
    if (from == to)
        return;

    var newDirx = Math.cos(from);
    var newDiry = Math.sin(from);
    var oldDirx = Math.cos(to);
    var oldDiry = Math.sin(to);
    oldDirx += (newDirx - oldDirx) * factor;
    oldDiry += (newDiry - oldDiry) * factor;
    return Math.atan2(oldDiry, oldDirx);
}
