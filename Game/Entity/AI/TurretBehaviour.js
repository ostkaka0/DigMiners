import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import BlockWorld from "Engine/BlockWorld.js";
import TileWorld from "Engine/TileWorld.js";
import Keys from "Engine/Keys.js";

import Global from "Game/Global.js";
import Items from "Game/Items.js";
import Team from "Game/Entity/Team.js";
import CommandEntityEquipItem from "Game/Command/CommandEntityEquipItem.js";
import CommandKeyStatusUpdate from "Game/Command/CommandKeyStatusUpdate.js";
import CommandEntityMove from "Game/Command/CommandEntityMove.js";
import CommandEntityRotate from "Game/Command/CommandEntityRotate.js";
import CommandEntityLookAtEntity from "Game/Command/CommandEntityLookAtEntity.js";

var TurretBehaviour = function(entity, maxRadius) {
    this.entity = entity;
    this.maxRadius = maxRadius;
    this.target = null;
    this.flowField = null;
    this.lastUpdateTickId = Global.gameData.world.tickId;
    this.lastTargetPos = null;
    this.spacebar = false;
    this.foundGun = false;
    this.isAiming = false;
    this.nextCanRunTickId = Global.gameData.world.tickId;
}
export default TurretBehaviour

TurretBehaviour.prototype.canRun = function() {
    if (Global.gameData.world.tickId < this.nextCanRunTickId)
        return false;
    this.nextCanRunTickId = Global.gameData.world.tickId + 40 + 40 * Math.random() >> 0;
    this.target = this.getTarget();
    if (this.target == null)
        return false;
    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());
    if (dis >= this.maxRadius)
        return false;
    return true;
}

TurretBehaviour.prototype.initialize = function() {
    if (!this.foundGun) {
        var slotId = this.entity.inventory.findTool(Items.Functions.RangedWeapon);
        this.foundGun = (slotId != -1);
        if (this.foundGun)
            sendCommand(new CommandEntityEquipItem(this.entity.id, slotId, this.entity.inventory.items[slotId].id, true));
    }
}

TurretBehaviour.prototype.run = function() {
    if (Global.gameData.world.tickId % 5 != this.nextCanRunTickId % 5) return true;

    if (!this.target || this.target.isDead || !this.target.isActive) {
        this.target = this.getTarget();
        // If it can't find a new target we must stop this behaviour
        if (this.target == null)
            return false;
    }

    var tilePos = [Math.floor(this.entity.physicsBody.getPos()[0]), Math.floor(this.entity.physicsBody.getPos()[1])];
    var tilePosTarget = [Math.floor(this.target.physicsBody.getPos()[0]), Math.floor(this.target.physicsBody.getPos()[1])];

    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());

    if (dis > this.maxRadius)
        return false;

    var targetDir = [0, 0];
    v2.sub(this.target.physicsBody.getPos(), this.entity.physicsBody.getPos(), targetDir);
    v2.normalize(targetDir, targetDir);

    var tickInterval = Math.floor(20 * Math.min(1.0, dis / 40.0));
    tickInterval = Math.max(5, tickInterval);

    if (Global.gameData.world.tickId < this.lastUpdateTickId + tickInterval)
        return true;
    this.lastUpdateTickId = Global.gameData.world.tickId;

    var currentDir = this.entity.movement.direction;
    var angle = this.entity.physicsBody.angle;
    var angleVec = [Math.cos(-angle), Math.sin(-angle)];
    var attackDistance = this.getAttackDistance(this.entity.physicsBody.getPos(), angleVec);
    var attackDotAngle = this.getAttackDotAngle();
    var dotAngle = v2.dot(targetDir, angleVec);

    if (dis < attackDistance && !this.spacebar && 1.0 - dotAngle < attackDotAngle) {// 1.0 limit for punch
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, true, this.entity.physicsBody.getPos()));
        this.spacebar = true;
    } else if ((dis >= attackDistance || 1.0 - dotAngle > 1.5 * attackDotAngle) && this.spacebar) {
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.getPos()));
        this.spacebar = false;
    }

    // Look at target entity
    if (!this.isAiming && dis < 20.0 && dis < attackDistance) {
        sendCommand(new CommandEntityLookAtEntity(this.entity.id, this.target.id));
    } else if (this.isAiming && dis > 20.0 && dis < attackDistance) {
        sendCommand(new CommandEntityLookAtEntity(this.entity.id, 0));
    }
    return true;
}

TurretBehaviour.prototype.finish = function() {
    if (this.spacebar)
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.getPos()));
    if (this.isAiming)
        sendCommand(new CommandEntityLookAtEntity(this.entity.id, 0));
    this.target = null;
    this.flowField = null;
    this.spacebar = false;
    this.isAiming = false;
}

TurretBehaviour.prototype.destroy = function(entity) {

}

TurretBehaviour.prototype.getTarget = function() {
    var hasMovement = false;
    var shortestDistance = Number.MAX_VALUE;
    var shortestDistanceEntity = null;
    var bodies = [];
    var pos = this.entity.physicsBody.getPos();
    global.gameData.world.physicsWorld.getBodiesInRadius(bodies, pos, this.maxRadius);
    for (var i = 0; i < bodies.length; i++) {
        var bodyId = bodies[i];
        var otherEntity = Global.gameData.world.physicsEntities[bodyId];
        if (!otherEntity) continue;
        if (!otherEntity.health || !otherEntity.physicsBody) continue;
        if (!otherEntity.team && !otherEntity.movement) continue;
        if (this.entity.team && this.entity.team.value != Team.Enum.None && (!otherEntity.team || otherEntity.team.value == this.entity.team.value)) continue;
        if (otherEntity.id == this.entity.id) continue;
        if (hasMovement && !otherEntity.movement) continue;

        var dis = v2.distance(this.entity.physicsBody.getPos(), otherEntity.physicsBody.getPos());

        if (dis > this.maxRadius) continue;

        if (otherEntity.controlledByPlayer)
            dis /= 4;

        if (dis >= shortestDistance) {
            if (hasMovement || !otherEntity.movement)
                continue;
        }

        shortestDistance = dis;
        shortestDistanceEntity = otherEntity;
        hasMovement = (otherEntity.movement) ? true : false;
    }
    return shortestDistanceEntity;
}

TurretBehaviour.prototype.getAttackDistance = function(pos, dir) {
    // TODO: Raycast
    var stepLength = 0.5;
    var dis = stepLength;
    var rayPos = v2.clone(pos);
    var step = [stepLength * dir[0], stepLength * dir[1]];
    v2.add(step, rayPos, rayPos);
    for (var i = 0; i < 40; i++) {
        if (TileWorld.getDensity(Global.gameData.world.tileWorld, rayPos[0], rayPos[1]) > 127) break;
        if (BlockWorld.getForeground(Global.gameData.world.blockWorld, rayPos[0], rayPos[1]) != 0) break;

        v2.add(step, rayPos, rayPos);
        dis += stepLength;
    }
    return dis;
}


TurretBehaviour.prototype.getAttackDotAngle = function() {
    return 0.05;
}
