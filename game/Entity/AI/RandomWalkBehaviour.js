
RandomWalkBehaviour = function(entity) {
    this.entity = entity;
    this.isWalking = false;
}

RandomWalkBehaviour.prototype.canRun = function() {
    return true;
}

RandomWalkBehaviour.prototype.run = function() {
    var physicsBody = this.entity.physicsBody;
    if(!this.isWalking) {
        // Decide a direction to walk
        var direction1 = [0, -1, 2]; // up, none, down
        var direction2 = [1, -1, 3]; // left, none, right
        var dir1 = direction1[Math.floor(Math.random() * 3)];
        if(dir1 != -1)
            sendCommand(new CommandEntityMove(this.entity.id, [dir1], physicsBody.pos[0], physicsBody.pos[1]));
        var dir2 = direction2[Math.floor(Math.random() * 3)];
        if(dir2 != -1)
            sendCommand(new CommandEntityMove(this.entity.id, [dir2], physicsBody.pos[0], physicsBody.pos[1]));

        if(dir1 != -1 || dir2 != -1) {
            this.isWalking = true;
            this.dir = [dir1, dir2];
        }
    } else {
        if(Math.random() > 0.96) {
            // Stop walking
            if(this.dir[0] != -1)
                sendCommand(new CommandEntityMove(this.entity.id, [this.dir[0] + 5], physicsBody.pos[0], physicsBody.pos[1]));
            if(this.dir[1] != -1)
                sendCommand(new CommandEntityMove(this.entity.id, [this.dir[1] + 5], physicsBody.pos[0], physicsBody.pos[1]));
            this.isWalking = false;
        }
    }
    return true;
}

RandomWalkBehaviour.prototype.finish = function() {

}