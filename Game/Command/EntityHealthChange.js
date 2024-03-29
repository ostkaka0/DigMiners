
var CommandEntityHealthChange = function(entityId, healthChange) {
    this.entityId = entityId;
    this.healthChange = fix.toFix(healthChange);
}
global.CommandEntityHealthChange = CommandEntityHealthChange;
TypeRegister.add(RegisterCommand, CommandEntityHealthChange);

CommandEntityHealthChange.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    if (!entity || !entity.health) return;
    if (entity.movement)
        entity.movement.disabledCooldown = 40;
    entity.health.health = (entity.health.health + this.healthChange < 0 ? 0 : entity.health.health + this.healthChange);
    Event.trigger(EntityHealth.Events.onChange, entity);
    if (entity.health.health <= 0)
        Event.trigger(EntityHealth.Events.onDeath, entity, World.entities.objects[entity.health.lastAttackerId]);
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
