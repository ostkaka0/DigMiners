import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import Config from "Game/Config.js";

import RegisterCommand from "Engine/Register/Command.js";
import ParticleFunctions from "Game/ParticleFunctions.js";

var CommandParticles = function(particleFunctionId, pos, variable) {
    this.particleFunctionId = particleFunctionId;
    this.pos = pos;
    this.variable = variable;
}
export default CommandParticles;
RegisterCommand.push(CommandParticles);

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
