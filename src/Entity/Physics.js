PhysicsBody = function(pos, damping) {
	this.pos = v2.clone(pos);
	this.posOld = v2.clone(pos);
	this.speed = v2.create(0, 0);
	this.speedOld = v2.clone(this.speed);
	this.damping = toFix(damping);
}

function physicsBodySimulate(physicsBody, dt) {
	v2.copy(physicsBody.pos, physicsBody.posOld);
	v2.copy(physicsBody.speed, physicsBody.speedOld);
	var deltaPos = v2.create(0, 0);
	v2.mul(dt, physicsBody.speed, deltaPos);
	v2.add(deltaPos, physicsBody.pos, physicsBody.pos);
	v2.mul(fix.pow(physicsBody.damping, dt), physicsBody.speed, physicsBody.speed);
}

function entityFunctionPhysicsBodySimulate(gameData, dt) {
	var entityWorld = gameData.entityWorld;
	if (!entityWorld)
		console.error("Missing gameData.entityWorld");
	entityWorld.objectArray.forEach(function(entity) {
		if (entity.physicsBody)
			physicsBodySimulate(entity.physicsBody, dt);
	});
}