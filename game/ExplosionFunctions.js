
createExplosion = function(startPos, radius, entityDamage, blockDamage, tileDamage) {
    if (isServer) {
        // Damage terrain
        for (var i = 0; i < tileDamage; ++i)
            sendCommand(new CommandDig(startPos[0], startPos[1], radius));

        // Damage blocks
        if (blockDamage > 0) {
            startPos = v2.clone(startPos);
            for (var x = -radius; x < radius; ++x) {
                for (var y = -radius; y < radius; ++y) {
                    var pos = v2.create(startPos[0] + x, startPos[1] + y);
                    var dis = v2.distanceSquared(startPos, pos);
                    if (dis <= radius) {
                        v2.floor(pos, pos);
                        var damage = Math.floor((1 - dis / radius) * blockDamage);
                        var strength = getStrength(gameData.blockWorld, pos[0], pos[1]);
                        sendCommand(new CommandBlockStrength(pos[0], pos[1], strength - damage));
                    }
                }
            }
        }

        // Hurt entities
        if (entityDamage > 0) {
            gameData.entityWorld.objectArray.forEach(function(entity) {
                if (entity.physicsBody && entity.health) {
                    var dis = v2.distanceSquared(startPos, entity.physicsBody.getPos());
                    if (dis <= radius)
                        sendCommand(new CommandHurtEntity(entity.id, -entityDamage));
                }
            });
        }
    } else {
        // show explosion particle effect and sound
    }
}
