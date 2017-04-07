





var Entity = {}; //module.exports;
global.Entity = Entity;

Entity.getDigSpeed = function(entity) {
    var defaultDigSpeed = 0.0;
    var itemType = entity.equippedItems.items["tool"];
    if (!itemType || itemType.typeOfType != "shovel") defaultDigSpeed = defaultDigSpeed;
    else defaultDigSpeed = itemType.digSpeed;
    if (entity.movement)
        defaultDigSpeed *= entity.movement.digSpeedMultiplier;
    return defaultDigSpeed;
}

Entity.getBlockBreakSpeed = function(entity) {
    var blockBreakSpeed = 1.0;
    var itemType = entity.equippedItems.items["tool"];
    if (itemType)
        blockBreakSpeed = itemType.blockBreakSpeed || itemType.digSpeed || 1.0;
    if (entity.movement)
        blockBreakSpeed *= entity.movement.blockBreakMultiplier;
    return 10.0 * blockBreakSpeed;
}

Entity.getMaxDigHardness = function(entity) {
    var defaultMaxDigHardness = 0.0;
    var itemType = entity.equippedItems.items["tool"];
    if (!itemType || itemType.typeOfType != "shovel") return defaultMaxDigHardness;
    defaultMaxDigHardness = itemType.maxDigHardnes;
    if (entity.movement)
        defaultMaxDigHardness *= entity.movement.maxDigHardnessMultiplier;
    return defaultMaxDigHardness;
}

Entity.canReload = function(entity, itemType) {
    if (!itemType || !itemType.canReload || !entity.inventory) return false;
    var stackId = entity.inventory.getEquippedStackId("tool");
    if (stackId == null) return false;
    var item = entity.inventory.items[stackId];
    if (!item) return false;
    if (item.magazine != null && item.magazine >= itemType.ammoCapacity)
        return false;
    if (entity.ammo && !entity.ammo[item.id])
        return false;
    return true;
}

Entity.canUseTool = function(entity, itemType) {
    if (!itemType || itemType.typeOfType == "block") return false;
    if (itemType.typeOfType != "rangedWeapon") return true;
    if (!entity.inventory) return false;
    var stackId = entity.inventory.getEquippedStackId("tool");
    if (stackId == null) return false;
    var item = entity.inventory.items[stackId];
    if (!item || item.magazine == null) return false;
    if (item.magazine <= 0) return false;
    return true;
}

Entity.hurt = function(entity, attacker, damage, armorPenentration) {
    if (!isServer)
        return false;
    if (attacker && entity.id != attacker.id && entity.team && attacker.team && entity.team.value != EntityTeam.Enum.None && entity.team.value == attacker.team.value)
        return false;
    if (attacker && attacker.movement)
        damage *= attacker.movement.damageMultiplier;
    var health = entity.health;
    if (!health) return false;
    armorPenentration = armorPenentration || 0.0;
    entity.health.lastAttackerId = attacker.id;
    sendCommand(new CommandEntityHealthChange(entity.id, -Math.min(1.0, (1.0 - health.armor + armorPenentration)) * damage));
    return true;
}
