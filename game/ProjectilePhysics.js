PROJECTILE_MAX_STEP_LENGTH = 0.125;

entityFunctionProjectileSimulate = function(dt) {
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.projectile)
            projectileEntitySimulate(entity, dt);
    });
}

projectileEntitySimulate = function(entity, dt) {
    var projectile = entity.projectile;
    if (!projectile || projectile.hit) return;

    // Simulate projectile
    var dir = v2.create(Math.cos(entity.projectile.angle), -Math.sin(entity.projectile.angle));
    var toAdd = v2.create(0, 0);
    v2.mul(projectile.speed * dt, dir, toAdd);
    v2.add(projectile.pos, toAdd, projectile.pos);

    // Check projectile collision
    var pos = v2.clone(projectile.pos);
    var deltaPos = v2.create(0, 0);
    v2.sub(pos, projectile.posOld, deltaPos);
    var deltaPosLength = v2.length(deltaPos);
    var numSteps = Math.ceil(deltaPosLength / PROJECTILE_MAX_STEP_LENGTH);
    v2.div(deltaPos, numSteps, deltaPos);
    deltaPosLength /= numSteps;
    pos = v2.clone(projectile.posOld);
    // Simulate steps
    for (var i = 0; i < numSteps; i++) {
        v2.add(deltaPos, pos, pos);
        
        var distance = v2.distance(projectile.startPos, projectile.pos);

        if (distance > projectile.maxDistance) {
            projectile.hit = true;
            break;
        }
        
        var bodies = [];
        var bodyDistances = [];
        gameData.physicsWorld.getBodiesInRadiusSorted(bodies, bodyDistances, pos, projectile.projectileType.radius);
        for (var j = 0; j < bodies.length; ++j) {
            var hitEntity = gameData.physicsEntities[bodies[j]];
            if (hitEntity && (!projectile.shooterEntityId || hitEntity.id != projectile.shooterEntityId)) {
                gameData.events.trigger("projectileHitEntity", entity, hitEntity);
                projectile.hit = true;
                break;
            }
        }

        var blockTilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
        var blockId = getForeground(gameData.blockWorld, blockTilePos[0], blockTilePos[1]);
        var blockType = gameData.blockRegister[blockId];
        var isBulletSolid = (blockType.isBulletSolid == undefined || entity.projectile.projectileType.isExplosive) ? blockType.isSolid : blockType.isBulletSolid;
        if (blockId != 0 && isBulletSolid && v2.dot([Math.cos(projectile.angle), -Math.sin(projectile.angle)], [blockTilePos[0] + 0.5 - pos[0], blockTilePos[1] + 0.5 - pos[1]]) > 0.0) {
            gameData.events.trigger("projectileHitBlock", entity, blockTilePos);
            projectile.hit = true;
            break;
        }
        if (blockType.bulletFunction)
            blockType.bulletFunction(blockTilePos, blockType, entity);

        var density = getDensity(gameData.tileWorld, blockTilePos[0], blockTilePos[1]);
        if (density > 127) {
            gameData.events.trigger("projectileHitTile", entity, blockTilePos);
            projectile.hit = true;
            break;
        }

        if (projectile.hit)
            break;
    }

    if (projectile.hit) {
        gameData.events.trigger("projectileHit", entity, v2.clone(pos));
        if (!isServer)
            projectile.sprite.anchor.x = 1.0;
    }

    projectile.pos = pos;
    v2.copy(pos, projectile.posOld);
}
