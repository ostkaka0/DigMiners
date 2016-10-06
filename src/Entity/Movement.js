Movement = function(speed, digDuration) {
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
    this.spacebar = false;
    this.speed = speed;
    // The number of ticks until next dig. Will decrease by 1 each tick. Player can only dig at 0. Only used by server
    this.digTickTimeout = 0;
    this.digDuration = digDuration || 0.25; // Seconds between each dig
    this.digMovementSpeed = 0.65;
    this.mineMovementSpeed = 0.05;
    this.isDigging = false;
    this.isMining = false;
}

Movement.prototype.name = "movement";

Movement.prototype.calcDigTickDuration = function(dt) {
    return Math.round(1000.0 * this.digDuration / dt);
}

Movement.prototype.getV2Dir = function() {
    var pos = v2.create(0, 0);
    if(this.up && !this.down)
        pos[1] += 1.0;
    else if(this.down && !this.up)
        pos[1] -= 1.0;
    if(this.right && !this.left)
        pos[0] += 1.0;
    else if(this.left && !this.right)
        pos[0] -= 1.0;
    return pos;
}

Movement.prototype.serialize = function(byteArray, index) {
    var bitField = (this.up ? 1 : 0) | (this.left ? 2 : 0) | (this.down ? 4 : 0) | (this.right ? 8 : 0) | (this.spacebar ? 16 : 0);
    serializeInt8(byteArray, index, bitField);
    serializeFix(byteArray, index, this.speed);
}

Movement.prototype.deserialize = function(byteArray, index) {
    var bitField = deserializeInt8(byteArray, index);
    this.speed = deserializeFix(byteArray, index);

    this.up = (bitField & 1 != 0);
    this.left = (bitField & 2 != 0);
    this.down = (bitField & 4 != 0);
    this.right = (bitField & 8 != 0);
    this.spacebar = (bitField & 16 != 0);
}

Movement.prototype.getSerializationSize = function() {
    return 5;
}

entityFunctionPlayerMovement = function(gameData, dt) {
    var playerWorld = gameData.playerWorld;
    var entityWorld = gameData.entityWorld;

    if(!playerWorld || !entityWorld)
        console.error("Missing gameData properties");
    var numPlayers = playerWorld.objectArray.length;
    for(var i = 0; i < numPlayers; ++i) {
        var player = playerWorld.objectArray[i];
        if(!player.entityId)
            continue;
        var entity = entityWorld.objects[player.entityId];
        if(!entity || !entity.movement || !entity.physicsBody)
            continue;

        // Movement:
        var deltaSpeed = v2.create(0, 0);
        if(entity.movement.up) deltaSpeed[1] += 1.0;
        if(entity.movement.down) deltaSpeed[1] -= 1.0;
        if(entity.movement.left) deltaSpeed[0] -= 1.0;
        if(entity.movement.right) deltaSpeed[0] += 1.0;
        var normalized = v2.create(0, 0);
        v2.normalize(deltaSpeed, normalized);
        v2.mul(entity.movement.speed, normalized, normalized);
        // Slow down at dig:
        if(entity.movement.isMining)
            v2.mul(entity.movement.mineMovementSpeed, normalized, normalized);
        else if(entity.movement.isDigging)
            v2.mul(entity.movement.digMovementSpeed, normalized, normalized);
        v2.mul(dt, normalized, normalized);
        v2.add(normalized, entity.physicsBody.speed, entity.physicsBody.speed);

        var moveDir = entity.movement.getV2Dir();
        if(moveDir[0] != 0 || moveDir[1] != 0)
            entity.physicsBody.rotateTo(Math.atan2(-moveDir[1], moveDir[0]), entity.physicsBody.rotationSpeed, dt);

        // Dig update:
        entity.movement.digTickTimeout = (entity.movement.digTickTimeout <= 0) ? 0 : entity.movement.digTickTimeout - 1;
        // Reset dig state
        if(entity.movement.digTickTimeout == 0) {
            entity.movement.isDigging = false;
            entity.movement.isMining = false;
            if(entity.drawable.bodyparts["rightArm"])
                entity.drawable.bodyparts["rightArm"].finishCycle();
        }
    }
}
