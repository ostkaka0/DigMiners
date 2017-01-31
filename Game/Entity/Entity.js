var Global = require("Game/Global.js")

var Items = require("Game/Items.js")
var Team = require("Game/Entity/Team.js")
var CommandEntityHealthChange = require("Game/Command/CommandEntityHealthChange.js")

var Entity = module.exports;

Entity.onEquip = function(entity, stackId, itemType) {
    if (itemType.typeOfType == "block")
        entity.isBuilding = true;
    Global.gameData.world.events.trigger("equip", entity, stackId, itemType);
}

Entity.onDequip = function(entity, stackId, itemType) {
    if (itemType.typeOfType == "block")
        entity.isBuilding = false;
    Global.gameData.world.events.trigger("dequip", entity, stackId, itemType);
}

Entity.getDigSpeed = function(entity) {
    var defaultDigSpeed = 0.0;
    var itemType = entity.equippedItems.items["tool"];
    if (!itemType || itemType.typeOfType != "shovel") defaultDigSpeed = defaultDigSpeed;
    else defaultDigSpeed = itemType.digSpeed
    return defaultDigSpeed;
}

Entity.getBlockBreakSpeed = function(entity) {
    var blockBreakSpeed = 1.0;
    var itemType = entity.equippedItems.items["tool"];
    if (itemType)
        blockBreakSpeed = itemType.blockBreakSpeed || 1.0;
    if (entity.movement)
        blockBreakSpeed *= entity.movement.digHardnessMultiplier;
    return blockBreakSpeed;
}

Entity.getMaxDigHardness = function(entity) {
    var defaultMaxDigHardness = 0.0;
    var itemType = entity.equippedItems.items["tool"];
    if (!itemType || itemType.typeOfType != "shovel") return defaultMaxDigHardness;
    return itemType.maxDigHardness;
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
    if (attacker && entity.id != attacker.id && entity.team && attacker.team && entity.team.value != Team.Enum.None && entity.team.value == attacker.team.value)
        return false;
    if (attacker && attacker.movement)
        damage *= attacker.movement.damageMultiplier;
    var health = entity.health;
    if (!health) return false;
    armorPenentration = armorPenentration || 0.0;

    sendCommand(new CommandEntityHealthChange(entity.id, -Math.min(1.0, (1.0 - health.armor + armorPenentration)) * damage));
    return true;
}