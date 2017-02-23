import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import BlockWorld from "Engine/BlockWorld.js";
import TileWorld from "Engine/TileWorld.js";


import CommandEntityEquipItem from "Engine/Command/EntityEquipItem.js";
import CommandKeyStatusUpdate from "Game/Command/KeyStatusUpdate.js";
import CommandEntityMove from "Engine/Command/EntityMove.js";
import CommandEntityRotate from "Engine/Command/EntityRotate.js";
import CommandEntityLookAtEntity from "Engine/Command/EntityLookAtEntity.js";

var BehaviourWalkToPoint = function(entity, goalPoint, radius) {
    this.entity = entity;
    this.goalPoint = goalPoint;
    this.radius = radius || 5.0;
    this.nextUpdateTickId = global.gameData.world.tickId;
    this.inverval = 20;
}
export default BehaviourWalkToPoint;

BehaviourWalkToPoint.prototype.canRun = function() {
    return (v2.distance(this.goalPoint, this.entity.physicsBody.getPos()) > this.radius);
}

BehaviourWalkToPoint.prototype.initialize = function() {
    var physicsBody = this.entity.physicsBody;
    var dir = [0, 0];
    v2.sub(this.goalPoint, physicsBody.getPos(), dir);
    v2.normalize(dir, dir);
    sendCommand(new CommandEntityMove(this.entity.id, dir, physicsBody.getPos()));
    this.nextUpdateTickId = global.gameData.world.tickId + this.inverval;
}

BehaviourWalkToPoint.prototype.run = function() {
    if (global.gameData.world.tickId < this.nextUpdateTickId)
        return true;
    this.nextUpdateTickId = global.gameData.world.tickId + this.inverval;

    var physicsBody = this.entity.physicsBody;
    var movement = this.entity.movement;
    var dir = [0, 0];
    v2.sub(this.goalPoint, physicsBody.getPos(), dir);
    v2.normalize(dir, dir);
    var currentWalkDir = movement.direction;

    // Lazy angle comparison
    if (v2.dot(dir, currentWalkDir) < 0.9)
        sendCommand(new CommandEntityMove(this.entity.id, dir, physicsBody.getPos()));

    return this.canRun();
}

BehaviourWalkToPoint.prototype.finish = function() {
    sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
}

BehaviourWalkToPoint.prototype.destroy = function(entity) {

}
