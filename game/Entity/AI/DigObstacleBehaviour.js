
DigObstacleBehaviour = function(entity) {
    this.entity = entity;
    this.targetTilePos = null;
    this.oldMoveDir = null;
    this.stopTick = null;
    this.nextRunTick = null;
}

DigObstacleBehaviour.prototype.canRun = function() {
    if (this.nextRunTick && gameData.tickId < this.nextRunTick)
        return false;

    var velocity = this.entity.physicsBody.getVelocity();
    var moveDir = this.entity.movement.direction;
    if (v2.dot(moveDir, velocity) > 0.5)
        return false;
    var pos = this.entity.physicsBody.getPos();
    var digPos = [pos[0] + moveDir[0] / 2, pos[1] + moveDir[1] / 2];
    var tilePos = [Math.floor(digPos[0] - 0.5), Math.floor(digPos[1] - 0.5)];
    for (var i = 0; i < 4; i++) {
        var itPos = [tilePos[0] + (i & 1), tilePos[1] + (i >> 1)];
        var blockId = getForeground(gameData.blockWorld, itPos[0], itPos[1]);
        var density = getDensity(gameData.tileWorld, itPos[0], itPos[1]);
        if (blockId != 0 || density > 127) {
            this.targetTilePos = itPos;
            return true;
        }
    }
    return false;
}

DigObstacleBehaviour.prototype.initialize = function() {
    this.oldMoveDir = this.entity.movement.direction;
    sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, true, this.entity.physicsBody.getPos()));
    sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    var pos = this.entity.physicsBody.getPos();
    var tilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
    var diff = [this.targetTilePos[0] - tilePos[0], this.targetTilePos[1] - tilePos[1]];
    var normalized = v2.create(0, 0);
    v2.normalize(diff, normalized);
    sendCommand(new CommandEntityRotate(this.entity.id, normalized));
    this.stopTick = gameData.tickId + (4000 / gameData.tickDuration >> 0);
    this.nextRunTick = null;
}

DigObstacleBehaviour.prototype.run = function() {
    var blockId = getForeground(gameData.blockWorld, this.targetTilePos[0], this.targetTilePos[1]);
    var density = getDensity(gameData.tileWorld, this.targetTilePos[0], this.targetTilePos[1]);
    if (gameData.tickId >= this.stopTick) {
        // No digging for 2 seconds
        this.nextRunTick = gameData.tickId + (2000 / gameData.tickDuration >> 0);
        return false;
    }

    var pos = this.entity.physicsBody.getPos();
    var tilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
    var dis = v2.distanceSquared(this.targetTilePos, tilePos);
    if (dis > 0.8) {
        var diff = [this.targetTilePos[0] - tilePos[0], this.targetTilePos[1] - tilePos[1]];
        var normalized = v2.create(0, 0);
        v2.normalize(diff, normalized);
        this.isMoving = true;
        sendCommand(new CommandEntityMove(this.entity.id, normalized, this.entity.physicsBody.getPos()));
    } else if (this.isMoving)
        sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));

    return (blockId != 0 || density != 0);
}

DigObstacleBehaviour.prototype.finish = function() {
    sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.getPos()));
    sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    sendCommand(new CommandEntityRotate(this.entity.id, this.oldMoveDir));
}

DigObstacleBehaviour.prototype.destroy = function(entity) {

}
