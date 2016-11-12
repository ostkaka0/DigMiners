
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

onHealthChange = function(entity) {
    var sprite = entity.drawable.sprites["healthbar"];
    if(!sprite || !sprite.sprite) return;
    var defaultHealthbarWidth = 64;
    sprite.sprite.width = (entity.health.health / entity.health.maxHealth) * defaultHealthbarWidth;
}

onEntityDeath = function(entity) {
    if(!entity.isDead) {
        entity.isDead = true;
        gameData.entityWorld.remove(entity);
        console.log(entity.id + " died!");
    }
}
