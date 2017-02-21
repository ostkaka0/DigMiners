import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import EntityRegister from "Engine/Register/Entity.js";

var EntityTeams = {
    None: 0,
    Human: 1,
    Zombie: 2,
    Blue: 3,
    Red: 4,
    Green: 5,
    Brown: 6,
}

var EntityTeam = function(value) {
    this.value = value;
}
export default EntityTeam
EntityRegister.push(EntityTeam);
EntityTeam.Enum = EntityTeams;

EntityTeam.prototype.name = team.name; function team() { };

EntityTeam.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.value);
}

EntityTeam.prototype.deserialize = function(byteArray, index) {
    this.value = Deserialize.int32(byteArray, index);
}

EntityTeam.prototype.getSerializationSize = function() {
    return 4;
}
