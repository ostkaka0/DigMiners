
ItemType = function(id, name, texture, isEquipable, isDropable, isDigable, maxStackSize) {
    this.id = id;
    this.name = name;
    this.texture = texture;
    this.isEquipable = isEquipable;
    this.isDropable = isDropable;
    this.isDigable = isDigable;
    this.maxStackSize = (!maxStackSize ? Number.MAX_VALUE : maxStackSize);
}

ItemRegister = function() {
    this.itemTypes = [];
    this.mapNameToType = {};
}

ItemRegister.prototype.load = function(gameData) {
    var maxDiggableStackSize = 100 * 256;
    var digablesShouldDrop = true;
    this.register("Dirt", "items/dirt", false, digablesShouldDrop, true);
    this.register("Stone", "items/stone", false, digablesShouldDrop, true);
    this.register("Hard stone", "items/hardStone", false, digablesShouldDrop, true);
    this.register("Very hard stone", "items/veryHardStone", false, digablesShouldDrop, true);
    this.register("Blue ore", "items/blueOre", false, digablesShouldDrop, true);
    this.register("Red ore", "items/redOre", false, digablesShouldDrop, true);
    this.register("Ugly hat", "hats/uglyHat", true, true, false, 1);
    this.register("Broken hat", "hats/brokenHat", true, true, false, 1);
}

ItemRegister.prototype.register = function(name, texture, isEquipable, isDropable, isDigable, maxStackSize) {
    var id = this.itemTypes.length;
    var itemType = new ItemType(id, name, texture, isEquipable, isDropable, isDigable, maxStackSize);

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
