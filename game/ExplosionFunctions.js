
createExplosion = function(startPos, radius, entityDamage, blockDamage, tileDamage) {
    if (isServer) {
        for (var i = 0; i < tileDamage; ++i)
            sendCommand(new CommandDig(startPos[0], startPos[1], radius));
        startPos = v2.clone(startPos);
        for (var x = -radius; x < radius; ++x) {
            for (var y = -radius; y < radius; ++y) {
                var pos = v2.create(startPos[0] + x, startPos[1] + y);
                var dist = v2.distanceSquared(startPos, pos);
                if (dist <= radius) {
                    v2.floor(pos, pos);
                    var damage = Math.floor((1 - dist / radius) * blockDamage);
                    var strength = getStrength(gameData.blockWorld, pos[0], pos[1]);
                    sendCommand(new CommandBlockStrength(pos[0], pos[1], strength - damage));
                }
            }
        }

        gameData.entityWorld.objectArray.forEach(function(entity) {
            if (entity.physicsBody && entity.health) {
                var dist = v2.distanceSquared(startPos, entity.physicsBody.getPos());
                if (dist <= radius) {
                    var damage = Math.floor((1 - dist / radius) * entityDamage);
                    sendCommand(new CommandEntityHurt(entity.id, -damage));
                }
            }
        });
    } else {
        // show explosion particle effect and sound
    }
}