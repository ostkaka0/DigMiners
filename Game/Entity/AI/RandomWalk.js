





var BehaviourRandomWalk = function(entity) {
    this.entity = entity;
    this.isWalking = false;

    this.directions = [
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 0],
        [-1, -1],
        [0, -1]
    ];
}
global.BehaviourRandomWalk = BehaviourRandomWalk;

BehaviourRandomWalk.prototype.canRun = function() {
    return true;
}

BehaviourRandomWalk.prototype.initialize = function() {

}

BehaviourRandomWalk.prototype.run = function() {
    var physicsBody = this.entity.physicsBody;
    if (!this.isWalking) {
        // Decide a direction to walk
        var dir = this.directions[Math.floor(Math.random() * 6)];
        sendCommand(new CommandEntityMove(this.entity.id, dir, physicsBody.getPos()));
        this.isWalking = true;
    } else {
        var velocity = this.entity.physicsBody.getVelocity();
        var sqrLength = v2.sqrLength(velocity);
        if (sqrLength < 0.2 && sqrLength != 0) return false;
        if (Math.random() > 0.96) {
            // Stop walking
            sendCommand(new CommandEntityMove(this.entity.id, [0, 0], physicsBody.getPos()));
            this.isWalking = false;
        }
    }
    return true;
}

BehaviourRandomWalk.prototype.finish = function() {

}

BehaviourRandomWalk.prototype.destroy = function(entity) {

}
