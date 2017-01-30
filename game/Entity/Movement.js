var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var Keys = require("engine/Keys.js")
var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Entity = require("game/Entity/Entity.js")
var CommandEntityBeginReloadWeapon = require("game/Command/CommandEntityBeginReloadWeapon.js")

var Movement = function(speed, toolUseDuration, damageMultiplier, digHardnessMultiplier) {
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
    this.entityLookTarget = null;
}
module.exports = Movement

Movement.prototype.name = movement.name; function movement() { };

Movement.prototype.calcDigTickDuration = function(dt) {
    return Math.round(1000.0 * this.toolUseDuration / dt);
}

Movement.prototype.serialize = function(byteArray, index) {
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

Movement.prototype.deserialize = function(byteArray, index, gameData) {
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

Movement.prototype.getSerializationSize = function() {
    return 16 + 2 * Object.keys(this.keyStatuses).length;
}

Movement.prototype.destroy = function(entity) {

}

Movement.entityFunction = function(dt) {
    Global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
        if (!entity || !entity.movement || !entity.physicsBody)
            return;
        var movement = entity.movement;

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
            entity.physicsBody.rotateTo(Math.atan2(-rotationDirection[1], rotationDirection[0]), entity.physicsBody.rotationSpeed, dt);

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
                    var useCycle = Global.gameData.animationManager.cycles[useCycleName];
                    if (useCycle)
                        entity.bodyparts.bodyparts["rightArm"].cycle(Global.gameData, useCycleName, useCycle.numFrames / useCooldown * 20, true);
                }
            }

            if (entity.movement.isReloading && entity.movement.toolReloadTickTimeout <= 0) {
                entity.movement.toolReloadTickTimeout = reloadCooldown;
                if (!isServer) {
                    var reloadCycleRightArmName = (tool.reloadCycleRightArm ? tool.reloadCycleRightArm : "rightArm");
                    var reloadCycleLeftArmName = (tool.reloadCycleLeftArm ? tool.reloadCycleLeftArm : "leftArm");
                    var reloadCycleGunName = (tool.reloadCycleGun ? tool.reloadCycleGun : "");
                    var reloadCycleRightArm = Global.gameData.animationManager.cycles[reloadCycleRightArmName];
                    var reloadCycleLeftArm = Global.gameData.animationManager.cycles[reloadCycleLeftArmName];
                    var reloadCycleGun = Global.gameData.animationManager.cycles[reloadCycleGunName];
                    if (reloadCycleRightArm)
                        entity.bodyparts.bodyparts["rightArm"].cycle(Global.gameData, reloadCycleRightArmName, reloadCycleRightArm.numFrames / reloadCooldown * 20, true);
                    if (reloadCycleLeftArm)
                        entity.bodyparts.bodyparts["leftArm"].cycle(Global.gameData, reloadCycleLeftArmName, reloadCycleLeftArm.numFrames / reloadCooldown * 20, true);
                    if (reloadCycleGun)
                        entity.bodyparts.bodyparts["tool"].cycle(Global.gameData, reloadCycleGunName, reloadCycleGun.numFrames / reloadCooldown * 20, true);
                }
            }

            if (useCooldown - entity.movement.toolUseTickTimeout == useDuration) {
                if (tool && tool.itemFunction)
                    tool.itemFunction(entity, tool);
            }

            if (reloadCooldown - entity.movement.toolReloadTickTimeout == 0) {
                if (tool && tool.reloadFunction)
                    tool.reloadFunction(entity, tool);
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
            Global.gameData.world.events.trigger("finishReload", entity, tool);
        }
        //}
    });
}
