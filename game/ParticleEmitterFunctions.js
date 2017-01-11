
createParticles = function(type, pos) {
    return;
    if (!isServer) {
        var typeCopy = JSON.parse(JSON.stringify(type));
        typeCopy.pos = {
            x: pos[0] * 32.0,
            y: -pos[1] * 32.0
        }
        var emitter = new PIXI.particles.Emitter(
            particleContainer,
            [gameData.textures["particles/smokeParticle"], gameData.textures["particles/particle"]],
            typeCopy
        );
        emitter.emit = true;
        gameData.particleEmitterWorld.add(emitter, gameData.particleEmitterIdList.next());
        return emitter;
    }
}

createDespawningParticles = function(type, pos, msAlive) {
    return;
    var emitter = createParticles(type, pos);
    setTimeout(function() {
        setTimeout(function() {
            this.destroy();
            gameData.particleEmitterWorld.remove(this);
        }.bind(this), 5000);
        this.emit = false;
    }.bind(emitter), msAlive);
}