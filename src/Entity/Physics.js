PHYSICS_MAX_STEP_LENGTH = 0.5;

PhysicsBody = function(pos, damping) {
    this.pos = v2.clone(pos);
    this.posOld = v2.clone(pos);
    this.speed = v2.create(0, 0);
    this.speedOld = v2.clone(this.speed);
    this.damping = toFix(damping);
}

/*function physicsBodySimulate(tileWorld, physicsBody, dt) {
    v2.copy(physicsBody.pos, physicsBody.posOld);
    v2.copy(physicsBody.speed, physicsBody.speedOld);
    var deltaPos = v2.create(0, 0);
    v2.mul(dt, physicsBody.speed, deltaPos);
    v2.add(deltaPos, physicsBody.pos, physicsBody.pos);
    v2.mul(fix.pow(physicsBody.damping, dt), physicsBody.speed, physicsBody.speed);
}*/

function physicsBodySimulate(tileWorld, physicsBody, dt) {
    v2.copy(physicsBody.pos, physicsBody.posOld);
    v2.copy(physicsBody.speed, physicsBody.speedOld);
    var deltaPos = v2.create(0, 0);
    v2.mul(dt, physicsBody.speed, deltaPos);
    var deltaPosLength = v2.length(deltaPos);
    var numSteps = Math.ceil(deltaPosLength / PHYSICS_MAX_STEP_LENGTH);
    v2.div(deltaPos, numSteps, deltaPos);
    deltaPosLength /= numSteps;
    v2.mul(fix.pow(physicsBody.damping, dt), physicsBody.speed, physicsBody.speed);
    var newPos = v2.create(0, 0);
    for (i = 0; i < numSteps; i++) {
        v2.add(deltaPos, physicsBody.pos, newPos);
        var density = calcDensity(tileWorld, newPos[0], newPos[1]);
        console.log("Density: " + density);
        if (density > 255) {
            break;
        }
        v2.copy(newPos, physicsBody.pos);
    }
}

function entityFunctionPhysicsBodySimulate(gameData, dt) {
    var entityWorld = gameData.entityWorld;
    var tileWorld = gameData.tileWorld;
    if (!entityWorld || !tileWorld)
        console.error("Missing gameData properties");
    entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody)
            physicsBodySimulate(tileWorld, entity.physicsBody, dt);
    });
}