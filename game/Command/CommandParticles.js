
CommandParticles = function(particleFunctionId, pos, angle) {
    this.particleFunctionId = particleFunctionId;
    this.pos = pos;
    this.angle = angle;
}

CommandParticles.prototype.execute = function() {
    if (!isServer)
        createParticles(Config.particleFunctionRegister[this.particleFunctionId], this.pos, this.angle);
}

CommandParticles.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.particleFunctionId);
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.angle);
}

CommandParticles.prototype.deserialize = function(byteArray, index) {
    this.particleFunctionId = deserializeInt32(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
    this.angle = deserializeFix(byteArray, index);
}

CommandParticles.prototype.getSerializationSize = function() {
    return 16;
}
