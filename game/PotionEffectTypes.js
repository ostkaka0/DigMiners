
PotionEffectTypes = [];

PotionEffectTypes.Healing = {
    interval: 5,
    potionFunction: function(entity) { 
        var health = entity.health;
        if (health) {
            health.health = Math.min(health.maxHealth, health.health + 1);
            gameData.world.events.trigger("healthChange", entity);
        }
    }
}

PotionEffectTypes.HealNearEntities = {
    interval: 5, 
    potionFunction: function(entity) { 
        var pos = entity.physicsBody.getPos();
        /*var pos = entity.physicsBody.getPos();
        var nearBodies = [];
        gameData.world.physicsWorld.getBodiesInRadius(nearBodies, pos, 2.0);
        nearBodies.forEach(function(bodyId) {
            var entity = gameData.world.physicsEntities[bodyId];
            if (!entity || !entity.potionEffects) return;
            entity.potionEffects.add(PotionEffectTypes.Healing.id, 6);
        }.bind(this));*/
        gameData.world.entityWorld.objectArray.forEach(function(otherEntity) {
            if (!otherEntity.physicsBody || !otherEntity.potionEffects)
                return;
            var posOther = otherEntity.physicsBody.getPos();
            if (v2.distance(pos, posOther) < 4.0)
                otherEntity.potionEffects.add(PotionEffectTypes.Healing, 10);
            
        }.bind(this));
    }
}
