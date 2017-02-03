import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";

import Config from "Game/Config.js";

var ParticleWorld = function() {
    this.particles = [];
}
export default ParticleWorld;

ParticleWorld.prototype.update = function(dt) {
    var time = new Date().getTime();
    this.particles.forEach(function(particle) {
        var particleType = Config.particleRegister[particle[4]];
        var fracTime = (time - particle[3]) / particleType.lifeTime;
        var acceleration = fracTime * particleType.accelerationEnd + (1 - fracTime) * particleType.accelerationStart;
        var newVelocity = [0, 0];
        v2.mul(acceleration, particle[2], newVelocity);
        particle[2] = newVelocity;
        particle[1] = v2.clone(particle[0]);
        var dtVel = [0, 0];
        v2.mul(dt, newVelocity, dtVel);
        var newPos = [0, 0];
        v2.add(particle[0], dtVel, newPos);
        particle[0] = newPos;
    }.bind(this));
}

ParticleWorld.prototype.render = function(camera, context, tickFracTime) {
    var time = new Date().getTime();
    this.particles.forEach(function(particle) {
        var particleType = Config.particleRegister[particle[4]];
        var fracTime = (time - particle[3]) / particleType.lifeTime;
        if (fracTime >= 1.0)
            this.remove(particle);
        else {
            var x = -camera.pos[0] + canvas.width / 2 + 32.0 * (tickFracTime * particle[0][0] + (1 - tickFracTime) * particle[1][0]);
            var y = camera.pos[1] + canvas.height / 2 - 32.0 * (tickFracTime * particle[0][1] + (1 - tickFracTime) * particle[1][1]);
            var scale = [fracTime * particleType.scaleEnd[0] + (1 - fracTime) * particleType.scaleStart[0], fracTime * particleType.scaleEnd[1] + (1 - fracTime) * particleType.scaleStart[1]];
            var angle = fracTime * particleType.angleEnd + (1 - fracTime) * particleType.angleStart;

            // Mix colors
            var r = Math.floor(fracTime * particleType.colorEnd[0] + (1 - fracTime) * particleType.colorStart[0]);
            var g = Math.floor(fracTime * particleType.colorEnd[1] + (1 - fracTime) * particleType.colorStart[1]);
            var b = Math.floor(fracTime * particleType.colorEnd[2] + (1 - fracTime) * particleType.colorStart[2]);

            context.translate(x, y);
            context.rotate(angle);
            context.scale(scale[0], scale[1]);
            context.translate(-0.5 * particleType.size, -0.5 * particleType.size);

            context.globalAlpha = fracTime * particleType.alphaEnd + (1 - fracTime) * particleType.alphaStart;
            context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            context.fillRect(0, 0, particleType.size, particleType.size);

            context.translate(0.5 * particleType.size, 0.5 * particleType.size);
            context.scale(1.0 / scale[0], 1.0 / scale[1]);
            context.rotate(-angle);
            context.translate(-x, -y);
        }
    }.bind(this));
    context.globalAlpha = 1.0;
}

ParticleWorld.prototype.add = function(pos, velocity, particleType) {
    this.particles.push([pos, pos, velocity, new Date().getTime(), particleType.id]);
}

ParticleWorld.prototype.remove = function(particle) {
    var index = this.particles.indexOf(particle);
    if (index != -1)
        this.particles.splice(index, 1);
}
