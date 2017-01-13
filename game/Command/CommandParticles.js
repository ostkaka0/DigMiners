
CommandParticles = function(particleId, pos, time) {
    this.particleId = particleId;
    this.pos = pos;
    this.time = time;
}

CommandParticles.prototype.execute = function() {
    if (!isServer)
        createDespawningParticles(Config.particleRegister[this.particleId], this.pos, this.time);
}

CommandParticles.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.particleId);
    serializeV2(byteArray, index, this.pos);
    serializeInt32(byteArray, index, this.time);
}

CommandParticles.prototype.deserialize = function(byteArray, index) {
    this.particleId = deserializeInt32(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
    this.time = deserializeInt32(byteArray, index);
}

CommandParticles.prototype.getSerializationSize = function() {
    return 16;
}
