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

    var addHealth = function(player, entity, value) {
        entity.health.maxHealth += value;
        entity.health.health += value;
        EntityHealth.Events.onChange(entity);
    }

    var addArmor = function(player, entity, value) {
        entity.health.armor += value;
    }

    var addSpeed = function(player, entity, value) {
        entity.movement.speed += value;
    }

    var addDamage = function(player, entity, value) {
        entity.movement.damageMultiplier += value;
    }
})();
