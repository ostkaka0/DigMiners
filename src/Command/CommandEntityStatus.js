
CommandEntityStatus = function (entityId, physicsBody) {
    this.entityId = entityId;
    //TODO: PROPER CLONE
    var physicsBodyClone = JSON.parse(JSON.stringify(physicsBody));
    this.physicsBody = physicsBodyClone;
}

CommandEntityStatus.prototype.execute = function (gameData) {
    var entityWorld = gameData.entityWorld;
    if (!entityWorld) {
        console.error("Missing required gameData properties");
        return;
    }

    var entity = entityWorld.objects[this.entityId];
    if (!entity) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    console.dir(this.physicsBody);
    physicsBody.pos = this.physicsBody.pos;
    console.log("set " + this.entityId + " pos to " + physicsBody.pos);
    physicsBody.posOld = this.physicsBody.posOld;
    physicsBody.speed = this.physicsBody.speed;
    physicsBody.speedOld = this.physicsBody.speedOld;
    physicsBody.damping = this.physicsBody.damping;
    physicsBody.angle = this.physicsBody.angle;
    physicsBody.angleOld = this.physicsBody.angleOld;
    physicsBody.rotationSpeed = this.physicsBody.rotationSpeed;
}

CommandEntityStatus.prototype.getName = function () {
    return "CommandEntityStatus";
}

CommandEntityStatus.prototype.getData = function () {
    return [this.entityId, this.physicsBody];
}
