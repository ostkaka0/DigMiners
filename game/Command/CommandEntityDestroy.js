var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize

var Config = require("game/Config.js")
var Global = require("game/Global.js")

var CommandEntityDestroy = function(entityId) {
    this.entityId = entityId;
}
module.exports = CommandEntityDestroy

CommandEntityDestroy.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    Global.gameData.world.entityWorld.remove(entity);
}

CommandEntityDestroy.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
}

CommandEntityDestroy.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandEntityDestroy.prototype.getSerializationSize = function() {
    return 4;
}
