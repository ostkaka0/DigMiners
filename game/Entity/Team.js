import { Serialize, Deserialize } from "engine/Serialization.js"

export var Teams = {
    None: 0,
    Human: 1,
    Zombie: 2,
    Blue: 3,
    Red: 4,
    Green: 5,
    Brown: 6,
}

export var Team = function(value) {
    this.value = value;
}
export default Team

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
