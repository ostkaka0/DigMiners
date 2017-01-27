import { Serialize, Deserialize } from "engine/Serialization.js"

var CommandEntityHealthChange = function(entityId, healthChange) {
    this.entityId = entityId;
    this.healthChange = toFix(healthChange);
}
export default CommandEntityHealthChange

CommandEntityHealthChange.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.health) return;
    if (entity.movement)
        entity.movement.disabledCooldown = 40;
    entity.health.health = (entity.health.health + this.healthChange < 0 ? 0 : entity.health.health + this.healthChange);
    triggerEvent(HealthEvents.onChange, entity);
    if (entity.health.health <= 0)
        triggerEvent(HealthEvents.onDeath, entity);
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
