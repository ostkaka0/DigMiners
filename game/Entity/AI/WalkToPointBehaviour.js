var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var BlockWorld = require("engine/BlockWorld.js")
var TileWorld = require("engine/TileWorld.js")

var Global = require("game/Global.js")
var CommandEntityEquipItem = require("game/Command/CommandEntityEquipItem.js")
var CommandKeyStatusUpdate = require("game/Command/CommandKeyStatusUpdate.js")
var CommandEntityMove = require("game/Command/CommandEntityMove.js")
var CommandEntityRotate = require("game/Command/CommandEntityRotate.js")
var CommandEntityLookAtEntity = require("game/Command/CommandEntityLookAtEntity.js")

var WalkToPointBehaviour = function(entity, goalPoint, radius) {
    this.entity = entity;
    this.goalPoint = goalPoint;
    this.radius = radius || 5.0;
    this.nextUpdateTickId = Global.gameData.world.tickId;
    this.inverval = 20;
}
module.exports = WalkToPointBehaviour;

WalkToPointBehaviour.prototype.canRun = function() {
    return (v2.distance(this.goalPoint, this.entity.physicsBody.getPos()) > this.radius);
}

WalkToPointBehaviour.prototype.initialize = function() {
    var physicsBody = this.entity.physicsBody;
    var dir = [0, 0];
    v2.sub(this.goalPoint, physicsBody.getPos(), dir);
    v2.normalize(dir, dir);
    sendCommand(new CommandEntityMove(this.entity.id, dir, physicsBody.getPos()));
    this.nextUpdateTickId = Global.gameData.world.tickId + this.inverval;
}

WalkToPointBehaviour.prototype.run = function() {
    if (Global.gameData.world.tickId < this.nextUpdateTickId)
        return true;
    this.nextUpdateTickId = Global.gameData.world.tickId + this.inverval;

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

WalkToPointBehaviour.prototype.finish = function() {
    sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
}

WalkToPointBehaviour.prototype.destroy = function(entity) {

}
