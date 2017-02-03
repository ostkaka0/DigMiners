import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Config from "Game/Config.js";
import Global from "Game/Global.js";
import Particles from "Game/Particles.js";


var ParticleFunctions = {};
export default ParticleFunctions

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
