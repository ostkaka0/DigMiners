var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var EntityRegister = require("Game/Entity/Register.js")

var Interacter = function() {
    this.lastCheck = null;
    this.interacting = null;
}
module.exports = Interacter
EntityRegister.push(module.exports);

Interacter.prototype.name = interacter.name; function interacter() { };

Interacter.prototype.serialize = function(byteArray, index) {

}

Interacter.prototype.deserialize = function(byteArray, index) {

}

Interacter.prototype.getSerializationSize = function() {
    return 0;
}
