import { Serialize, Deserialize } from "engine/Serialization.js"
import CommandEntityHealthChange from "game/Command/CommandEntityHealthChange.js"

export var HealthEvents = {};
HealthEvents.onChange = [];
HealthEvents.onDeath = [];

export var Health = function(health, maxHealth, armor) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.armor = armor;
}
export default Health

Health.prototype.name = health.name; function health() { };

Health.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.health);
    Serialize.int32(byteArray, index, this.maxHealth);
}

Health.prototype.deserialize = function(byteArray, index) {
    this.health = Deserialize.int32(byteArray, index);
    this.maxHealth = Deserialize.int32(byteArray, index);
}

Health.prototype.getSerializationSize = function() {
    return 8;
}

Health.prototype.destroy = function(entity) {

}

Health.prototype.hurt = function(entity, attacker, damage, armorPenentration) {
    if (!isServer)
        return false;
    if (attacker && entity.id != attacker.id && entity.team && attacker.team && entity.team.value != Teams.None && entity.team.value == attacker.team.value)
        return false;
    if (attacker && attacker.movement)
        damage *= attacker.movement.damageMultiplier;

    armorPenentration = armorPenentration || 0.0;

    sendCommand(new CommandEntityHealthChange(entity.id, -Math.min(1.0, (1.0 - this.armor + armorPenentration)) * damage));
    return true;
}
