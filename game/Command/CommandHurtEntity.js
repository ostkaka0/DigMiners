
CommandHurtEntity = function(entityId, healthChange) {
    this.entityId = entityId;
    this.healthChange = toFix(healthChange);
}

CommandHurtEntity.prototype.execute = function(gameData) {
    return;
    var entity = gameData.entityWorld.objects[this.entityId];
    if (!entity || !entity.health) return;
    if (entity.movement)
        entity.movement.disabledCooldown = 40;
    entity.health.health = (entity.health.health + this.healthChange < 0 ? 0 : entity.health.health + this.healthChange);
    gameData.events.trigger("healthChange", entity);
    if (entity.health.health <= 0)
        gameData.events.trigger("entityDeath", entity);
}

CommandHurtEntity.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeFix(byteArray, index, this.healthChange);
}

CommandHurtEntity.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.healthChange = deserializeFix(byteArray, index);
}

CommandHurtEntity.prototype.getSerializationSize = function() {
    return 8;
}
