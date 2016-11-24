
BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1
}

Blocks = {};

BulletFunctions = {};
BulletFunctions.bunker = function(blockPos, blockType, entity) {
    // Fix of diagonal shooting
    if (entity.projectile.lastBunkerPos) {
        if (v2.distance(entity.projectile.lastBunkerPos, entity.projectile.pos) < 0.75)
            return;
    }
    entity.projectile.lastBunkerPos = v2.clone(entity.projectile.pos);
    
    var entityPos = entity.projectile.startPos;
    var deltaPos = [blockPos[0] + 0.5 - entityPos[0], blockPos[1] + 0.5 - entityPos[1]];
    deltaPos = [Math.max(0, Math.abs(deltaPos[0]) - 0.5), Math.max(0, Math.abs(deltaPos[1]) - 0.5)];
    var dis = v2.length(deltaPos);
    var rand = noiseRand(noiseRand(noiseRand(noiseRand(blockPos[0]) ^ blockPos[1]) ^ gameData.tickId) ^ entity.id) % 100;
    var damageFactor;
    if (dis > blockType.bulletBunkerDistance)
        damageFactor = blockType.bulletBunkerFarFactor;
    else
        damageFactor = blockType.bulletBunkerNearFactor;
        
    if (rand > damageFactor * 100) {
        gameData.events.trigger("projectileHitBlock", entity, blockPos);
        entity.projectile.hit = true;
        return;
    }
}

Blocks.Null = {
    name: "Air",
    isSolid: false,
    hardness: 0,
    type: -1
}

Blocks.StoneWall = {
    name: "Stone Wall",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND
};

Blocks.WoodCrate = {
    name: "Wood Crate",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND
};

Blocks.StoneFloor = {
    name: "Stone Floor",
    isSolid: false,
    hardness: 1.0,
    type: BlockTypes.BACKGROUND
};

Blocks.BunkerWindow = {
    name: "Bunker Window",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND,
    isBulletSolid: false,
    bulletFunction: BulletFunctions.bunker,
    bulletBunkerDistance: 1.0,
    bulletBunkerNearFactor: 1.0,
    bulletBunkerFarFactor: 0.5
}

Blocks.ForceField = {
    name: "Bunker Window",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND,
    isBulletSolid: false,
    bulletFunction: BulletFunctions.bunker,
    bulletBunkerDistance: 1.0,
    bulletBunkerNearFactor: 1.0,
    bulletBunkerFarFactor: 0.0
}
