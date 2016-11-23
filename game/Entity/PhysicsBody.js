
PhysicsBody = function(pos, damping) {
    this.bodyId = gameData.physicsWorld.add(pos);
    if (pos) {
        this.posOld = v2.clone(pos);
        this.posClient = v2.clone(pos);
        this.posClientOld = v2.clone(pos);
    }
    else {
        this.posOld = [0, 0];
        this.posClient = [0, 0];
        this.posClientOld = [0, 0];
    }
    this.speedOld = [0, 0];
    if (damping)
        this.damping = toFix(damping);
    this.angle = 0;
    this.angleOld = 0;
    this.rotationSpeed = toFix(10.0);

}

PhysicsBody.prototype.name = physicsBody.name; function physicsBody() { };

PhysicsBody.prototype.serialize = function(byteArray, index) {
    serializeV2(byteArray, index, this.getPos());
    serializeV2(byteArray, index, this.getVelocity());
    serializeFix(byteArray, index, this.angle);
    serializeFix(byteArray, index, this.rotationSpeed);
    serializeFix(byteArray, index, this.damping);
}

PhysicsBody.prototype.deserialize = function(byteArray, index) {
    this.setPos(deserializeV2(byteArray, index));
    this.posOld = v2.clone(this.getPos());
    this.setVelocity(deserializeV2(byteArray, index));
    this.speedOld = v2.clone(this.getVelocity());
    this.angle = deserializeFix(byteArray, index);
    this.angleOld = this.angle;
    this.rotationSpeed = deserializeFix(byteArray, index);
    this.damping = deserializeFix(byteArray, index);

    this.posClient = v2.clone(this.getPos());
    this.posClientOld = v2.clone(this.getPos());
}

PhysicsBody.prototype.getSerializationSize = function() {
    return 28;
}

PhysicsBody.prototype.destroy = function(entity) {
    gameData.physicsWorld.remove(this.bodyId);
}

PhysicsBody.prototype.getPos = function() { return gameData.physicsWorld.getPos(this.bodyId); }
PhysicsBody.prototype.setPos = function(pos) { gameData.physicsWorld.setPos(this.bodyId, pos); }
PhysicsBody.prototype.getVelocity = function() { return gameData.physicsWorld.getVelocity(this.bodyId); }
PhysicsBody.prototype.setVelocity = function(velocity) { gameData.physicsWorld.setVelocity(this.bodyId, velocity); }

PhysicsBody.prototype.rotateTo = function(angle, speed, dt) {
    if (this.angle == angle)
        return;

    var newDirx = Math.cos(angle);
    var newDiry = Math.sin(angle);
    var oldDirx = Math.cos(this.angle);
    var oldDiry = Math.sin(this.angle);
    oldDirx += (newDirx - oldDirx) * speed * dt;
    oldDiry += (newDiry - oldDiry) * speed * dt;
    this.angle = Math.atan2(oldDiry, oldDirx);
}