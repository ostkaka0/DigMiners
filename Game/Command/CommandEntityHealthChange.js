var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var Event = require("Engine/Core/Event.js")

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Command = require("Game/Command/Command.js")
var Health = require("Game/Entity/Health.js")

var CommandEntityHealthChange = function(entityId, healthChange) {
    this.entityId = entityId;
    this.healthChange = fix.toFix(healthChange);
}
module.exports = CommandEntityHealthChange
Command.Register.push(module.exports)

CommandEntityHealthChange.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.health) return;
    if (entity.movement)
        entity.movement.disabledCooldown = 40;
    entity.health.health = (entity.health.health + this.healthChange < 0 ? 0 : entity.health.health + this.healthChange);
    Event.trigger(Health.Events.onChange, entity);
    if (entity.health.health <= 0)
        Event.trigger(Health.Events.onDeath, entity);
}

CommandEntityHealthChange.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.fix(byteArray, index, this.healthChange);
}

CommandEntityHealthChange.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.healthChange = Deserialize.fix(byteArray, index);
}

CommandEntityHealthChange.prototype.getSerializationSize = function() {
    return 8;
}
