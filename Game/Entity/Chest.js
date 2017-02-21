import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import EntityRegister from "Engine/Register/Entity.js";

var EntityChest = function() {

}
export default EntityChest;
EntityRegister.push(EntityChest);

EntityChest.prototype.name = chest.name; function chest() { };

EntityChest.prototype.serialize = function(byteArray, index) {

}

EntityChest.prototype.deserialize = function(byteArray, index) {

}

EntityChest.prototype.getSerializationSize = function() {
    return 0;
}

EntityChest.prototype.destroy = function(entity) {

}
