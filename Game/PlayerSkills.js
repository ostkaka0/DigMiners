var PlayerSkills = {
    Stamnia: {
        name: "Stamnia",
    },
    Agility: {
        name: "Agility",
    },
    Mining: {
        name: "Mining",
    },
    /*Mining: 2,
    Building: 3,*/
}
var PlayerSkillRegister = ObjectRegister.addByObject([], PlayerSkills);

var playerSkillApply = function(entity, skill, num) {
    if (skill == PlayerSkills.Stamnia.id) {
        if (!entity.health) return false;
        entity.health.maxHealth += 20 * num;
        entity.health.health += 20 * num;
        Event.trigger(EntityHealth.Events.onChange, entity);
    } else if (skill == PlayerSkills.Agility.id) {
        if (!entity.movement) return false;
        entity.movement.speed += 5 * num;
    } else if (skill = PlayerSkills.Mining) {
        if (!entity.movement) return false;
        entity.movement.digSpeedMultiplier += 0.25 * num;
        entity.movement.blockBreakMultiplier += 0.25 * num;

    } /*else if (skill = PlayerSkills.Building) {
        if (!entity.movement) return false;
    }*/

    return true;
}
