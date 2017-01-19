
Health = function(health, maxHealth, armor) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.armor = armor;
}

Health.onChange = [];
Health.onDeath = [];

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

Health.prototype.hurt = function(entity, attacker, damage, armorPenentration) {
    if (!isServer)
        return;
    if (attacker && entity.id != attacker.id && entity.team && attacker.team && entity.team.value != Teams.None && entity.team.value == attacker.team.value)
        return;
    if (attacker && attacker.movement)
        damage *= attacker.movement.damageMultiplier;
        
    armorPenentration = armorPenentration || 0.0;
        
    sendCommand(new CommandHurtEntity(entity.id, -Math.min(1.0, (1.0 - this.armor + armorPenentration)) * damage));
}
