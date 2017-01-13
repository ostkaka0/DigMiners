
DigObstacleBehaviour = function(entity) {
    this.entity = entity;
    this.targetTilePos = null;
    this.oldMoveDir = null;
    this.stopTick = null;
    this.nextRunTick = null;
    this.nextCanRunTickId = gameData.world.tickId;
    this.canRunOldPos = null;
}

DigObstacleBehaviour.prototype.canRun = function() {
    if (!this.entity.equippedItems.items["tool"] || this.entity.equippedItems.items["tool"].itemFunction != ItemFunctions.Shovel)
        return false;
    if (this.nextRunTick && gameData.world.tickId < this.nextRunTick)
        return false;
    if (gameData.world.tickId < this.nextCanRunTickId)
        return false;

    this.nextCanRunTickId = gameData.world.tickId + 5;
    


    var velocity = this.entity.physicsBody.getVelocity();
    var moveDir = this.entity.movement.direction;
    //if (v2.dot(moveDir, velocity) > 1.0)
    //    return false;
    var pos = this.entity.physicsBody.getPos();
    
    if (this.canRunOldPos && v2.distance(this.canRunOldPos, pos) > 2.0) {
        this.canRunOldPos = v2.clone(pos);
        return false;
    }
    this.canRunOldPos = v2.clone(pos);
    
    var digPos = [pos[0] + moveDir[0] / 2, pos[1] + moveDir[1] / 2];
    var tilePos = [Math.floor(digPos[0] - 0.5), Math.floor(digPos[1] - 0.5)];
    for (var i = 0; i < 4; i++) {
        var itPos = [tilePos[0] + (i & 1), tilePos[1] + (i >> 1)];
        var blockId = getForeground(gameData.world.blockWorld, itPos[0], itPos[1]);
        var density = getDensity(gameData.world.tileWorld, itPos[0], itPos[1]);
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
    this.stopTick = gameData.world.tickId + (4000 / Config.tickDuration >> 0);
    this.nextRunTick = null;
}

DigObstacleBehaviour.prototype.run = function() {
    var blockId = getForeground(gameData.world.blockWorld, this.targetTilePos[0], this.targetTilePos[1]);
    var density = getDensity(gameData.world.tileWorld, this.targetTilePos[0], this.targetTilePos[1]);
    if (gameData.world.tickId >= this.stopTick) {
        // No digging for 2 seconds
        this.nextRunTick = gameData.world.tickId + (2000 / Config.tickDuration >> 0);
        return false;
    }

    var pos = this.entity.physicsBody.getPos();
    var tilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
    var dis = v2.distance(this.targetTilePos, tilePos);
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
