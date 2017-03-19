



var EntityAmmo = function() { }
global.EntityAmmo = EntityAmmo;
RegisterEntity.push(EntityAmmo);
EntityAmmo.Events = { onChange: new Map() };

EntityAmmo.prototype.name = ammo.name; function ammo() { };

EntityAmmo.prototype.serialize = function(byteArray, index) {
    var keys = Object.keys(this);
    Serialize.int32(byteArray, index, keys.length);
    keys.forEach(function(key) {
        Serialize.int32(byteArray, index, key);
        Serialize.int32(byteArray, index, this[key]);
    }.bind(this));
}

EntityAmmo.prototype.deserialize = function(byteArray, index) {
    var length = Deserialize.int32(byteArray, index);
    for (var i = 0; i < length; i++) {
        var key = Deserialize.int32(byteArray, index);
        var amount = Deserialize.int32(byteArray, index)
        this[key] = amount;
    }
}

EntityAmmo.prototype.getSerializationSize = function() {
    return 4 + 8 * Object.keys(this).length;
}
