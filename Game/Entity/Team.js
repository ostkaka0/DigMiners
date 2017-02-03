import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";

import EntityRegister from "Game/Entity/Register.js";

var Teams = {
    None: 0,
    Human: 1,
    Zombie: 2,
    Blue: 3,
    Red: 4,
    Green: 5,
    Brown: 6,
}

var Team = function(value) {
    this.value = value;
}
export default Team
EntityRegister.push(Team);
Team.Enum = Teams

Team.prototype.name = team.name; function team() { };

Team.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.value);
}

Team.prototype.deserialize = function(byteArray, index) {
    this.value = Deserialize.int32(byteArray, index);
}

Team.prototype.getSerializationSize = function() {
    return 4;
}
