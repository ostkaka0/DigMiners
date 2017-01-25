
ParticleWorld = function() {
    this.numBodies = 0;
    this.usedIds = [];

    this.pos = [];
    this.posOld = [];
    this.velocity = [];
    this.beginTime = [];
    this.particleType = [];
}

ParticleWorld.prototype.update = function(dt) {
    var time = new Date().getTime();
    this.forEach(function(id) {
        var particleType = Config.particleRegister[this.particleType[id]];
        var fracTime = (time - this.beginTime[id]) / particleType.lifeTime;
        var acceleration = fracTime * particleType.accelerationEnd + (1 - fracTime) * particleType.accelerationStart;
        this.velocity[id * 2] *= acceleration;
        this.velocity[id * 2 + 1] *= acceleration;
        this.posOld[id * 2] = this.pos[id * 2];
        this.posOld[id * 2 + 1] = this.pos[id * 2 + 1];
        this.pos[id * 2] += dt * this.velocity[id * 2];
        this.pos[id * 2 + 1] += dt * this.velocity[id * 2 + 1];
    }.bind(this));
}

ParticleWorld.prototype.render = function(tickFracTime) {
    var time = new Date().getTime();
    this.forEach(function(id) {
        var particleType = Config.particleRegister[this.particleType[id]];
        var fracTime = (time - this.beginTime[id]) / particleType.lifeTime;
        if (fracTime >= 1.0)
            this.remove(id);
        else {
            var x = -camera.pos[0] + canvas.width / 2 + 32.0 * (tickFracTime * this.pos[2 * id] + (1 - tickFracTime) * this.posOld[2 * id]);
            var y = camera.pos[1] + canvas.height / 2 - 32.0 * (tickFracTime * this.pos[2 * id + 1] + (1 - tickFracTime) * this.posOld[2 * id + 1]);
            var scale = [fracTime * particleType.scaleEnd[0] + (1 - fracTime) * particleType.scaleStart[0], fracTime * particleType.scaleEnd[1] + (1 - fracTime) * particleType.scaleStart[1]];
            var angle = fracTime * particleType.angleEnd + (1 - fracTime) * particleType.angleStart;

            // Mix colors
            var r = Math.floor(fracTime * particleType.colorEnd[0] + (1 - fracTime) * particleType.colorStart[0]);
            var g = Math.floor(fracTime * particleType.colorEnd[1] + (1 - fracTime) * particleType.colorStart[1]);
            var b = Math.floor(fracTime * particleType.colorEnd[2] + (1 - fracTime) * particleType.colorStart[2]);

            context2d.translate(x, y);
            context2d.rotate(angle);
            context2d.scale(scale[0], scale[1]);
            context2d.translate(-0.5 * particleType.size, -0.5 * particleType.size);

            context2d.globalAlpha = fracTime * particleType.alphaEnd + (1 - fracTime) * particleType.alphaStart;
            context2d.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            context2d.fillRect(0, 0, particleType.size, particleType.size);

            context2d.translate(0.5 * particleType.size, 0.5 * particleType.size);
            context2d.scale(1.0 / scale[0], 1.0 / scale[1]);
            context2d.rotate(-angle);
            context2d.translate(-x, -y);
        }
    }.bind(this));
    context2d.globalAlpha = 1.0;
}

ParticleWorld.prototype.add = function(pos, velocity, particleType) {
    var id = this.numBodies++;
    this.pos.push(pos[0], pos[1]);
    this.posOld.push(pos[0], pos[1]);
    this.velocity.push(velocity[0], velocity[1]);
    this.beginTime.push(new Date().getTime());
    this.particleType.push(particleType.id);
    return id;
}

ParticleWorld.prototype.remove = function(id) {
    this.usedIds.push(id);
}

ParticleWorld.prototype.forEach = function(userFunction) {
    var usedId = this.usedIds[0];
    var usedIdsIndex = 0;
    for (var id = 0; id < this.numBodies; id++) {
        if (id == usedId) {
            usedIdsIndex++;
            usedId = this.usedIds[usedIdsIndex];
            continue;
        }
        userFunction(id);
    }
}