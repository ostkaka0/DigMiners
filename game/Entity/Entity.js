
Entity = {};

Entity.onEquip = function(entity, stackId, itemType) {
    if (itemType.typeOfType == "block")
        entity.isBuilding = true;
    gameData.world.events.trigger("equip", entity, stackId, itemType);
}

Entity.onDequip = function(entity, stackId, itemType) {
    if (itemType.typeOfType == "block")
        entity.isBuilding = false;
    gameData.world.events.trigger("dequip", entity, stackId, itemType);
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
    if (!itemType) return false;
    if (itemType.typeOfType != "rangedWeapon") return true;
    if (!entity.inventory) return false;
    var stackId = entity.inventory.getEquippedStackId("tool");
    if (stackId == null) return false;
    var item = entity.inventory.items[stackId];
    if (!item || item.magazine == null) return false;
    if (item.magazine <= 0) return false;
    return true;
}
