var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Command = require("Game/Command/Command.js")

var CommandEntityRotate = function(entityId, direction) {
    this.entityId = entityId;
    this.direction = direction;
}
module.exports = CommandEntityRotate
Command.Register.push(module.exports)

CommandEntityRotate.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    movement.rotationDirection = this.direction;
}

CommandEntityRotate.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.v2(byteArray, index, this.direction);
}

CommandEntityRotate.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.direction = Deserialize.v2(byteArray, index);
}

CommandEntityRotate.prototype.getSerializationSize = function() {
    return 12;
}
