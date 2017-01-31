var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var TileWorld = require("Engine/TileWorld.js")
var BlockWorld = require("Engine/BlockWorld.js")

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Entity = require("Game/Entity/Entity.js")

var CommandDig = require("Game/Command/CommandDig.js")
var CommandBlockStrength = require("Game/Command/CommandBlockStrength.js")

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
    }
}
