var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Command = require("game/Command/Command.js")

var CommandEntityMove = function(entityId, direction, pos) {
    this.entityId = entityId;
    this.direction = direction;
    if (pos)
        this.pos = v2.cloneFix(pos);
}
module.exports = CommandEntityMove
Command.Register.push(module.exports)

CommandEntityMove.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;
    movement.direction = this.direction;
    movement.rotationDirection = v2.clone(this.direction);
    physicsBody.setPos(this.pos);
}

CommandEntityMove.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.v2(byteArray, index, this.direction);
    Serialize.v2(byteArray, index, this.pos);
}

CommandEntityMove.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.direction = Deserialize.v2(byteArray, index);
    this.pos = Deserialize.v2(byteArray, index);
}

CommandEntityMove.prototype.getSerializationSize = function() {
    return 20;
}
