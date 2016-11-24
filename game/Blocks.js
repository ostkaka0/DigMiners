
BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1
}

Blocks = {};

BulletFunctions = {};
BulletFunctions.bunker = function(blockPos, blockType, entity) {
    var entityPos = entity.projectile.startPos;
    var deltaPos = [blockPos[0] + 0.5 - entityPos[0], blockPos[1] + 0.5 - entityPos[1]];
    deltaPos = [Math.max(0, Math.abs(deltaPos[0]) - 0.5), Math.max(0, Math.abs(deltaPos[1]) - 0.5)];
    var dis = v2.length(deltaPos);
    var damageFactor;
    if (dis > blockType.bulletBunkerDistance)
        damageFactor = blockType.bulletBunkerFarFactor;
    else
        damageFactor = blockType.bulletBunkerNearFactor;
    if (damageFactor < entity.projectile.damageFactor) {
        entity.projectile.damageFactor = damageFactor;
        if (entity.projectile.sprite) {
            entity.projectile.sprite.scale.x = damageFactor;
            entity.projectile.sprite.scale.y = damageFactor;
        }
        if (dis > blockType.bulletBunkerDistance) {
            if (!isServer)
                createDespawningParticles(entity.projectile.projectileType.hitParticle(), [blockPos[0] + 0.5, blockPos[1] + 0.5], 200);
        }
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
    bulletBunkerDistance: 2.0,
    bulletBunkerNearFactor: 0.8,
    bulletBunkerFarFactor: 0.4
}
