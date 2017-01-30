var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Particles = require("game/Particles.js")


var ParticleFunctions = {};
module.exports = ParticleFunctions

ParticleFunctions.create = function(particleFunction, pos, variable) {
    if (!isServer)
        particleFunction(pos, variable);
}

ParticleFunctions.BulletHitParticles = function(pos, angle) {
    for (var i = 0; i < 10; ++i) {
        var angle2 = angle + (Math.random() - 0.5) * 1.0;
        var velocity = [-Math.cos(angle2), Math.sin(angle2)];
        v2.mul(Math.random() * 12.0, velocity, velocity);
        Global.gameData.world.particleWorld.add(pos, velocity, Particles.Bullet);
    }
}

ParticleFunctions.BloodHitParticles = function(pos, angle) {
    for (var i = 0; i < 10; ++i) {
        var angle2 = angle + (Math.random() - 0.5) * 1.0;
        var velocity = [Math.cos(angle2), -Math.sin(angle2)];
        v2.mul(Math.random() * 6.0, velocity, velocity);
        Global.gameData.world.particleWorld.add(pos, velocity, Particles.Blood);
    }
}

ParticleFunctions.ExplosionParticles = function(pos, radius) {
    for (var i = 0; i < 40; ++i) {
        var angle = Math.random() * Math.PI * 2;
        var velocity = [Math.cos(angle), -Math.sin(angle)];
        v2.mul(Math.random() * 6.0, velocity, velocity);
        var particleType = Particles.Smoke;
        particleType.size = Math.random() * 15 + 20;
        gameData.world.particleWorld.add(pos, velocity, particleType);
    }
}
