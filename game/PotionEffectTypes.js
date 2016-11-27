
PotionEffectTypes = [];

PotionEffectTypes.Healing = {
    interval: 10,
    potionFunction: function(entity) { 
        var health = entity.health;
        if (health) {
            health.health = Math.min(health.maxHealth, health.health + 5);
            gameData.events.trigger("healthChange", entity);
        }
    }
}
