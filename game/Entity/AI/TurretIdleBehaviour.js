
var TurretIdleBehaviour = function(entity) {
    this.entity = entity;
}
module.exports = TurretIdleBehaviour

TurretIdleBehaviour.prototype.canRun = function() {
    return true;
}

TurretIdleBehaviour.prototype.initialize = function() {

}

TurretIdleBehaviour.prototype.run = function() {
    return true;
}

TurretIdleBehaviour.prototype.finish = function() {

}

TurretIdleBehaviour.prototype.destroy = function(entity) {

}
