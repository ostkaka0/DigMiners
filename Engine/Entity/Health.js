



var EntityHealth = function(health, maxHealth, armor) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.armor = armor;
    this.lastAttackerId = 0;
}
EntityHealth.Events = { onChange: new Map(), onDeath: new Map() };
RegisterEntity.push(EntityHealth);

EntityHealth.prototype.name = health.name; function health() { };

EntityHealth.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.health);
    Serialize.int32(byteArray, index, this.maxHealth);
}

EntityHealth.prototype.deserialize = function(byteArray, index) {
    this.health = Deserialize.int32(byteArray, index);
    this.maxHealth = Deserialize.int32(byteArray, index);
}

EntityHealth.prototype.getSerializationSize = function() {
    return 8;
}

EntityHealth.prototype.destroy = function(entity) {

}
