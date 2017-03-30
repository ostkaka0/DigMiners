var LevelPerks = {};

(function(){
    LevelPerks[2] = {
        aText: "+health",
        bText: "+speed",
        a: (player, entity) => addHealth(player, entity, 20),
        b: (player, entity) => addSpeed(player, entity, 5),
    }
    LevelPerks[3] = {
        aText: "+armor",
        bText: "+damage",
        a: (player, entity) => addArmor(player, entity, 0.1),
        b: (player, entity) => addDamage(player, entity, 0.1),
    }
    LevelPerks[4] = {
        aText: "+health",
        bText: "+speed",
        a: (player, entity) => addHealth(player, entity, 20),
        b: (player, entity) => addSpeed(player, entity, 5),
    }
    LevelPerks[5] = {
        aText: "+50% damage, -33% health",
        bText: "+50% speed, -33% damage",
        a: (player, entity) => {
            addHealth(player, entity, entity.health.maxHealth / 2);
            addSpeed(player, entity, -entity.movement.speed / 3);
        },
        b: (player, entity) => {
            addHealth(player, entity, -entity.health.maxHealth / 3);
            addSpeed(player, entity, entity.movement.speed / 2);
        },
    }
    LevelPerks[6] = {
        aText: "+armor",
        bText: "+damage",
        a: (player, entity) => addArmor(player, entity, 0.1),
        b: (player, entity) => addDamage(player, entity, 0.1),
    }
    LevelPerks[7] = {
        aText: "+health",
        bText: "+speed",
        a: (player, entity) => addHealth(player, entity, 20),
        b: (player, entity) => addSpeed(player, entity, 5),
    }
    LevelPerks[8] = {
        aText: "+armor",
        bText: "+damage",
        a: (player, entity) => addArmor(player, entity, 0.1),
        b: (player, entity) => addDamage(player, entity, 0.1),
    }
    LevelPerks[9] = {
        aText: "+speed",
        bText: "+damage",
        a: (player, entity) => addSpeed(player, entity, 5),
        b: (player, entity) => addDamage(player, entity, 0.1),
    }
    LevelPerks[10] = {
        aText: "+50% health, -33% speed",
        bText: "+50% speed, -33% health",
        a: (player, entity) => {
            addHealth(player, entity, entity.health.maxHealth / 2);
            addSpeed(player, entity, -entity.movement.speed / 3);
        },
        b: (player, entity) => {
            addHealth(player, entity, -entity.health.maxHealth / 3);
            addSpeed(player, entity, entity.movement.speed / 2);
        },
    }

    var addHealth = function(player, entity, value) {
        if (!entity.health) return;
        entity.health.maxHealth += value;
        entity.health.health += value;
        Event.trigger(EntityHealth.Events.onChange, entity);
    }

    var addArmor = function(player, entity, value) {
        if (!entity.health) return;
        entity.health.armor += value;
    }

    var addSpeed = function(player, entity, value) {
        if (!entity.movement) return;
        entity.movement.speed += value;
    }

    var addDamage = function(player, entity, value) {
        if (!entity.movement) return;
        entity.movement.damageMultiplier += value;
    }
})();
