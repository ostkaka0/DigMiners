
TargetPlayerBehaviour = function(entity, maxRadius) {
    this.entity = entity;
    this.maxRadius = maxRadius;
    this.target = null;
    this.flowField = null;
    this.lastUpdateTickId = gameData.tickId;
    this.nextPathUpdateTick = gameData.tickId;
    this.lastTargetPos = null;
    this.spacebar = false;
    this.moving = false;
    this.isGunner = false;
    this.isAiming = false;
    this.nextCanRunTickId = gameData.tickId;
}

TargetPlayerBehaviour.prototype.canRun = function() {
    if (gameData.tickId < this.nextCanRunTickId)
        return false;
    this.nextCanRunTickId = gameData.tickId + 40 + 40 * Math.random() >> 0;
    this.target = this.getTarget();
    if (this.target == null)
        return false;
    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());
    if (dis >= this.maxRadius)
        return false;
    return true;
}

TargetPlayerBehaviour.prototype.initialize = function() {
    this.isGunner = (this.entity.equippedItems.items["tool"] && this.entity.equippedItems.items["tool"].itemFunction == ItemFunctions.RangedWeapon);
}

TargetPlayerBehaviour.prototype.run = function() {
    if (gameData.tickId % 5 != this.nextCanRunTickId % 5) return true;
    if (!this.target || this.target.isDead || !this.target.isActive) {
        this.target = this.getTarget();
        // If it can't find a new target we must stop this behaviour
        if (this.target == null)
            return false;
    }

    var tilePos = [Math.floor(this.entity.physicsBody.getPos()[0]), Math.floor(this.entity.physicsBody.getPos()[1])];
    var tilePosTarget = [Math.floor(this.target.physicsBody.getPos()[0]), Math.floor(this.target.physicsBody.getPos()[1])];

    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());

    if (dis > this.maxRadius)
        return false;
    if (gameData.tickId >= this.nextPathUpdateTick) {
        if (!this.lastTargetPos || !this.flowField || v2.sqrDistance(this.lastTargetPos, this.target.physicsBody.getPos()) > v2.sqrDistance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos())) {
            this.flowField = new Map2D();
            var expandList = [];
            aStarFlowField(this.flowField, expandList, gameData.tileWorld, gameData.blockWorld, tilePos, tilePosTarget, 25600);
            var delay = Math.min(2000, expandList.length * 10 + Math.floor(dis * 10));
            this.nextPathUpdateTick = gameData.tickId + (delay / gameData.tickDuration >> 0);
            this.lastTargetPos = v2.clone(this.target.physicsBody.getPos());
        }
    }
    if (!this.flowField) return false;

    var targetDir = [0, 0];
    v2.sub(this.target.physicsBody.getPos(), this.entity.physicsBody.getPos(), targetDir);
    v2.normalize(targetDir, targetDir);
    
    var flowFieldDir = DisField.calcTileDir(this.flowField, tilePos);
    var dir = flowFieldDir
    if (dir[0] == 0 && dir[1] == 0)
        dir = v2.clone(targetDir);
    if (dir[0] == 0 && dir[1] == 0)
        return false;

    //var diffX = dir[0];//(getDis([tilePos[0] - 1, tilePos[1]]) - getDis([tilePos[0] + 1, tilePos[1]])) / 10;
    //var diffY = dir[1];//(getDis([tilePos[0], tilePos[1] - 1]) - getDis([tilePos[0], tilePos[1] + 1])) / 10;

    //var dir = v2.create(diffX, diffY);
    //var normalized = v2.create(0, 0);
    //v2.normalize(dir, normalized);
    var tickInterval = Math.floor(40 * Math.min(1.0, dis / 40.0));
    tickInterval = Math.max(5, tickInterval);
    
    if (gameData.tickId < this.lastUpdateTickId + tickInterval)
        return true;
    this.lastUpdateTickId = gameData.tickId;
    
    var currentDir = this.entity.movement.direction;
    var attackDistance = this.getAttackDistance(tilePos, dir);
    var attackDotAngle = this.getAttackDotAngle();
    var angle = this.entity.physicsBody.angle;
    var dotAngle = v2.dot(targetDir, [Math.cos(-angle), Math.sin(-angle)]);


    if (dis < attackDistance && !this.spacebar && 1.0 - dotAngle < attackDotAngle) {// 1.0 limit for punch 
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, true, this.entity.physicsBody.getPos()));
        sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
        this.spacebar = true;
        this.moving = false;
    } else if ((dis >= attackDistance || 1.0 - dotAngle > 1.5*attackDotAngle) && this.spacebar) {
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.getPos()));
        this.spacebar = false;
    }
    if (dis < 4.0 && this.isGunner) {
        if (!this.isMoving) {
            sendCommand(new CommandEntityMove(this.entity.id, [-dir[0], -dir[1]], this.entity.physicsBody.getPos()));
            this.moving = true;
        }
    } else if (this.moving && dis < 6.0 && this.isGunner) {
        sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
        this.moving = false;
    } else if (v2.dot(dir, currentDir) < 0.9 && !this.spacebar) {
        sendCommand(new CommandEntityMove(this.entity.id, dir, this.entity.physicsBody.getPos()));
        this.moving = true;
    }
    // Look at target entity
    if (dis < 20.0 && !this.isAiming && this.isGunner) {
        sendCommand(new CommandEntityLookAtEntity(this.entity.id, this.target.id));
    } else if (dis > 20.0 && this.isAiming) {
        sendCommand(new CommandEntityLookAtEntity(this.entity.id, 0));
    }
    return true;
}

TargetPlayerBehaviour.prototype.finish = function() {
    if (this.moving)
        sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    if (this.spacebar)
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.getPos()));
    if (this.isAiming)
        sendCommand(new CommandEntityLookAtEntity(this.entity.id, 0));
    this.target = null;
    this.flowField = null;
    this.spacebar = false;
    this.moving = false;
    this.isAiming = false;
}

TargetPlayerBehaviour.prototype.destroy = function(entity) {

}

TargetPlayerBehaviour.prototype.getTarget = function() {
    var shortestDistance = Number.MAX_VALUE;
    var shortestDistanceEntity = null;
    gameData.entityWorld.objectArray.forEach(function(otherEntity) {
        if (!otherEntity.health || !otherEntity.physicsBody) return;
        if (!otherEntity.team && !otherEntity.movement) return;
        if (this.entity.team && this.entity.team.value != Teams.None && (!otherEntity.team || otherEntity.team.value == this.entity.team.value)) return;
        if (otherEntity.id == this.entity.id) return;
        
        var dis = v2.distance(this.entity.physicsBody.getPos(), otherEntity.physicsBody.getPos());
        if (dis < shortestDistance) {
            if (otherEntity.controlledByPlayer)
                dis /= 4;
            shortestDistance = dis;
            shortestDistanceEntity = otherEntity;
        }
    }.bind(this));

    if (shortestDistance <= this.maxRadius)
        return shortestDistanceEntity;
    return null;
}

TargetPlayerBehaviour.prototype.getAttackDistance = function(pos, dir) {
    if (this.entity.equippedItems.items["tool"] && this.entity.equippedItems.items["tool"].itemFunction == ItemFunctions.RangedWeapon) {
        // TODO: Raycast
        var stepLength = 0.5;
        var dis = stepLength;
        var rayPos = v2.clone(pos);
        var step = [stepLength * dir[0], stepLength * dir[1]];
        v2.add(step, rayPos, rayPos);
        for (var i = 0; i < 40; i++) {
            if (getDensity(gameData.tileWorld, rayPos[0], rayPos[1]) > 192) break;
            if (getForeground(gameData.blockWorld, rayPos[0], rayPos[1]) != 0) break;
            
            v2.add(step, rayPos, rayPos);
            dis += stepLength;
        }
        return dis;
    }
    return 2.0;
}


TargetPlayerBehaviour.prototype.getAttackDotAngle = function() {
    if (this.entity.equippedItems.items["tool"] && this.entity.equippedItems.items["tool"].itemFunction == ItemFunctions.RangedWeapon) {
        return 0.05;
    }
    return 0.5;
}
