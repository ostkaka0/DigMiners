
RandomWalkBehaviour = function(entity) {
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

RandomWalkBehaviour.prototype.canRun = function() {
    return true;
}

RandomWalkBehaviour.prototype.run = function() {
    var physicsBody = this.entity.physicsBody;
    if (!this.isWalking) {
        // Decide a direction to walk
        var dir = this.directions[Math.floor(Math.random() * 6)];
        sendCommand(new CommandEntityMove(this.entity.id, dir, physicsBody.pos[0], physicsBody.pos[1]));
        this.isWalking = true;
        this.dir = dir;
    } else {
        if (Math.random() > 0.96) {
            // Stop walking
            sendCommand(new CommandEntityMove(this.entity.id, [0, 0], physicsBody.pos[0], physicsBody.pos[1]));
            this.isWalking = false;
        }
    }
    return true;
}

RandomWalkBehaviour.prototype.finish = function() {

}