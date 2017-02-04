import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import EntityRegister from "Game/Register/Entity.js";

var Interacter = function() {
    this.lastCheck = null;
    this.interacting = null;
}
export default Interacter
EntityRegister.push(Interacter);

Interacter.prototype.name = interacter.name; function interacter() { };

Interacter.prototype.serialize = function(byteArray, index) {

}

Interacter.prototype.deserialize = function(byteArray, index) {

}

Interacter.prototype.getSerializationSize = function() {
    return 0;
}
