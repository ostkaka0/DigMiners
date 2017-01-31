var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize

var EntityRegister = require("Game/Entity/Register.js")

var Ammo = function() { }
module.exports = Ammo
EntityRegister.push(module.exports);
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
