
var BehaviourTurretIdle = function(entity) {
    this.entity = entity;
}
global.BehaviourTurretIdle = BehaviourTurretIdle;

BehaviourTurretIdle.prototype.canRun = function() {
    return true;
}

BehaviourTurretIdle.prototype.initialize = function() {

}

BehaviourTurretIdle.prototype.run = function() {
    return true;
}

BehaviourTurretIdle.prototype.finish = function() {

}

BehaviourTurretIdle.prototype.destroy = function(entity) {

}
