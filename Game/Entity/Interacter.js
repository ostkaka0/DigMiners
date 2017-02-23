import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import RegisterEntity from "Engine/Register/Entity.js";

var EntityInteracter = function() {
    this.lastCheck = null;
    this.interacting = null;
}
export default EntityInteracter
RegisterEntity.push(EntityInteracter);

EntityInteracter.prototype.name = interacter.name; function interacter() { };

EntityInteracter.prototype.serialize = function(byteArray, index) {

}

EntityInteracter.prototype.deserialize = function(byteArray, index) {

}

EntityInteracter.prototype.getSerializationSize = function() {
    return 0;
}
