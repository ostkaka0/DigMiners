import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Event from "Engine/Core/Event.js";

import Config from "Game/Config.js";

import ItemRegister from "Engine/Register/Item.js"
import Ammo from "Game/Entity/Ammo.js";
import Health from "Game/Entity/Health.js";

var PotionEffectTypes = {};
export default PotionEffectTypes

PotionEffectTypes.Healing = {
    interval: 5,
    potionFunction: function(entity) {
        var health = entity.health;
        if (health) {
            health.health = Math.min(health.maxHealth, health.health + 2);
            Event.trigger(Health.Events.onChange, entity);
        }
    }
}

PotionEffectTypes.SupplyAmmo = {
    interval: 5,
    potionFunction: function(entity) {
        if (!entity.ammo) return;
        Object.keys(entity.ammo).forEach(function(itemId) {
            var itemType = ItemRegister[itemId];
            var amount = entity.ammo[itemId];
            // Add 1% of ammoMax
            var ammoToAdd = Math.min(itemType.ammoMax - amount, Math.max(1, itemType.ammoMax * 0.05 >> 0));
            if (ammoToAdd == 0) return;
            entity.ammo[itemId] += ammoToAdd;
            Event.trigger(Ammo.Events.onChange, entity);
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
        global.gameData.world.physicsWorld.getBodiesInRadius(nearBodies, pos, 2.0);
        nearBodies.forEach(function(bodyId) {
            var entity = global.gameData.world.physicsEntities[bodyId];
            if (!entity || !entity.potionEffects) return;
            entity.potionEffects.add(PotionEffectTypes.Healing.id, 6);
        }.bind(this));*/
        global.gameData.world.entityWorld.objectArray.forEach(function(otherEntity) {
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
        global.gameData.world.entityWorld.objectArray.forEach(function(otherEntity) {
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
        Event.trigger(Health.Events.onChange, entity);
    }
}
