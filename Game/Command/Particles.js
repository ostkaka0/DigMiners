









var CommandParticles = function(particleFunctionId, pos, variable) {
    this.particleFunctionId = particleFunctionId;
    this.pos = pos;
    this.variable = variable;
}
global.CommandParticles = CommandParticles;
RegisterCommand.push(CommandParticles);

CommandParticles.prototype.execute = function() {
    if (!isServer)
        ParticleFunctions.create(gameData.particleFunctionRegister[this.particleFunctionId], this.pos, this.angle);
}

CommandParticles.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.particleFunctionId);
    Serialize.v2(byteArray, index, this.pos);
    Serialize.fix(byteArray, index, this.angle);
}

CommandParticles.prototype.deserialize = function(byteArray, index) {
    this.particleFunctionId = Deserialize.int32(byteArray, index);
    this.pos = Deserialize.v2(byteArray, index);
    this.angle = Deserialize.fix(byteArray, index);
}

CommandParticles.prototype.getSerializationSize = function() {
    return 16;
}
