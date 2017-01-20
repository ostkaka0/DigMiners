
CommandEntityHealthChange = function(entityId, healthChange) {
    this.entityId = entityId;
    this.healthChange = toFix(healthChange);
}

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
    serializeInt32(byteArray, index, this.entityId);
    serializeFix(byteArray, index, this.healthChange);
}

CommandEntityHealthChange.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.healthChange = deserializeFix(byteArray, index);
}

CommandEntityHealthChange.prototype.getSerializationSize = function() {
    return 8;
}
