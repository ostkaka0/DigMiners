
CommandEntityHurt = function(otherEntityId, healthChange) {
    this.otherEntityId = otherEntityId;
    this.healthChange = healthChange;
}

CommandEntityHurt.prototype.execute = function(gameData) {
    var otherEntity = gameData.entityWorld.objects[this.otherEntityId];
    if (!otherEntity || !otherEntity.health) return;
    otherEntity.movement.disabledCooldown = 40;
    otherEntity.health.health = (otherEntity.health.health + this.healthChange < 0 ? 0 : otherEntity.health.health + this.healthChange);
    gameData.eventHandler.trigger("healthChange", otherEntity);
    if (otherEntity.health.health == 0)
        gameData.eventHandler.trigger("entityDeath", otherEntity);
}

CommandEntityHurt.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.otherEntityId);
    serializeInt32(byteArray, index, this.healthChange);
}

CommandEntityHurt.prototype.deserialize = function(byteArray, index) {
    this.otherEntityId = deserializeInt32(byteArray, index);
    this.healthChange = deserializeInt32(byteArray, index);
}

CommandEntityHurt.prototype.getSerializationSize = function() {
    return 8;
}
