
CommandParticles = function(particleFunctionId, pos, variable) {
    this.particleFunctionId = particleFunctionId;
    this.pos = pos;
    this.variable = variable;
}

CommandParticles.prototype.execute = function() {
    if (!isServer)
        createParticles(Config.particleFunctionRegister[this.particleFunctionId], this.pos, this.variable);
}

CommandParticles.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.particleFunctionId);
    serializeV2(byteArray, index, this.pos);
    serializeFix(byteArray, index, this.variable);
}

CommandParticles.prototype.deserialize = function(byteArray, index) {
    this.particleFunctionId = deserializeInt32(byteArray, index);
    this.pos = deserializeV2(byteArray, index);
    this.variable = deserializeFix(byteArray, index);
}

CommandParticles.prototype.getSerializationSize = function() {
    return 16;
}
