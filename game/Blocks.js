
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

DoorFunctions = {};
DoorFunctions.bunker = function(startBlockPos, blockType, entity) {
    var checked = [];
    var doors = [];

    var runRecursively = function(blockPos, blockType) {
        doors.push(blockPos);
        sendCommand(new CommandEntityBuild(-1, blockPos[0], blockPos[1], 0, BlockTypes.FOREGROUND));
        var blockPositions = [
            [blockPos[0] + 1, blockPos[1]],
            [blockPos[0] - 1, blockPos[1]],
            [blockPos[0], blockPos[1] + 1],
            [blockPos[0], blockPos[1] - 1],
        ]

        for (var i = 0; i < blockPositions.length; ++i) {
            var pos = blockPositions[i];
            if (checked[pos[0]] == null || !checked[pos[0]][pos[1]]) {
                if (checked[pos[0]] == null)
                    checked[pos[0]] = [];
                checked[pos[0]][pos[1]] = true;
                var blockId = getForeground(gameData.blockWorld, pos[0], pos[1]);
                if (blockType.id == blockId)
                    runRecursively(pos, blockType);
            }

        }
    }
    runRecursively(startBlockPos, blockType);

    var blockTypeId = blockType.id;
    if (doors.length > 0) {
        setTimeout(function() {
            for (var i = 0; i < this.length; ++i) {
                var blockPos = this[i];
                sendCommand(new CommandEntityBuild(-1, blockPos[0], blockPos[1], blockTypeId, BlockTypes.FOREGROUND));
            }
        }.bind(doors), 500);
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

Blocks.BunkerDoor = {
    name: "Bunker Door",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND,
    isDoor: true,
    doorFunction: DoorFunctions.bunker
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
