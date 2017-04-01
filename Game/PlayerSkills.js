var PlayerSkills = {
    Stamnia: {
        name: "Stamnia",
    },
    Agility: {
        name: "Agility",
    },
    /*Mining: 2,
    Building: 3,*/
}
var PlayerSkillRegister = ObjectRegister.addByObject([], PlayerSkills);

var playerSkillApply = function(entity, skill, num) {
    if (skill == PlayerSkills.Stamnia) {
        if (!entity.health) return false;
        entity.health.maxHealth += 20 * num;
        entity.health.health += 20 * num;
        Event.trigger(EntityHealth.Events.onChange, entity);
    } else if (skill == PlayerSkills.Agility) {
        if (!entity.movement) return false;
        entity.movement.speed += value;
    } /*else if (skill = PlayerSkills.Mining) {
        if (!entity.movement) return false;

    } else if (skill = PlayerSkills.Building) {
        if (!entity.movement) return false;
    }*/

    return true;
}
