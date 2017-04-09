









var PotionEffectTypes = {};
global.PotionEffectTypes = PotionEffectTypes;

PotionEffectTypes.Healing = {
    interval: 5,
    potionFunction: function(entity) {
        var health = entity.health;
        if (health) {
            health.health = Math.min(health.maxHealth, health.health + 2);
            Event.trigger(EntityHealth.Events.onChange, entity);
        }
    }
}

PotionEffectTypes.SupplyAmmo = {
    interval: 5,
    potionFunction: function(entity) {
        if (!entity.ammo) return;
        Object.keys(entity.ammo).forEach(function(itemId) {
            var itemType = RegisterItem[itemId];
            var amount = entity.ammo[itemId];
            // Add 1% of ammoMax
            var ammoToAdd = Math.min(itemType.ammoMax - amount, Math.max(1, itemType.ammoMax * 0.05 >> 0));
            if (ammoToAdd == 0) return;
            entity.ammo[itemId] += ammoToAdd;
            Event.trigger(EntityAmmo.Events.onChange, entity);
            // TODO: Trigger event?
        });
    }
}

PotionEffectTypes.HealNearEntities = {
    interval: 5,
    potionFunction: function(entity) {
        var pos = entity.physicsBody.getPos();
        /*var pos = entity.physicsBody.getPos();
        var nearBodies = [];
        World.physics.getBodiesInRadius(nearBodies, pos, 2.0);
        nearBodies.forEach(function(bodyId) {
            var entity = World.physicsEntities[bodyId];
            if (!entity || !entity.potionEffects) return;
            entity.potionEffects.add(PotionEffectTypes.Healing.id, 6);
        }.bind(this));*/
        World.entities.objectArray.forEach(function(otherEntity) {
            if (!otherEntity.physicsBody || !otherEntity.potionEffects)
                return;
            var posOther = otherEntity.physicsBody.getPos();
            if (v2.distance(pos, posOther) < 4.0)
                otherEntity.potionEffects.add(PotionEffectTypes.Healing, 10);

        }.bind(this));
    }
}

PotionEffectTypes.SupplyAmmoNearEntities = {
    interval: 5,
    potionFunction: function(entity) {
        var pos = entity.physicsBody.getPos();
        World.entities.objectArray.forEach(function(otherEntity) {
            if (!otherEntity.physicsBody || !otherEntity.potionEffects)
                return;
            var posOther = otherEntity.physicsBody.getPos();
            if (v2.distance(pos, posOther) < 4.0)
                otherEntity.potionEffects.add(PotionEffectTypes.SupplyAmmo, 10);

        }.bind(this));
    }
}

PotionEffectTypes.Toxin = {
    interval: 10,
    potionFunction: function(entity) {
        var health = entity.health;
        if (!health || health.health <= 5) return;
        health.health = Math.max(5, health.health - 5);
        Event.trigger(EntityHealth.Events.onChange, entity);
    }
}
