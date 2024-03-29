











var ExplosionFunctions = {};
global.ExplosionFunctions = ExplosionFunctions;

ExplosionFunctions.createExplosion = function(startPos, radius, entityDamage, blockDamage, tileDamage, attacker) {
    if (isServer) {
        // Damage terrain
        for (var i = 0; i < tileDamage; ++i)
            sendCommand(new CommandDig(startPos, radius));

        // Damage blocks
        if (blockDamage > 0) {
            startPos = v2.clone(startPos);
            for (var x = -radius; x < radius; ++x) {
                for (var y = -radius; y < radius; ++y) {
                    var pos = v2.create(startPos[0] + x, startPos[1] + y);
                    var dis = v2.distance(startPos, pos);
                    if (dis <= radius) {
                        v2.floor(pos, pos);
                        var damage = Math.floor((1 - dis / radius) * blockDamage);
                        var strength = World.blocks.getStrength(pos);
                        sendCommand(new CommandBlockStrength(pos[0], pos[1], strength - damage));
                    }
                }
            }
        }

        // Hurt entities
        if (entityDamage > 0) {
            World.entities.objectArray.forEach(function(entity) {
                if (entity.physicsBody && entity.health) {
                    var dis = v2.distance(startPos, entity.physicsBody.getPos());
                    if (dis <= radius) {
                        Entity.hurt(entity, attacker, entityDamage);
                    }
                }
            });
        }
    }
}
