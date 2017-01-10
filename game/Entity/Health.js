
Health = function(health, maxHealth) {
    this.health = health;
    this.maxHealth = maxHealth;
}

Health.prototype.name = health.name; function health() { };

Health.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.health);
    serializeInt32(byteArray, index, this.maxHealth);
}

Health.prototype.deserialize = function(byteArray, index) {
    this.health = deserializeInt32(byteArray, index);
    this.maxHealth = deserializeInt32(byteArray, index);
}

Health.prototype.getSerializationSize = function() {
    return 8;
}

Health.prototype.destroy = function(entity) {

}

Health.prototype.hurt = function(entity, attacker, damage) {
    if (!isServer)
        return;
    if (attacker && entity.id != attacker.id && entity.team && attacker.team && entity.team.value != Teams.None && entity.team.value == attacker.team.value)
        return;
    if (attacker && attacker.movement)
        damage *= attacker.movement.damageMultiplier;
        
    sendCommand(new CommandHurtEntity(entity.id, -damage));
}
