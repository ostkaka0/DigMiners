var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var Event = require("engine/Core/Event.js")

var Config = require("game/Config.js")
var Global = require("game/Global.js")
var Health = require("game/Entity/Health.js")

var CommandEntityHealthChange = function(entityId, healthChange) {
    this.entityId = entityId;
    this.healthChange = fix.toFix(healthChange);
}
module.exports = CommandEntityHealthChange

CommandEntityHealthChange.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.health) return;
    if (entity.movement)
        entity.movement.disabledCooldown = 40;
    entity.health.health = (entity.health.health + this.healthChange < 0 ? 0 : entity.health.health + this.healthChange);
    console.log(Health);
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
