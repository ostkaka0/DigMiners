
var EntityMovement = function(speed, toolUseDuration, damageMultiplier, digHardnessMultiplier, digSpeedMultiplier, blockBreakMultiplier) {
    this.keyStatuses = {};
    this.direction = v2.create(0, 0);
    this.rotationDirection = v2.create(0, 0);
    this.speed = speed;
    // Entity will be unable to move quicly when disabled
    this.disabledTimeout = 0;
    // The number of ticks until next dig. Will decrease by 1 each tick. Player can only dig at 0. Only used by server
    this.toolUseTickTimeout = 0;
    this.toolUseDuration = toolUseDuration || 0.25; // Seconds between each dig
    this.toolReloadTickTimeout = 0;
    // Entity is unable to move while disabled
    this.disabledCooldown = 0;
    this.digMovementSpeed = 0.65;
    this.mineMovementSpeed = 0.05;
    this.isUsingTool = false;
    this.isReloading = false;
    this.isDigging = false;
    this.isMining = false;
    this.damageMultiplier = (damageMultiplier == null) ? 1.0 : damageMultiplier;
    this.digHardnessMultiplier = (digHardnessMultiplier == null) ? 1.0 : digHardnessMultiplier;
    this.digSpeedMultiplier = (digSpeedMultiplier == null) ? 1.0 : digSpeedMultiplier
    this.blockBreakMultiplier = (blockBreakMultiplier == null) ? 1.0 : blockBreakMultiplier
    this.entityLookTarget = null;
}
TypeRegister.add(RegisterEntity, EntityMovement);

EntityMovement.prototype.name = movement.name; function movement() { };

EntityMovement.prototype.calcDigTickDuration = function(dt) {
    return Math.round(1000.0 * this.toolUseDuration / dt);
}

EntityMovement.prototype.serialize = function(byteArray, index) {
    Serialize.v2(byteArray, index, this.direction);
    var keys = Object.keys(this.keyStatuses);
    Serialize.int32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        var value = this.keyStatuses[key];
        Serialize.int8(byteArray, index, key);
        Serialize.int8(byteArray, index, (value == true ? 1 : 0));
    }.bind(this));
    Serialize.fix(byteArray, index, this.speed);
}

EntityMovement.prototype.deserialize = function(byteArray, index, gameData) {
    this.direction = Deserialize.v2(byteArray, index);
    var keyStatusesLength = Deserialize.int32(byteArray, index);
    this.keyStatuses = {};
    for (var i = 0; i < keyStatusesLength; ++i) {
        var key = Deserialize.int8(byteArray, index);
        var pressed = Deserialize.int8(byteArray, index);
        pressed = (pressed == 1 ? true : false);
        this.keyStatuses[i] = pressed;
    }
    this.speed = Deserialize.fix(byteArray, index);
}

EntityMovement.prototype.getSerializationSize = function() {
    return 16 + 2 * Object.keys(this.keyStatuses).length;
}

EntityMovement.prototype.destroy = function(entity) {

}

EntityMovement.entityFunction = function(dt) {
    World.entities.objectArray.forEach(function(entity) {
        if (!entity || !entity.movement || !entity.physicsBody)
            return;
        var movement = entity.movement;

        // EntityMovement:
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
            v2.mul(0.8, normalized, normalized);
        v2.mul(dt, normalized, normalized);
        var velocity = entity.physicsBody.getVelocity();
        v2.add(normalized, velocity, velocity);
        entity.physicsBody.setVelocity(velocity);

        // Look at entityLookTarget
        if (movement.entityLookTarget && (!movement.entityLookTarget.isActive || !movement.entityLookTarget.physicsBody))
            movement.entityLookTarget = null;
        if (movement.entityLookTarget) {
            v2.sub(movement.entityLookTarget.physicsBody.getPos(), entity.physicsBody.getPos(), movement.rotationDirection);
            v2.normalize(movement.rotationDirection, movement.rotationDirection);
        }
        var rotationDirection = entity.movement.rotationDirection;
        if (rotationDirection[0] != 0 || rotationDirection[1] != 0)
            entity.physicsBody.rotateTo(-Math.atan2(-rotationDirection[1], rotationDirection[0]), entity.physicsBody.rotationSpeed, dt);

        if (entity.equippedItems) {
            var tool = entity.equippedItems.items["tool"];
            var useCooldown = (tool && tool.useCooldown) ? tool.useCooldown : 0;
            var useDuration = (tool && tool.useDuration) ? tool.useDuration : 0;
            var reloadCooldown = (tool && tool.reloadCooldown) ? tool.reloadCooldown : 0;
            useDuration = Math.min(useCooldown, useDuration);

            if (!entity.movement.isUsingTool && !entity.movement.isReloading) {
                if (isServer && tool && tool.canReload && entity.movement.keyStatuses[Keys.R] && Entity.canReload(entity, tool))
                    sendCommand(new CommandEntityBeginReloadWeapon(entity.id));
                else if (entity.movement.keyStatuses[Keys.SPACEBAR] && Entity.canUseTool(entity, tool))
                    entity.movement.isUsingTool = true;
                else if (isServer && entity.movement.keyStatuses[Keys.SPACEBAR] && Entity.canReload(entity, tool))
                    sendCommand(new CommandEntityBeginReloadWeapon(entity.id));
            }

            if (entity.movement.isUsingTool && entity.movement.toolUseTickTimeout <= 0) {
                entity.movement.toolUseTickTimeout = useCooldown;
                if (!isServer) {
                    var useCycleName = (tool.useCycle ? tool.useCycle : "rightArm");
                    // TODO: TOFIX: BodyParts
                    //var useCycle = WorldRenderer.animationManager.cycles[useCycleName];
                    //if (useCycle)
                    //    entity.bodyParts.bodyParts["rightArm"].cycle(useCycleName, useCycle.numFrames / useCooldown * 20, true);
                }
            }

            if (entity.movement.isReloading && entity.movement.toolReloadTickTimeout <= 0) {
                entity.movement.toolReloadTickTimeout = reloadCooldown;
                if (!isServer) {
                    // TODO: TOFIX: BodyParts
                    /*
                    var reloadCycleRightArmName = (tool.reloadCycleRightArm ? tool.reloadCycleRightArm : "rightArm");
                    var reloadCycleLeftArmName = (tool.reloadCycleLeftArm ? tool.reloadCycleLeftArm : "leftArm");
                    var reloadCycleGunName = (tool.reloadCycleGun ? tool.reloadCycleGun : "");
                    var reloadCycleRightArm = WorldRenderer.animationManager.cycles[reloadCycleRightArmName];
                    var reloadCycleLeftArm = WorldRenderer.animationManager.cycles[reloadCycleLeftArmName];
                    var reloadCycleGun = WorldRenderer.animationManager.cycles[reloadCycleGunName];
                    if (reloadCycleRightArm && entity.bodyParts.bodyParts["rightArm"])
                        entity.bodyParts.bodyParts["rightArm"].cycle(reloadCycleRightArmName, reloadCycleRightArm.numFrames / reloadCooldown * 20, true);
                    if (reloadCycleLeftArm && entity.bodyParts.bodyParts["leftArm"])
                        entity.bodyParts.bodyParts["leftArm"].cycle(reloadCycleLeftArmName, reloadCycleLeftArm.numFrames / reloadCooldown * 20, true);
                    if (reloadCycleGun && entity.bodyParts.bodyParts["tool"])
                        entity.bodyParts.bodyParts["tool"].cycle(reloadCycleGunName, reloadCycleGun.numFrames / reloadCooldown * 20, true);*/
                }
            }

            if (useCooldown - entity.movement.toolUseTickTimeout == useDuration) {
                if (tool && tool.itemFunction)
                    tool.itemFunction(tool, entity);
            }

            if (reloadCooldown - entity.movement.toolReloadTickTimeout == 0) {
                if (tool && tool.reloadFunction)
                    tool.reloadFunction(tool, entity);
            }

            // Dig update:
            entity.movement.toolUseTickTimeout = (entity.movement.toolUseTickTimeout <= 0) ? 0 : entity.movement.toolUseTickTimeout - 1;
            entity.movement.toolReloadTickTimeout = (entity.movement.toolReloadTickTimeout <= 0) ? 0 : entity.movement.toolReloadTickTimeout - 1;
        }
        entity.movement.disabledCooldown = (entity.movement.disabledCooldown <= 0) ? 0 : entity.movement.disabledCooldown - 1;

        // Reset dig state
        if (entity.movement.toolUseTickTimeout == 0 || (!entity.movement.keyStatuses[Keys.SPACEBAR] && entity.movement.isUsingTool)) {
            entity.movement.isUsingTool = false;
            entity.movement.isDigging = false;
            entity.movement.isMining = false;
        }

        if (entity.movement.toolReloadTickTimeout == 0 && entity.movement.isReloading) {// || (!entity.movement.keyStatuses[Keys.R] && entity.movement.isReloading)) {
            entity.movement.isReloading = false;
            World.events.trigger("finishReload", entity, tool);
        }
        //}
    });
}
