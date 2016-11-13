
TargetPlayerBehaviour = function(entity, maxRadius) {
    this.entity = entity;
    this.maxRadius = maxRadius;
    this.target = null;
    this.flowField = null;
}

TargetPlayerBehaviour.prototype.canRun = function() {
    this.target = this.getTarget();
    if(this.target != null)
        return true;
    return false;
}

TargetPlayerBehaviour.prototype.run = function() {
    if(!this.target || this.target.isDead || !this.target.isActive) {
        this.target = this.getTarget();
        // If it can't find a new target we must stop this behaviour
        if(this.target == null)
            return false;
    }

    var tilePos = [Math.floor(this.entity.physicsBody.pos[0]), Math.floor(this.entity.physicsBody.pos[1])];
    var tilePosTarget = [Math.floor(this.target.physicsBody.pos[0]), Math.floor(this.target.physicsBody.pos[1])];

    //if (!this.flowField) {
    this.flowField = new Map2D();
    aStarFlowField(this.flowField, [], gameData.tileWorld, gameData.blockWorld, tilePos, tilePosTarget);
    //}

    var getPageAndIndex = (function(pos) {
        var pageX = Math.floor(pos[0] / PATH_PAGE_DIM);
        var pageY = Math.floor(pos[1] / PATH_PAGE_DIM);
        var localX = Math.floor(pos[0]) - pageX * PATH_PAGE_DIM;
        var localY = Math.floor(pos[1]) - pageY * PATH_PAGE_DIM;
        var page = this.flowField.get(pageX, pageY);
        if(!page) {
            page = new Uint16Array(PATH_PAGE_DIM * PATH_PAGE_DIM);
            page.fill(65535);
            this.flowField.set(pageX, pageY, page);
        }
        return [page, localX + localY * PATH_PAGE_DIM];
    }).bind(this);

    var getDis = (function(pos) {
        var pageAndIndex = getPageAndIndex(pos);
        var page = pageAndIndex[0];
        var index = pageAndIndex[1];
        if(page)
            return page[index];
        else
            return 65535;
    }).bind(this);

    var diffX = (getDis([tilePos[0] - 1, tilePos[1]]) - getDis([tilePos[0] + 1, tilePos[1]])) / 10;
    var diffY = (getDis([tilePos[0], tilePos[1] - 1]) - getDis([tilePos[0], tilePos[1] + 1])) / 10;

    //var diffX = this.target.physicsBody.pos[0] - this.entity.physicsBody.pos[0];
    var walkConstant = 1.0;
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

    //var diffY = this.target.physicsBody.pos[1] - this.entity.physicsBody.pos[1];
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
    /*if(dist < 1.5) // 1.0 limit for punch
        dirs.push(MoveDir.ENABLE_SPACEBAR);
    else
        dirs.push(MoveDir.DISABLE_SPACEBAR);*/

    sendCommand(new CommandEntityMove(this.entity.id, dirs, this.entity.physicsBody.pos[0], this.entity.physicsBody.pos[1]));
    if(dist > this.maxRadius)
        return false;
    return true;
}

TargetPlayerBehaviour.prototype.finish = function() {
    this.target = null;
    // Disable all keys
    if(!this.entity.isDead)
        sendCommand(new CommandEntityMove(this.entity.id, [5, 6, 7, 8, 9], this.entity.physicsBody.pos[0], this.entity.physicsBody.pos[1]));
}

TargetPlayerBehaviour.prototype.getTarget = function() {
    var shortestDistance = Number.MAX_VALUE;
    var shortestDistanceEntity = null;
    gameData.playerWorld.objectArray.forEach(function(otherPlayer) {
        if(otherPlayer.entityId == -1) return;
        var otherEntity = gameData.entityWorld.objects[otherPlayer.entityId];
        if(!otherEntity || otherEntity.isDead || !otherEntity.isActive) return;
        if(this.entity.id != otherEntity.id && otherEntity.physicsBody && otherEntity.health) {
            var dist = v2.distance(this.entity.physicsBody.pos, otherEntity.physicsBody.pos);
            if(dist < shortestDistance) {
                shortestDistance = dist;
                shortestDistanceEntity = otherEntity;
            }
        }
    }.bind(this));
    if(shortestDistance <= this.maxRadius)
        return shortestDistanceEntity;
    return null;
}
