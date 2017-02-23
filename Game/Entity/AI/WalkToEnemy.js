import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import BlockWorld from "Engine/BlockWorld.js";
import TileWorld from "Engine/TileWorld.js";


import EntityTeam from "Engine/Entity/Team.js";
import CommandEntityEquipItem from "Engine/Command/EntityEquipItem.js";
import CommandKeyStatusUpdate from "Game/Command/KeyStatusUpdate.js";
import CommandEntityMove from "Engine/Command/EntityMove.js";
import CommandEntityRotate from "Engine/Command/EntityRotate.js";
import CommandEntityLookAtEntity from "Engine/Command/EntityLookAtEntity.js";

var BehaviourWalkToEnemy = function(entity, maxRadius) {
    this.entity = entity;
    this.maxRadius = maxRadius;
    this.target = null;
    this.nextUpdateTickId = global.gameData.world.tickId;
    this.moving = false;
    this.nextCanRunTickId = global.gameData.world.tickId;
}
export default BehaviourWalkToEnemy;

BehaviourWalkToEnemy.prototype.canRun = function() {
    if (global.gameData.world.tickId < this.nextCanRunTickId)
        return false;
    this.nextCanRunTickId = global.gameData.world.tickId + 40 + 40 * Math.random() >> 0;
    this.target = this.getTarget();
    if (this.target == null)
        return false;
    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());
    if (dis >= this.maxRadius)
        return false;
    return true;
}

BehaviourWalkToEnemy.prototype.initialize = function() {
}

BehaviourWalkToEnemy.prototype.run = function() {
    if (global.gameData.world.tickId < this.nextUpdateTickId) return true;
    this.nextUpdateTickId = global.gameData.world.tickId + 20;

    if (!this.target || this.target.isDead || !this.target.isActive) {
        this.target = this.getTarget();
        // If it can't find a new target we must stop this behaviour
        if (this.target == null)
            return false;
    }

    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());
    if (dis > this.maxRadius)
        return false;


    var currentDir = this.entity.movement.direction;
    var dir = [0, 0];
    v2.sub(this.target.physicsBody.getPos(), this.entity.physicsBody.getPos(), dir);
    v2.normalize(dir, dir);
    if (dir[0] == 0 && dir[1] == 0)
        return false;

    if (v2.dot(dir, currentDir) < 0.9 && !this.spacebar) {
        sendCommand(new CommandEntityMove(this.entity.id, dir, this.entity.physicsBody.getPos()));
        this.moving = true;
    }
    return true;
}

BehaviourWalkToEnemy.prototype.finish = function() {
    if (this.moving)
        sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    this.target = null;
    this.moving = false;
}

BehaviourWalkToEnemy.prototype.destroy = function(entity) {

}

BehaviourWalkToEnemy.prototype.getTarget = function() {
    var shortestDistance = Number.MAX_VALUE;
    var shortestDistanceEntity = null;
    var bodies = [];
    var pos = this.entity.physicsBody.getPos();
    global.gameData.world.physicsWorld.getBodiesInRadius(bodies, pos, this.maxRadius);
    for (var i = 0; i < bodies.length; i++) {
        var bodyId = bodies[i];
        var otherEntity = global.gameData.world.physicsEntities[bodyId];
        if (!otherEntity) continue;
        if (!otherEntity.health || !otherEntity.physicsBody) continue;
        if (!otherEntity.team && !otherEntity.movement) continue;
        if (this.entity.team && this.entity.team.value != EntityTeam.Enum.None && (!otherEntity.team || otherEntity.team.value == this.entity.team.value)) continue;
        if (otherEntity.id == this.entity.id) continue;

        var dis = v2.distance(this.entity.physicsBody.getPos(), otherEntity.physicsBody.getPos());
        if (dis < shortestDistance) {
            if (otherEntity.controlledByPlayer)
                dis /= 4;
            shortestDistance = dis;
            shortestDistanceEntity = otherEntity;
        }
    }

    if (shortestDistance <= this.maxRadius)
        return shortestDistanceEntity;
    return null;
}
