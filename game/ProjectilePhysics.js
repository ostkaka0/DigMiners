
entityFunctionProjectileSimulate = function(gameData, dt) {
    gameData.entityWorld.objectArray.forEach(function(entity) {
        if (entity.projectile)
            projectileEntitySimulate(gameData, entity, dt);
    });
}

projectileEntitySimulate = function(gameData, entity, dt) {
    var projectile = entity.projectile;
    if (!projectile) return;
    var dir = v2.create(Math.cos(entity.projectile.angle), -Math.sin(entity.projectile.angle));
    var toAdd = v2.create(0, 0);
    v2.mul(projectile.projectileType.speed, dir, toAdd);
    v2.add(projectile.pos, toAdd, projectile.pos);
}