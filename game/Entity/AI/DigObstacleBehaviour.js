
DigObstacleBehaviour = function(entity) {
    this.entity = entity;
    this.targetTilePos = null;
    this.stopTick = null;
}

DigObstacleBehaviour.prototype.canRun = function() {
    var velocity = this.entity.physicsBody.getVelocity();
    if (v2.length(velocity) > 0.5) return false;
    var pos = this.entity.physicsBody.getPos();
    var tilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
    for (var i = 0; i < 9; i++) {
        var itPos = [tilePos[0] + i % 3 - 1, tilePos[1] + (i / 3 >> 0) - 1];
        var blockId = getForeground(gameData.blockWorld, itPos[0], itPos[1]);
        var density = getDensity(gameData.tileWorld, itPos[0], itPos[1]);
        if (blockId != 0 || density > 127) {
            this.targetTilePos = itPos;
            this.stopTick = gameData.tickId + (2000 / gameData.tickDuration >> 0);
            sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, true, this.entity.physicsBody.pos));
            return true;
        }
    }
    return false;
}

DigObstacleBehaviour.prototype.run = function() {
    var blockId = getForeground(gameData.blockWorld, this.targetTilePos[0], this.targetTilePos[1]);
    var density = getDensity(gameData.tileWorld, this.targetTilePos[0], this.targetTilePos[1]);
    if (gameData.tickId >= this.stopTick) 
        return false;
    return (blockId != 0 || density != 0);
}

DigObstacleBehaviour.prototype.finish = function() {
    sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.pos));
}
