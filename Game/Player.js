
var Player = function(playerId, entityId) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.classId = 0;
    this.text = null;
    this.deathTick = World.tickId;
    this.oreInventory = new Array();
    // Initialized at onSpawn(entity)
    this.xp = 0;
    this.level = 0;
    this.perkLevel = 0;
    this.skillLevels = null;
    this.skillPoints = 0;
}
Player.Events = { onLevelChange: new Map(), onXPChange: new Map(), onPerkChange: new Map(), onSkillChange: new Map() };

Player.prototype.onSpawn = function(entity) {
    this.entityId = entity.id;
    if (!entity.health) return;
    var newXP = 0;
    for (var i = 1; i < this.level - 1; i++) {
        newXP += this.getRequiredXP(i);
    }
    this.xp = 0;
    this.level = 1;
    this.perkLevel = 1;
    this.skillLevels = new Array(PlayerSkillRegister.length).fill(0);
    this.skillPoints = 0;
    this.addXP(newXP);
}

Player.prototype.getRequiredXP = function(level) {
    level = level || this.level;
    var requiredXP = 10 * Math.pow(10.0, (level - 1) / 10.0);
    return 10 * Math.round(requiredXP / Math.pow(10, Math.floor(Math.log10(requiredXP / 10)))) * Math.pow(10, Math.floor(Math.log10(requiredXP / 10)));
}

Player.prototype.addXP = function(xp) {
    var oldLevel = this.level;
    var requiredXP = this.getRequiredXP();
    this.xp += xp;
    while (this.xp >= requiredXP) {
        this.xp -= requiredXP;
        this.level++;
        requiredXP = this.getRequiredXP();
        this.skillPoints++;
    }
    // Skip empty perk levels
    while (this.perkLevel < this.level && !LevelPerks[this.perkLevel + 1])
        this.perkLevel++;

    // Trigger events
    Event.trigger(Player.Events.onXPChange, this);
    if (oldLevel != this.level) {
        Event.trigger(Player.Events.onLevelChange, this);
        Event.trigger(Player.Events.onPerkChange, this);
        Event.trigger(Player.Events.onSkillChange, this);
    }
}

Player.prototype.choosePerk = function(perkId) {
    var perks = LevelPerks[this.perkLevel + 1];
    if (!perks) return;
    this.perkLevel++;
    if (perkId == 0)
        perks.a(this, World.entities.objects[this.entityId]);
    else
        perks.b(this, World.entities.objects[this.entityId]);
    // Skip empty perk levels
    while (this.perkLevel < this.level && !LevelPerks[this.perkLevel + 1])
        this.perkLevel++;
    Event.trigger(Player.Events.onPerkChange, this);
}

Player.prototype.chooseSkill = function(skill) {
    if (this.skillPoints <= 0) return;
    playerSkillApply(World.entities.objects[this.entityId], skill, 1);
    this.skillLevels[skill]++;
    this.skillPoints--;
    Event.trigger(Player.Events.onSkillChange, this);
}

/*Player.prototype.calcOreRecipeQuantity = function(oreRecipe) {
    if (!oreRecipe || oreRecipe.length < 2) return -1
    var numItems = Number.MAX_VALUE;
    for (var i = 0; i < oreRecipe.length; i += 2) {
        var tileType = oreRecipe[i];
        var amount = oreRecipe[i + 1];
        numItems = Math.min(numItems, this.oreInventory[tileType.id] / amount / 255);
    }
    if (numItems >= 1000) return -1;
    return numItems >> 0;
}

Player.prototype.consumeOreRecipe = function(oreRecipe) {
    for (var i = 0; i + 1 < oreRecipe.length; i += 2) {
        var tileType = oreRecipe[i];
        var amount = oreRecipe[i + 1];
        this.oreInventory[tileType.id] -= amount * 255;
    }
}*/

// TODO: Use calcOreRecipeQuantity
Player.prototype.hasRequiredRecipeResources = function(recipe) {
    var entity = World.entities.objects[this.entityId];
    if (!entity) return false;
    for (var j = 0; j < recipe.requiredItems.length; ++j) {
        var itemType = recipe.requiredItems[j][0];
        var amount = recipe.requiredItems[j][1];
        if (entity.inventory.hasItem(itemType.id, amount) === false)
            return false;
    }
    for (var j = 0; j < recipe.requiredOres.length; ++j) {
        var tileType = recipe.requiredOres[j][0];
        var amount = recipe.requiredOres[j][1] * 256.0;
        if (!this.oreInventory[tileType.id] || this.oreInventory[tileType.id] < amount)
            return false;
    }
    return true;
}

Player.prototype.canPlaceBlock = function(x, y) {
    var distBlockPos = [x * 32 + 16, y * 32 + 16];
    var entity = World.entities.objects[this.entityId];
    if (!entity) return false;
    var bodies = [];
    World.physics.getBodiesInRadius(bodies, [x + 0.5, y + 0.5], 0.0);
    if (bodies.length != 0) return false;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return false;
    var distPlayerPos = [physicsBody.getPos()[0] * 32, physicsBody.getPos()[1] * 32];
    var dist = Math.sqrt((distPlayerPos[0] - distBlockPos[0]) * (distPlayerPos[0] - distBlockPos[0]) + (distPlayerPos[1] - distBlockPos[1]) * (distPlayerPos[1] - distBlockPos[1]));
    var blockChunkX = Math.floor(x / BlockChunk.dim);
    var blockChunkY = Math.floor(y / BlockChunk.dim);
    var blockChunk = World.blocks.get([blockChunkX, blockChunkY]);
    var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
    var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;
    if (World.tiles.getDensity([x, y]) > 127) return false;
    if (dist < Config.blockPlaceDistance && (!blockChunk || !blockChunk.getForeground(localX, localY)))
        return true;
    return false;
}

Player.prototype.destroy = function(player) {

}
