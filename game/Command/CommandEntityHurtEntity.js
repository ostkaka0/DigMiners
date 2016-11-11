
CommandEntityHurtEntity = function(entityId, otherEntityId, healthChange) {
    this.entityId = entityId;
    this.otherEntityId = otherEntityId;
    this.healthChange = healthChange;
}

CommandEntityHurtEntity.prototype.execute = function(gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(!entity) return;
    var otherEntity = gameData.entityWorld.objects[this.otherEntityId];
    if(!otherEntity || !otherEntity.health) return;
    otherEntity.health.health = (otherEntity.health.health + this.healthChange < 0 ? 0 : otherEntity.health.health + this.healthChange);
    onHealthChange(otherEntity);
    if(otherEntity.health.health == 0)
        onEntityDeath(otherEntity);
}

CommandEntityHurtEntity.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.entityId);
    serializeInt32(byteArray, index, this.otherEntityId);
    serializeInt32(byteArray, index, this.healthChange);
}

CommandEntityHurtEntity.prototype.deserialize = function(byteArray, index) {
    this.entityId = deserializeInt32(byteArray, index);
    this.otherEntityId = deserializeInt32(byteArray, index);
    this.healthChange = deserializeInt32(byteArray, index);
}

CommandEntityHurtEntity.prototype.getSerializationSize = function() {
    return 12;
}
