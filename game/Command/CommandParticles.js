import { Serialize, Deserialize } from "engine/Serialization.js"

import Config from "game/Config.js"
import gameData from "game/GameData.js"

var CommandParticles = function(particleFunctionId, pos, angle) {
    this.particleFunctionId = particleFunctionId;
    this.pos = pos;
    this.angle = angle;
}
export default CommandParticles

CommandParticles.prototype.execute = function() {
    if (!isServer)
        createParticles(Config.particleFunctionRegister[this.particleFunctionId], this.pos, this.angle);
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
