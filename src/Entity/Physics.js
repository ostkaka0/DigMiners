PHYSICS_MAX_STEP_LENGTH = 0.5;

PhysicsBody = function(pos, damping) {
    if(pos) {
        this.pos = v2.clone(pos);
        this.posOld = v2.clone(pos);
    }
    this.speed = v2.create(0, 0);
    this.speedOld = v2.clone(this.speed);
    if(damping)
        this.damping = toFix(damping);
    this.angle = 0;
    this.angleOld = 0;
    this.rotationSpeed = toFix(10.0);
}

PhysicsBody.prototype.name = "physicsBody";

PhysicsBody.prototype.serialize = function(byteArray, index) {
    serializeV2(byteArray, index, this.pos);
    serializeV2(byteArray, index, this.speed);
    serializeFix(byteArray, index, this.angle);
    serializeFix(byteArray, index, this.rotationSpeed);
    serializeFix(byteArray, index, this.damping);
}

PhysicsBody.prototype.deserialize = function(byteArray, index) {
    this.pos = deserializeV2(byteArray, index);
    this.posOld = v2.clone(this.pos);
    this.speed = deserializeV2(byteArray, index);
    this.speedOld = v2.clone(this.speed);
    this.angle = deserializeFix(byteArray, index);
    this.angleOld = this.angle;
    this.rotationSpeed = deserializeFix(byteArray, index);
    this.damping = deserializeFix(byteArray, index);
}

PhysicsBody.prototype.getSerializationSize = function() {
    return 24;
}

physicsBodySimulate = function(tileWorld, physicsBody, dt) {
    // Update posOld, speedOld
    v2.copy(physicsBody.pos, physicsBody.posOld);
    v2.copy(physicsBody.speed, physicsBody.speedOld);
    // Calculate deltaPos and number of steps
    var deltaPos = v2.create(0, 0);
    v2.mul(dt, physicsBody.speed, deltaPos);
    var deltaPosLength = v2.length(deltaPos);
    var numSteps = Math.ceil(deltaPosLength / PHYSICS_MAX_STEP_LENGTH);
    v2.div(deltaPos, numSteps, deltaPos);
    deltaPosLength /= numSteps;
    v2.mul(fix.pow(physicsBody.damping, dt), physicsBody.speed, physicsBody.speed);
    var newPos = v2.create(0, 0);
    // Simulate steps
    for(i = 0; i < numSteps; i++) {
        v2.add(deltaPos, physicsBody.pos, newPos);
        var density = calcDensity(tileWorld, newPos[0], newPos[1]);
        if(density > 0) {
            var dir = calcDir(tileWorld, newPos[0], newPos[1])
            v2.div(dir, 2.0, dir);
            v2.add(newPos, dir, newPos);
            var normal = v2.create(0, 0);
            v2.normalize(dir, normal);
            if(normal[0] || normal[1]) {
                var dot = v2.dot(normal, physicsBody.speed);
                var deltaSpeed = [0, 0];
                v2.mul(-dot, normal, deltaSpeed);
                deltaPos = [(1.0 - Math.abs(normal[0])) * deltaPos[0], (1.0 - Math.abs(normal[1])) * deltaPos[1]];
                v2.add(deltaSpeed, physicsBody.speed, physicsBody.speed);//physicsBody.speed = [(1.0 - Math.abs(normal[0])) * physicsBody.speed[0], (1.0 - Math.abs(normal[1])) * physicsBody.speed[1]];
            }
        }
        v2.copy(newPos, physicsBody.pos);
    }
}

entityFunctionPhysicsBodySimulate = function(gameData, dt) {
    var entityWorld = gameData.entityWorld;
    var tileWorld = gameData.tileWorld;
    if(!entityWorld || !tileWorld)
        console.error("Missing gameData properties");
    entityWorld.objectArray.forEach(function(entity) {
        if(entity.physicsBody)
            physicsBodySimulate(tileWorld, entity.physicsBody, dt);
    });
}

PhysicsBody.prototype.rotateTo = function(angle, speed, dt) {
    if(this.angle == angle)
        return;

    var newDirx = Math.cos(angle);
    var newDiry = Math.sin(angle);
    var oldDirx = Math.cos(this.angle);
    var oldDiry = Math.sin(this.angle);
    oldDirx += (newDirx - oldDirx) * speed * dt;
    oldDiry += (newDiry - oldDiry) * speed * dt;
    this.angle = Math.atan2(oldDiry, oldDirx);
}

angleLerp = function(from, to, factor) {
    if(from == to)
        return;

    var newDirx = Math.cos(from);
    var newDiry = Math.sin(from);
    var oldDirx = Math.cos(to);
    var oldDiry = Math.sin(to);
    oldDirx += (newDirx - oldDirx) * factor;
    oldDiry += (newDiry - oldDiry) * factor;
    return Math.atan2(oldDiry, oldDirx);
}
