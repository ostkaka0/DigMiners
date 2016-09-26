Movement = function(speed) {
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
    this.spacebar = false;
    this.speed = speed;
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
        var deltaSpeed = v2.create(0, 0);
        if(entity.movement.up) deltaSpeed[1] += 1.0;
        if(entity.movement.down) deltaSpeed[1] -= 1.0;
        if(entity.movement.left) deltaSpeed[0] -= 1.0;
        if(entity.movement.right) deltaSpeed[0] += 1.0;
        var normalized = v2.create(0, 0);
        v2.normalize(deltaSpeed, normalized);
        v2.mul(entity.movement.speed, normalized, normalized);
        v2.mul(dt, normalized, normalized);
        v2.add(normalized, entity.physicsBody.speed, entity.physicsBody.speed);

        var moveDir = entity.movement.getV2Dir();
        if(moveDir[0] != 0 || moveDir[1] != 0)
            entity.physicsBody.rotateTo(Math.atan2(-moveDir[1], moveDir[0]), entity.physicsBody.rotationSpeed, dt);

        if(entity.drawable) {
            if(entity.movement.spacebar)
                entity.drawable.animate("body", "dig", 250, false);
            else
                entity.drawable.unanimate("body", "dig", true);
        }
    }
}