

WalkToEnemyBehaviour = function(entity, maxRadius) {
    this.entity = entity;
    this.maxRadius = maxRadius;
    this.target = null;
    this.nextUpdateTickId = gameData.world.tickId;
    this.moving = false;
    this.nextCanRunTickId = gameData.world.tickId;
}
export default WalkToEnemyBehaviour;

WalkToEnemyBehaviour.prototype.canRun = function() {
    if (gameData.world.tickId < this.nextCanRunTickId)
        return false;
    this.nextCanRunTickId = gameData.world.tickId + 40 + 40 * Math.random() >> 0;
    this.target = this.getTarget();
    if (this.target == null)
        return false;
    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());
    if (dis >= this.maxRadius)
        return false;
    return true;
}

WalkToEnemyBehaviour.prototype.initialize = function() {
}

WalkToEnemyBehaviour.prototype.run = function() {
    if (gameData.world.tickId < this.nextUpdateTickId) return true;
    this.nextUpdateTickId = gameData.world.tickId + 20;

    if (!this.target || this.target.isDead || !this.target.isActive) {
        this.target = this.getTarget();
        // If it can't find a new target we must stop this behaviour
        if (this.target == null)
            return false;
    }

    var dis = v2.distance(this.entity.physicsBody.getPos(), this.target.physicsBody.getPos());
    if (dis > this.maxRadius)
        return false;


    var currentDir = this.entity.movement.direction;
    var dir = [0, 0];
    v2.sub(this.target.physicsBody.getPos(), this.entity.physicsBody.getPos(), dir);
    v2.normalize(dir, dir);
    if (dir[0] == 0 && dir[1] == 0)
        return false;

    if (v2.dot(dir, currentDir) < 0.9 && !this.spacebar) {
        sendCommand(new CommandEntityMove(this.entity.id, dir, this.entity.physicsBody.getPos()));
        this.moving = true;
    }
    return true;
}

WalkToEnemyBehaviour.prototype.finish = function() {
    if (this.moving)
        sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    this.target = null;
    this.moving = false;
}

WalkToEnemyBehaviour.prototype.destroy = function(entity) {

}

WalkToEnemyBehaviour.prototype.getTarget = function() {
    var shortestDistance = Number.MAX_VALUE;
    var shortestDistanceEntity = null;
    gameData.world.entityWorld.objectArray.forEach(function(otherEntity) {
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
