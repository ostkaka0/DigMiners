import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";

import EntityRegister from "Game/Register/Entity.js";

var Ammo = function() { }
export default Ammo
EntityRegister.push(Ammo);
Ammo.Events = {};
Ammo.Events.onChange = [];

Ammo.prototype.name = ammo.name; function ammo() { };

Ammo.prototype.serialize = function(byteArray, index) {
    var keys = Object.keys(this);
    Serialize.int32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        Serialize.int32(byteArray, index, key);
        Serialize.int32(byteArray, index, this[key]);
    }.bind(this));
}

Ammo.prototype.deserialize = function(byteArray, index) {
    var length = Deserialize.int32(byteArray, index);
    for (var i = 0; i < length; i++) {
        var key = Deserialize.int32(byteArray, index);
        var amount = Deserialize.int32(byteArray, index)
        this[key] = amount;
    }
}

Ammo.prototype.getSerializationSize = function() {
    return 4 + 8 * Object.keys(this).length;
}
