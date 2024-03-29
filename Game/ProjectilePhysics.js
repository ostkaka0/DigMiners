









var PROJECTILE_MAX_STEP_LENGTH = 0.125;

global.entityFunctionProjectileSimulate = function(dt) {
    World.entities.objectArray.forEach(function(entity) {
        if (entity.projectile)
            projectileEntitySimulate(entity, dt);
    });
}

global.projectileEntitySimulate = function(entity, dt) {
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
        if (distance < 0.25) continue;

        if (distance > projectile.maxDistance) {
            projectile.hit = true;
            break;
        }

        var bodies = [];
        var bodyDistances = [];
        World.physics.getBodiesInRadiusSorted(bodies, bodyDistances, pos, 0.0);//projectile.projectileType.radius);
        for (var j = 0; j < bodies.length; ++j) {
            var hitEntity = World.physicsEntityMap[bodies[j]];
            var radius = World.physics.getRadius(bodies[j]);
            var mass = World.physics.getMass(bodies[j]);
            if (!hitEntity || (projectile.shooterEntityId && hitEntity.id == projectile.shooterEntityId)) continue;
            if (radius <= 0 || mass <= 0) continue;
            Event.trigger(EntityProjectile.Events.onHitEntity, entity, hitEntity, pos);
            projectile.hit = true;
            break;
        }

        var blockTilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
        var blockId = World.blocks.getForeground(blockTilePos);
        var blockType = Game.blockRegister[blockId];
        var isBulletSolid = (blockType.isBulletSolid == undefined || entity.projectile.projectileType.isExplosive) ? blockType.isSolid : blockType.isBulletSolid;
        if (blockId != 0 && isBulletSolid && v2.dot([Math.cos(projectile.angle), -Math.sin(projectile.angle)], [blockTilePos[0] + 0.5 - pos[0], blockTilePos[1] + 0.5 - pos[1]]) > 0.0) {
            Event.trigger(EntityProjectile.Events.onHitBlock, entity, blockTilePos);
            projectile.hit = true;
            break;
        }
        if (blockType.bulletFunction)
            blockType.bulletFunction(blockTilePos, blockType, entity);

        var density = World.tiles.getDensity(blockTilePos);
        if (density >= 160) {
            Event.trigger(EntityProjectile.Events.onHitTile, entity, blockTilePos);
            projectile.hit = true;
            break;
        }

        if (projectile.hit)
            break;
    }

    if (projectile.hit) {
        Event.trigger(EntityProjectile.Events.onHit, entity, v2.clone(pos));
        if (!isServer && projectile.sprite) {
            projectile.sprite.anchor[0] = 1.0;
            if (!projectile.sprite.visible) {
                projectile.posClient = v2.clone(pos);
                projectile.posClientOld = v2.clone(pos);
                projectile.sprite.visible = true;
                projectile.sprite.scale[0] = 4.0 * v2.distance(projectile.startPos, pos);
            }
        }
    }

    projectile.pos = pos;
    v2.copy(pos, projectile.posOld);
}
