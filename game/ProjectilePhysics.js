PROJECTILE_MAX_STEP_LENGTH = 0.125;

entityFunctionProjectileSimulate = function(gameData, dt) {
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.projectile)
            projectileEntitySimulate(gameData, entity, dt);
    });
}

projectileEntitySimulate = function(gameData, entity, dt) {
    var projectile = entity.projectile;
    if (!projectile || projectile.hit) return;

    // Simulate projectile
    var dir = v2.create(Math.cos(entity.projectile.angle), -Math.sin(entity.projectile.angle));
    var toAdd = v2.create(0, 0);
    v2.mul(projectile.projectileType.speed, dir, toAdd);
    v2.add(projectile.pos, toAdd, projectile.pos);

    // Check projectile collision
    var pos = v2.clone(projectile.pos);
    var deltaPos = v2.create(0, 0);
    v2.sub(pos, projectile.posOld, deltaPos);
    var deltaPosLength = v2.lengthSquared(deltaPos);
    var numSteps = Math.ceil(deltaPosLength / PROJECTILE_MAX_STEP_LENGTH);
    v2.div(deltaPos, numSteps, deltaPos);
    deltaPosLength /= numSteps;
    pos = v2.clone(projectile.posOld);
    // Simulate steps
    for (var i = 0; i < numSteps; i++) {
        v2.add(deltaPos, pos, pos);

        var blockTilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
        var blockId = getForeground(gameData.blockWorld, blockTilePos[0], blockTilePos[1]);
        if (blockId != 0) {
            gameData.eventHandler.trigger("projectileHitBlock", entity, blockTilePos);
            projectile.hit = true;
            break;
        }
        var density = getDensity(gameData.tileWorld, blockTilePos[0], blockTilePos[1]);
        if (density > 128) {
            gameData.eventHandler.trigger("projectileHitTile", entity, blockTilePos);
            projectile.hit = true;
            break;
        }
        var bodies = [];
        var bodyDistances = [];
        gameData.physicsWorld.getBodiesInRadiusSorted(bodies, bodyDistances, pos, 2.0);
        for (var j = 0; j < bodies.length; ++j) {
            if (bodyDistances[j] < 0.9) {
                var hitEntity = gameData.physicsEntities[bodies[j]];
                if (!projectile.shooterEntityId || hitEntity.id != projectile.shooterEntityId) {
                    gameData.eventHandler.trigger("projectileHitEntity", entity, hitEntity);
                    projectile.hit = true;
                    break;
                }
            }
        }
        if (projectile.hit)
            break;
    }

    if (projectile.hit)
        gameData.eventHandler.trigger("projectileHit", entity);

    projectile.pos = pos;
    v2.copy(pos, projectile.posOld);
}