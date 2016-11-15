
Movement = function(speed, toolUseDuration) {
    this.keyStatuses = {};
    this.direction = v2.create(0, 0);
    this.rotationDirection = v2.create(0, 0);
    this.speed = speed;
    // Entity will be unable to move quicly when disabled
    this.disabledTimeout = 0;
    // The number of ticks until next dig. Will decrease by 1 each tick. Player can only dig at 0. Only used by server
    this.toolUseTickTimeout = 0;
    this.toolUseDuration = toolUseDuration || 0.25; // Seconds between each dig
    // Entity is unable to move while disabled
    this.disabledCooldown = 0;
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
        // Slow down when disabled:
        if (entity.movement.disabledCooldown > 0)
            v2.mul(0.2, normalized, normalized);
        v2.mul(dt, normalized, normalized);
        var velocity = entity.physicsBody.getVelocity();
        v2.add(normalized, velocity, velocity);
        entity.physicsBody.setVelocity(velocity);
        
        var direction = entity.movement.rotationDirection;
        if (direction[0] != 0 || direction[1] != 0)
            entity.physicsBody.rotateTo(Math.atan2(-direction[1], direction[0]), entity.physicsBody.rotationSpeed, dt);
        
        var tool = entity.equippedItems.items["tool"];
        var useCooldownSeconds = (tool && tool.useCooldown)? tool.useCooldown : 0;//entity.movement.calcDigTickDuration(gameData.tickDuration); // digDuration
        var useDurationSeconds = (tool && tool.useDuration)? tool.useDuration : 0;
        var useCooldown = Math.round(useCooldownSeconds / dt);
        var useDuration = Math.round(useDurationSeconds / dt);
        useDuration = Math.min(useCooldown, useDuration);

        if (entity.movement.keyStatuses[Keys.SPACEBAR] && !entity.movement.isUsingTool)
            entity.movement.isUsingTool = true;
        if (entity.movement.isUsingTool && entity.movement.toolUseTickTimeout <= 0) {
            entity.movement.toolUseTickTimeout = useCooldown;
            if (!isServer)
                entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArm", 64 / useCooldownSeconds, false);
        }
            
        if (useCooldown - entity.movement.toolUseTickTimeout == useDuration)
            onEntityUseTool(gameData, entity);

        // Dig update:
        entity.movement.toolUseTickTimeout = (entity.movement.toolUseTickTimeout <= 0) ? 0 : entity.movement.toolUseTickTimeout - 1;
        entity.movement.disabledCooldown = (entity.movement.disabledCooldown <= 0) ? 0 : entity.movement.disabledCooldown - 1;
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
    if (isServer) {
        var tool = entity.equippedItems.items["tool"];
        if (!tool || !tool.itemFunction) return;
        tool.itemFunction(entity, tool);
    }
}
