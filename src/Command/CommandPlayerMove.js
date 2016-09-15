var PlayerMoveDirection = {
	ENABLE_UP : 0,
	ENABLE_LEFT: 1, 
	ENABLE_DOWN: 2, 
	ENABLE_RIGHT: 3,
	DISABLE_UP : 4,
	DISABLE_LEFT: 5, 
	DISABLE_DOWN: 6, 
	DISABLE_RIGHT: 7
}

var CommandPlayerMove = function(playerId, playerMoveDirection) {
	this.playerId = playerId;
	this.playerMoveDirection = playerMoveDirection;
}

CommandPlayerMove.prototype.execute = function(gameData) {
	var playerWorld = gameData.playerWorld;
	var entityWorld = gameData.entityWorld;
	if (!playerWorld || !entityWorld) {
		console.error("Missing required gameData properties");
		return;
	}

	var player = playerWorld.objects[this.playerId];
	var playerEntity = entityWorld.objects[player.entityId];
	if (!playerEntity) return;
	var movement = playerEntity.movement;
	if (!movement) return;

	switch(this.playerMoveDirection) {
	case PlayerMoveDirection.ENABLE_UP:
		movement.up = true;
		break;
	case PlayerMoveDirection.ENABLE_LEFT:
		movement.left = true;
		break;
	case PlayerMoveDirection.ENABLE_DOWN:
		movement.down = true;
		break;
	case PlayerMoveDirection.ENABLE_RIGHT:
		movement.right = true;
		break;
	case PlayerMoveDirection.DISABLE_UP:
		movement.up = false;
		break;
	case PlayerMoveDirection.DISABLE_LEFT:
		movement.left = false;
		break;
	case PlayerMoveDirection.DISABLE_DOWN:
		movement.down = false;
		break;
	case PlayerMoveDirection.DISABLE_RIGHT:
		movement.right = false;
		break;
	}

}
