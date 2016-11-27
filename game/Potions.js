
PotionEffects = [];

PotionEffects.Healing = {
    duration: 20,
    effectInterval: 5,
    potionFunction: function(entity) { 
        var health = entity.health;
        if (health) {
            health.health = Math.min(health.maxHealth, health.health + 5);
            gameData.events.trigger("healthChange", entity);
        }
    }
}
