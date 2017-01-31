var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Command = require("Game/Command/Command.js")
var ParticleFunctions = require("Game/ParticleFunctions.js")

var CommandParticles = function(particleFunctionId, pos, variable) {
    this.particleFunctionId = particleFunctionId;
    this.pos = pos;
    this.variable = variable;
}
module.exports = CommandParticles
Command.Register.push(module.exports)

CommandParticles.prototype.execute = function() {
    if (!isServer)
        ParticleFunctions.create(Config.particleFunctionRegister[this.particleFunctionId], this.pos, this.angle);
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
