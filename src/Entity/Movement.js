
Movement = function(speed, toolUseDuration) {
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
    this.spacebar = false;
    this.speed = speed;
    // The number of ticks until next dig. Will decrease by 1 each tick. Player can only dig at 0. Only used by server
    this.toolUseTickTimeout = 0;
    this.toolUseDuration = toolUseDuration || 0.25; // Seconds between each dig
    this.digMovementSpeed = 0.65;
    this.mineMovementSpeed = 0.05;
    this.isUsingTool = false;
    this.isDigging = false;
    this.isMining = false;
}

Movement.prototype.name = movement.name; function movement() { };

Movement.prototype.calcDigTickDuration = function(dt) {
    return Math.round(1000.0 * this.toolUseDuration / dt);
}

Movement.prototype.getV2Dir = function() {
    var pos = v2.create(0, 0);
    if (this.up && !this.down)
        pos[1] += 1.0;
    else if (this.down && !this.up)
        pos[1] -= 1.0;
    if (this.right && !this.left)
        pos[0] += 1.0;
    else if (this.left && !this.right)
        pos[0] -= 1.0;
    return pos;
}

Movement.prototype.serialize = function(byteArray, index) {
    var bitField1 = (this.up ? 1 : 0) | (this.left ? 2 : 0) | (this.down ? 4 : 0) | (this.right ? 8 : 0);
    var bitField2 = (this.spacebar ? 1 : 0);
    serializeInt8(byteArray, index, bitField1);
    serializeInt8(byteArray, index, bitField2);
    serializeFix(byteArray, index, this.speed);
}

Movement.prototype.deserialize = function(byteArray, index, gameData) {
    var bitField = deserializeInt8(byteArray, index);
    var bitField2 = deserializeInt8(byteArray, index);
    this.speed = deserializeFix(byteArray, index);

    this.up = (bitField & 1 != 0);
    this.left = (bitField & 2 != 0);
    this.down = (bitField & 4 != 0);
    this.right = (bitField & 8 != 0);
    this.spacebar = (bitField2 & 1 != 0);
}

Movement.prototype.getSerializationSize = function() {
    return 6;
}

Movement.prototype.destroy = function(entity) {

}

entityFunctionEntityMovement = function(gameData, dt) {
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (!entity || !entity.movement || !entity.physicsBody)
            return;

        // Movement:
        var deltaSpeed = v2.create(0, 0);
        if (entity.movement.up) deltaSpeed[1] += 1.0;
        if (entity.movement.down) deltaSpeed[1] -= 1.0;
        if (entity.movement.left) deltaSpeed[0] -= 1.0;
        if (entity.movement.right) deltaSpeed[0] += 1.0;
        var normalized = v2.create(0, 0);
        v2.normalize(deltaSpeed, normalized);
        v2.mul(entity.movement.speed, normalized, normalized);

        // Slow down at dig:
        if (entity.movement.isMining)
            v2.mul(entity.movement.mineMovementSpeed, normalized, normalized);
        else if (entity.movement.isDigging)
            v2.mul(entity.movement.digMovementSpeed, normalized, normalized);
        v2.mul(dt, normalized, normalized);
        var velocity = entity.physicsBody.getVelocity();
        v2.add(normalized, velocity, velocity);
        entity.physicsBody.setVelocity(velocity);

        var moveDir = entity.movement.getV2Dir();
        if (moveDir[0] != 0 || moveDir[1] != 0)
            entity.physicsBody.rotateTo(Math.atan2(-moveDir[1], moveDir[0]), entity.physicsBody.rotationSpeed, dt);

        if (entity.movement.spacebar && !entity.movement.isUsingTool)
            entity.movement.isUsingTool = true;
        if (entity.movement.isUsingTool && entity.movement.toolUseTickTimeout <= 0)
            onEntityUseTool(gameData, entity);

        // Dig update:
        entity.movement.toolUseTickTimeout = (entity.movement.toolUseTickTimeout <= 0) ? 0 : entity.movement.toolUseTickTimeout - 1;
        // Reset dig state
        if (entity.movement.toolUseTickTimeout == 0 || (!entity.movement.spacebar && entity.movement.isUsingTool)) {
            entity.movement.isUsingTool = false;
            entity.movement.isDigging = false;
            entity.movement.isMining = false;
            if (entity.bodyparts.bodyparts["rightArm"])
                entity.bodyparts.bodyparts["rightArm"].finishCycle();
        }
    });
}

onEntityUseTool = function(gameData, entity) {
    entity.movement.toolUseTickTimeout = entity.movement.calcDigTickDuration(gameData.tickDuration);
    if (!isServer)
        entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArm", 64 / entity.movement.toolUseDuration, false);
    else {
        var angle = entity.physicsBody.angle;
        var moveDir = [Math.cos(-angle), Math.sin(-angle)];
        var toolUsePos = [entity.physicsBody.pos[0] + 1.0 * moveDir[0], entity.physicsBody.pos[1] + 1.0 * moveDir[1]];

        // Check if any player/monster at dig position, hit it
        var shortestDistance = Number.MAX_VALUE;
        var shortestDistanceEntity = null;
        gameData.entityWorld.objectArray.forEach(function(otherEntity) {
            if (entity.id != otherEntity.id && otherEntity.physicsBody && otherEntity.health) {
                var dist = v2.distance(toolUsePos, otherEntity.physicsBody.pos);
                if (dist < shortestDistance) {
                    shortestDistance = dist;
                    shortestDistanceEntity = otherEntity;
                }
            }
        });
        if (shortestDistance <= 1.0) {
            var command = new CommandEntityHurtEntity(entity.id, shortestDistanceEntity.id, -10);
            gameData.commands.push(command);
            return;
        }

        // Check if block at dig position, damage that
        var chunkPos = [];
        var localPos = [];
        v2WorldToBlockChunk(toolUsePos, chunkPos, localPos);
        var blockChunk = gameData.blockWorld.get(chunkPos[0], chunkPos[1]);
        if (blockChunk) {
            var blockId = blockChunk.getForeground(localPos[0], localPos[1]);
            if (blockId) {
                var strength = blockChunk.getStrength(localPos[0], localPos[1]);
                strength -= 64;
                if (strength <= 0) {
                    var x = chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0];
                    var y = chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1];
                    var command = new CommandEntityBuild(entity.id, x, y, 0, BlockTypes.FOREGROUND);
                    gameData.commands.push(command);
                } else
                    blockChunk.setStrength(localPos[0], localPos[1], strength);
                return;
            }
        }

        // If no block at dig position, dig terrain instead
        if (entity.controlledByPlayer) {
            var playerId = entity.controlledByPlayer.playerId;
            var player = gameData.playerWorld.objects[playerId];
            if (player) {
                var command = new CommandPlayerDig(playerId, entity.physicsBody.pos[0], entity.physicsBody.pos[1], moveDir, 1.5, player.getDigSpeed(), player.getMaxDigHardness());
                gameData.commands.push(command);
            }
        } else {
            //TODO: store monster dig radius constant somewhere
            var command = new CommandDig(entity.physicsBody.pos[0], entity.physicsBody.pos[1], 5.0);
            gameData.commands.push(command);
        }
    }
}
