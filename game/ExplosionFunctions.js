var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var TileWorld = require("engine/TileWorld.js")
var BlockWorld = require("engine/BlockWorld.js")

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Entity = require("game/Entity/Entity.js")


module.exports.createExplosion = function(startPos, radius, entityDamage, blockDamage, tileDamage, attacker) {
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
                        var strength = BlockWorld.getStrength(Global.gameData.world.blockWorld, pos[0], pos[1]);
                        sendCommand(new CommandBlockStrength(pos[0], pos[1], strength - damage));
                    }
                }
            }
        }

        // Hurt entities
        if (entityDamage > 0) {
            Global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
                if (entity.physicsBody && entity.health) {
                    var dis = v2.distance(startPos, entity.physicsBody.getPos());
                    if (dis <= radius) {
                        Entity.hurt(entity, attacker, entityDamage);
                    }
                }
            });
        }
    } else {
        // show explosion particle effect and sound
    }
}
