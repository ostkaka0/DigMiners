import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import Config from "game/Config.js"
import Global from "game/Global.js"


export var createParticles = function(particleFunction, pos, angle) {
    if (!isServer)
        particleFunction(pos, angle);
}

export var ParticleFunctions = {};
export default ParticleFunctions

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
