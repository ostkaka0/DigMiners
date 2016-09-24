PlayerMoveDirection = {
    ENABLE_UP: 0,
    ENABLE_LEFT: 1,
    ENABLE_DOWN: 2,
    ENABLE_RIGHT: 3,
    ENABLE_SPACEBAR: 4,
    DISABLE_UP: 5,
    DISABLE_LEFT: 6,
    DISABLE_DOWN: 7,
    DISABLE_RIGHT: 8,
    DISABLE_SPACEBAR: 9
}

CommandPlayerMove = function (entityId, playerMoveDirection) {
    this.entityId = entityId;
    this.playerMoveDirection = playerMoveDirection;
}

CommandPlayerMove.prototype.execute = function (gameData) {
    var playerWorld = gameData.playerWorld;
    var entityWorld = gameData.entityWorld;
    if (!playerWorld || !entityWorld) {
        console.error("Missing required gameData properties");
        return;
    }

    var player = playerWorld.objects[this.entityId];
    if (!player) return;
    var playerEntity = entityWorld.objects[player.entityId];
    if (!playerEntity) return;
    var movement = playerEntity.movement;
    if (!movement) return;

    switch (this.playerMoveDirection) {
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
        case PlayerMoveDirection.ENABLE_SPACEBAR:
            movement.spacebar = true;
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
        case PlayerMoveDirection.DISABLE_SPACEBAR:
            movement.spacebar = false;
            break;
    }
}

CommandPlayerMove.prototype.getName = function () {
    return "CommandPlayerMove";
}

CommandPlayerMove.prototype.getData = function () {
    return [this.entityId, this.playerMoveDirection];
}

CommandPlayerMove.prototype.serialize = function (byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index += 4, this.playerMoveDirection);
}

CommandPlayerMove.prototype.deserialize = function (byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.playerMoveDirection = deserializeInt32(byteArray, index += 4);
}

CommandPlayerMove.prototype.getSerializationSize = function () {
    return 8;
}
