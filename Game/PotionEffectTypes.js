var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Event = require("Engine/Core/Event.js")

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Ammo = require("Game/Entity/Ammo.js")
var Health = require("Game/Entity/Health.js")

var PotionEffectTypes = {};
module.exports = PotionEffectTypes

PotionEffectTypes.Healing = {
    interval: 5,
    potionFunction: function(entity) {
        var health = entity.health;
        if (health) {
            health.health = Math.min(health.maxHealth, health.health + 1);
            Event.trigger(Health.Events.onChange, entity);
        }
    }
}

PotionEffectTypes.SupplyAmmo = {
    interval: 5,
    potionFunction: function(entity) {
        if (!entity.ammo) return;
        Object.keys(entity.ammo).forEach(function(itemId) {
            var itemType = Config.itemRegister[itemId];
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
        Global.gameData.world.physicsWorld.getBodiesInRadius(nearBodies, pos, 2.0);
        nearBodies.forEach(function(bodyId) {
            var entity = Global.gameData.world.physicsEntities[bodyId];
            if (!entity || !entity.potionEffects) return;
            entity.potionEffects.add(PotionEffectTypes.Healing.id, 6);
        }.bind(this));*/
        Global.gameData.world.entityWorld.objectArray.forEach(function(otherEntity) {
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
        Global.gameData.world.entityWorld.objectArray.forEach(function(otherEntity) {
            if (!otherEntity.physicsBody || !otherEntity.potionEffects)
                return;
            var posOther = otherEntity.physicsBody.getPos();
            if (v2.distance(pos, posOther) < 4.0)
                otherEntity.potionEffects.add(PotionEffectTypes.SupplyAmmo, 10);

        }.bind(this));
    }
}
