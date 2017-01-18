
Ammo = function() { }

Ammo.prototype.name = ammo.name; function ammo() { };

Ammo.prototype.serialize = function(byteArray, index) {
    var keys = Object.keys(this);
    serializeInt32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        serializeInt32(byteArray, index, key);
        serializeInt32(byteArray, index, this[key]);
    }.bind(this));
}

Ammo.prototype.deserialize = function(byteArray, index) {
    var length = deserializeInt32(byteArray, index);
    for (var i = 0; i < length; i++) {
        var key = deserializeInt32(byteArray, index);
        var amount = deserializeInt32(byteArray, index)
        this[key] = amount;
    }
}

Ammo.prototype.getSerializationSize = function() {
    return 4 + 8 * Object.keys(this).length;
}
