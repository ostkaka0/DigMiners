EntityMoveDirection = {
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

CommandEntityMove = function(entityId, moveDirection, x, y) {
    this.entityId = entityId;
    this.moveDirection = moveDirection;
    this.x = x;
    this.y = y;
}

CommandEntityMove.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(!entity) return;
    var movement = entity.movement;
    if(!movement) return;
    var physicsBody = entity.physicsBody;
    if(!physicsBody) return;

    switch(this.moveDirection) {
        case EntityMoveDirection.ENABLE_UP:
            movement.up = true;
            break;
        case EntityMoveDirection.ENABLE_LEFT:
            movement.left = true;
            break;
        case EntityMoveDirection.ENABLE_DOWN:
            movement.down = true;
            break;
        case EntityMoveDirection.ENABLE_RIGHT:
            movement.right = true;
            break;
        case EntityMoveDirection.ENABLE_SPACEBAR:
            movement.spacebar = true;
            break;
        case EntityMoveDirection.DISABLE_UP:
            movement.up = false;
            break;
        case EntityMoveDirection.DISABLE_LEFT:
            movement.left = false;
            break;
        case EntityMoveDirection.DISABLE_DOWN:
            movement.down = false;
            break;
        case EntityMoveDirection.DISABLE_RIGHT:
            movement.right = false;
            break;
        case EntityMoveDirection.DISABLE_SPACEBAR:
            movement.spacebar = false;
            break;
    }

    physicsBody.setPos([this.x, this.y]);

    console.log(this.entityId + " move: " + this.moveDirection);
}

CommandEntityMove.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.moveDirection);
    serializeFix(byteArray, index, this.x);
    serializeFix(byteArray, index, this.y);
}

CommandEntityMove.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.moveDirection = deserializeInt32(byteArray, index);
    this.x = deserializeFix(byteArray, index);
    this.y = deserializeFix(byteArray, index);
}

CommandEntityMove.prototype.getSerializationSize = function() {
    return 16;
}
