
TargetPlayerBehaviour = function(entity, maxRadius) {
    this.entity = entity;
    this.maxRadius = maxRadius;
    this.target = null;
    this.flowField = new Map2D();
    this.nextUpdateTick = gameData.tickId;
    this.lastTargetPos = null;
}

TargetPlayerBehaviour.prototype.canRun = function() {
    this.target = this.getTarget();
    if (this.target == null)
        return false;
    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());
    if (dis >= this.maxRadius)
        return false;
    return true;
}

TargetPlayerBehaviour.prototype.initialize = function() {

}

TargetPlayerBehaviour.prototype.run = function() {
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
    if (gameData.tickId >= this.nextUpdateTick) {
        if (!this.lastTargetPos || !this.flowField || v2.sqrDistance(this.lastTargetPos, this.target.physicsBody.getPos()) > v2.sqrDistance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos())) {
            this.flowField = new Map2D();
            var expandList = [];
            aStarFlowField(this.flowField, expandList, gameData.tileWorld, gameData.blockWorld, tilePos, tilePosTarget, 2560);
            var delay = Math.min(2000, expandList.length * 10);
            this.nextUpdateTick = gameData.tickId + (delay / gameData.tickDuration >> 0);
            this.lastTargetPos = v2.clone(this.target.physicsBody.getPos());
        }
    }
    if (!this.flowField) return false;

    var dir = DisField.calcTileDir(this.flowField, tilePos);
    if (dir[0] == 0 && dir[1] == 0) {
        v2.sub(this.target.physicsBody.getPos(), this.entity.physicsBody.getPos(), dir);
        v2.normalize(dir, dir);
    }
    if (dir[0] == 0 && dir[1] == 0)
        return false;

    //var diffX = dir[0];//(getDis([tilePos[0] - 1, tilePos[1]]) - getDis([tilePos[0] + 1, tilePos[1]])) / 10;
    //var diffY = dir[1];//(getDis([tilePos[0], tilePos[1] - 1]) - getDis([tilePos[0], tilePos[1] + 1])) / 10;

    //var dir = v2.create(diffX, diffY);
    //var normalized = v2.create(0, 0);
    //v2.normalize(dir, normalized);

    var attackDistance = this.getAttackDistance();

    if (dis < attackDistance && !this.spacebar) {// 1.0 limit for punch 
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, true, this.entity.physicsBody.getPos()));
        this.spacebar = true;
    } else if (dis >= attackDistance && this.spacebar) {
        sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.getPos()));
        this.spacebar = false;
    }

    var currentDir = this.entity.movement.direction;
    if (dir[0] != currentDir[0] || dir[1] != currentDir[1])
        sendCommand(new CommandEntityMove(this.entity.id, dir, this.entity.physicsBody.getPos()));
    return true;
}

TargetPlayerBehaviour.prototype.finish = function() {
    sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    this.target = null;
    this.flowField = null;
}

TargetPlayerBehaviour.prototype.destroy = function(entity) {

}

TargetPlayerBehaviour.prototype.getTarget = function() {
    var shortestDistance = Number.MAX_VALUE;
    var shortestDistanceEntity = null;
    gameData.playerWorld.objectArray.forEach(function(otherPlayer) {
        if (otherPlayer.entityId == -1) return;
        var otherEntity = gameData.entityWorld.objects[otherPlayer.entityId];
        if (!otherEntity || otherEntity.isDead || !otherEntity.isActive) return;
        if (this.entity.id != otherEntity.id && otherEntity.physicsBody && otherEntity.health) {
            var dis = v2.distance(this.entity.physicsBody.getPos(), otherEntity.physicsBody.getPos());
            if (dis < shortestDistance) {
                shortestDistance = dis;
                shortestDistanceEntity = otherEntity;
            }
        }
    }.bind(this));
    if (shortestDistance <= this.maxRadius)
        return shortestDistanceEntity;
    return null;
}

TargetPlayerBehaviour.prototype.getAttackDistance = function() {
    if (this.entity.equippedItems.items["tool"].itemFunction == ItemFunctions.RangedWeapon) {
        // TODO: Raycast
        return 10.0;
    }
    return 2.0;
}
