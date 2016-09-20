PhysicsBody = function(pos, damping) {
	this.pos = v2.clone(pos);
	this.posOld = v2.clone(pos);
	this.speed = v2.create(0, 0);
	this.speedOld = v2.clone(this.speed);
	this.damping = toFix(damping);
	this.angle = 0;
	this.angleOld = 0;
	this.rotationSpeed = 10.0;
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
	//console.log("angle " + this.angle);
}

function physicsBodySimulate(physicsBody, dt) {
	v2.copy(physicsBody.pos, physicsBody.posOld);
	v2.copy(physicsBody.speed, physicsBody.speedOld);
	var deltaPos = v2.create(0, 0);
	v2.mul(dt, physicsBody.speed, deltaPos);
	v2.add(deltaPos, physicsBody.pos, physicsBody.pos);
	v2.mul(fix.pow(physicsBody.damping, dt), physicsBody.speed, physicsBody.speed);
	physicsBody.rotateTo(Math.atan2(-physicsBody.speed[1], physicsBody.speed[0]), physicsBody.rotationSpeed, dt);
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

function angleLerp(from, to, factor) {
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