
Entity = {};

Entity.onEquip = function(entity, stackId, itemType) {
    if (itemType.typeOfType == "block")
        entity.isBuilding = true;
}

Entity.onDequip = function(entity, stackId, itemType) {
    if (itemType.typeOfType == "block")
        entity.isBuilding = false;
}

Entity.getDigSpeed = function(entity) {
    var defaultDigSpeed = 0.0;
    var itemType = entity.inventory.getEquippedItemType("tool");
    if (!itemType || itemType.typeOfType != "shovel") return defaultDigSpeed;
    return itemType.digSpeed;
}

Entity.getMaxDigHardness = function(entity) {
    var defaultMaxDigHardness = 0.0;
    var itemType = entity.inventory.getEquippedItemType("tool");
    if (!itemType || itemType.typeOfType != "shovel") return defaultMaxDigHardness;
    return itemType.maxDigHardness;
}