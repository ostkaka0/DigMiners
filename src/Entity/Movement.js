Movement = function(speed) {
	this.up = false;
	this.left = false;
	this.down = false;
	this.right = false;
	this.speed = speed;
}

function entityFunctionPlayerMovement(gameData, dt) {
	var playerWorld = gameData.playerWorld;
	var entityWorld = gameData.entityWorld;
	if (!playerWorld ||!entityWorld)
		console.error("Missing gameData properties");
	var numPlayers = playerWorld.objectArray.length;
	for (var i = 0; i < numPlayers; ++i) {
		var player = playerWorld.objectArray[i];
		if (!player.entityId)
			continue;
		var entity = entityWorld.objects[player.entityId];
		if (!entity || !entity.movement || !entity.physicsBody)
			continue;
		var deltaSpeed = v2.create(0, 0);
		if (entity.movement.up)    deltaSpeed[1] += entity.movement.speed;
		if (entity.movement.down)  deltaSpeed[1] -= entity.movement.speed;
		if (entity.movement.left)  deltaSpeed[0] -= entity.movement.speed;
		if (entity.movement.right) deltaSpeed[0] += entity.movement.speed;
		v2.mul(dt, deltaSpeed, deltaSpeed);
		v2.add(deltaSpeed, entity.physicsBody.speed, entity.physicsBody.speed);
	}
}