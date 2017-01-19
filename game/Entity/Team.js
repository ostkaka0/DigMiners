
Teams = {
    None: 0,
    Human: 1, 
    Zombie: 2,
    Blue: 3,
    Red: 4,
    Green: 5,
    Brown: 6,
}

Team = function(value) {
    this.value = value;
}

Team.prototype.name = team.name; function team() { };

Team.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.value);
}

Team.prototype.deserialize = function(byteArray, index) {
    this.value = deserializeInt32(byteArray, index);
}

Team.prototype.getSerializationSize = function() {
    return 4;
}
