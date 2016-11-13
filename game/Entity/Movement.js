
Movement = function(speed, toolUseDuration) {
    this.keyStatuses = {};
    this.direction = v2.create(0, 0);
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

Movement.prototype.serialize = function(byteArray, index) {
    serializeV2(byteArray, index, this.direction);
    var keys = Object.keys(this.keyStatuses);
    serializeInt32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        var value = this.keyStatuses[key];
        serializeInt8(byteArray, index, key);
        serializeInt8(byteArray, index, (value == true ? 1 : 0));
    }.bind(this));
    serializeFix(byteArray, index, this.speed);
}

Movement.prototype.deserialize = function(byteArray, index, gameData) {
    this.direction = deserializeV2(byteArray, index);
    var keyStatusesLength = deserializeInt32(byteArray, index);
    this.keyStatuses = {};
    for (var i = 0; i < keyStatusesLength; ++i) {
        var key = deserializeInt8(byteArray, index);
        var pressed = deserializeInt8(byteArray, index);
        pressed = (pressed == 1 ? true : false);
        this.keyStatuses[i] = pressed;
    }
    this.speed = deserializeFix(byteArray, index);
}

Movement.prototype.getSerializationSize = function() {
    return 16 + 2 * Object.keys(this.keyStatuses).length;
}

Movement.prototype.destroy = function(entity) {

}

entityFunctionEntityMovement = function(gameData, dt) {
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (!entity || !entity.movement || !entity.physicsBody)
            return;

        // Movement:
        var normalized = v2.create(0, 0);
        v2.normalize(entity.movement.direction, normalized);
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

        var moveDir = entity.movement.direction;
        if (moveDir[0] != 0 || moveDir[1] != 0)
            entity.physicsBody.rotateTo(Math.atan2(-moveDir[1], moveDir[0]), entity.physicsBody.rotationSpeed, dt);

        if (entity.movement.keyStatuses[Keys.SPACEBAR] && !entity.movement.isUsingTool)
            entity.movement.isUsingTool = true;
        if (entity.movement.isUsingTool && entity.movement.toolUseTickTimeout <= 0)
            onEntityUseTool(gameData, entity);

        // Dig update:
        entity.movement.toolUseTickTimeout = (entity.movement.toolUseTickTimeout <= 0) ? 0 : entity.movement.toolUseTickTimeout - 1;
        // Reset dig state
        if (entity.movement.toolUseTickTimeout == 0 || (!entity.movement.keyStatuses[Keys.SPACEBAR] && entity.movement.isUsingTool)) {
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

        if (!entity.controlledByPlayer) return;
        var playerId = entity.controlledByPlayer.playerId;
        var player = gameData.playerWorld.objects[playerId];
        if (!player) return;
        var tool = player.inventory.getEquippedItemType("tool");
        if (!tool || !tool.itemFunction) return;
        tool.itemFunction(entity, tool);
        

        /*// Check if any player/monster at dig position, hit it
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
            sendCommand(command);
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
                    sendCommand(command);
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
                sendCommand(command);
            }
        } else {
            //TODO: store monster dig radius constant somewhere
            var command = new CommandDig(entity.physicsBody.pos[0], entity.physicsBody.pos[1], 5.0);
            sendCommand(command);
        }*/
    }
}
