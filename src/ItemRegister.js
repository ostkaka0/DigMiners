
ItemType = function(id, name, texture, isEquipable, isDropable, maxStackSize) {
    this.id = id;
    this.name = name;
    this.texture = texture;
    this.isEquipable = isEquipable;
    this.isDropable = isDropable;
    this.maxStackSize = (!maxStackSize ? Number.MAX_VALUE : maxStackSize);
}

ItemRegister = function() {
    this.itemTypes = [];
    this.mapNameToType = {};
}

ItemRegister.prototype.load = function(gameData) {
    var maxDiggableStackSize = 100 * 256;
    this.register("Dirt", "items/dirt", false, true, maxDiggableStackSize);
    this.register("Stone", "items/stone", false, true, maxDiggableStackSize);
    this.register("Hard stone", "items/hardStone", false, true, maxDiggableStackSize);
    this.register("Very hard stone", "items/veryHardStone", false, true, maxDiggableStackSize);
    this.register("Blue ore", "items/blueOre", false, true, maxDiggableStackSize);
    this.register("Red ore", "items/redOre", false, true, maxDiggableStackSize);
    this.register("Ugly hat", "hats/uglyHat", false, true, 1);
    this.register("Broken hat", "hats/brokenHat", false, true, 1);
}

ItemRegister.prototype.register = function(name, texture, isEquipable, isDropable, maxStackSize) {
    var id = this.itemTypes.length;
    var itemType = new ItemType(id, name, texture, isEquipable, isDropable, maxStackSize);

    if(!isServer && !textures[texture])
        console.log("Item " + name + " texture null.");

    if(this.mapNameToType[name]) {
        return;
    }

    this.itemTypes.push(itemType);
    this.mapNameToType[name] = itemType.id;
}

ItemRegister.prototype.getById = function(id) {
    return this.itemTypes[id];
}

ItemRegister.prototype.getIdByName = function(name) {
    return this.mapNameToType[name];
}

ItemRegister.prototype.createById = function(id, amount) {
    var itemType = this.itemTypes[id];
    return { 'id': id, 'name': itemType.name, 'amount': amount };
}
