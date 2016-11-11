
TargetPlayerBehaviour = function(entity, maxRadius) {
    this.entity = entity;
    this.maxRadius = maxRadius;
    this.target = null;
}

TargetPlayerBehaviour.prototype.canRun = function() {
    var shortestDistance = Number.MAX_VALUE;
    var shortestDistanceEntity = null;
    gameData.playerWorld.objectArray.forEach(function(otherPlayer) {
        if(otherPlayer.entityId == -1) return;
        var otherEntity = gameData.entityWorld.objects[otherPlayer.entityId];
        if(!otherEntity) return;
        if(this.entity.id != otherEntity.id && otherEntity.physicsBody && otherEntity.health) {
            var dist = v2.distance(this.entity.physicsBody.pos, otherEntity.physicsBody.pos);
            if(dist < shortestDistance) {
                shortestDistance = dist;
                shortestDistanceEntity = otherEntity;
            }
        }
    }.bind(this));
    if(shortestDistance <= this.maxRadius) {
        this.target = shortestDistanceEntity;
        return true;
    }
    return false;
}

TargetPlayerBehaviour.prototype.run = function() {
    if(this.target.isDead || this.entity.isDead)
        return false;
    var diffX = this.target.physicsBody.pos[0] - this.entity.physicsBody.pos[0];
    var walkConstant = 0.5;
    var dirs = [];
    if(diffX > walkConstant) {
        dirs.push(MoveDir.ENABLE_RIGHT);
        dirs.push(MoveDir.DISABLE_LEFT);
    } else if(diffX < -walkConstant) {
        dirs.push(MoveDir.ENABLE_LEFT);
        dirs.push(MoveDir.DISABLE_RIGHT);
    } else {
        dirs.push(MoveDir.DISABLE_LEFT);
        dirs.push(MoveDir.DISABLE_RIGHT);
    }

    var diffY = this.target.physicsBody.pos[1] - this.entity.physicsBody.pos[1];
    if(diffY > walkConstant) {
        dirs.push(MoveDir.ENABLE_UP);
        dirs.push(MoveDir.DISABLE_DOWN);
    } else if(diffY < -walkConstant) {
        dirs.push(MoveDir.ENABLE_DOWN);
        dirs.push(MoveDir.DISABLE_UP);
    } else {
        dirs.push(MoveDir.DISABLE_DOWN);
        dirs.push(MoveDir.DISABLE_UP);
    }

    var dist = v2.distance(this.entity.physicsBody.pos, this.target.physicsBody.pos);
    if(dist < 1.5) // 1.0 limit for punch
        dirs.push(MoveDir.ENABLE_SPACEBAR);
    else
        dirs.push(MoveDir.DISABLE_SPACEBAR);

    gameData.commands.push(new CommandEntityMove(this.entity.id, dirs, this.entity.physicsBody.pos[0], this.entity.physicsBody.pos[1]));
    if(dist > this.maxRadius)
        return false;
    return true;
}

TargetPlayerBehaviour.prototype.finish = function() {
    // Disable all keys
    if(!this.entity.isDead)
        gameData.commands.push(new CommandEntityMove(this.entity.id, [5, 6, 7, 8, 9], this.entity.physicsBody.pos[0], this.entity.physicsBody.pos[1]));
}