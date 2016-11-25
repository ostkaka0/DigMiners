
BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1
}

Blocks = {};

BlockBulletFunctions = {};
BlockBulletFunctions.bunker = function(blockPos, blockType, entity) {
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

BlockDoorFunctions = {};
BlockDoorFunctions.redForcefield = function(startBlockPos, blockType, entity, clickType) {
    var checked = [];
    var doors = [];

    var runRecursively = function(blockPos, blockType) {
        doors.push(blockPos);
        var blockPositions = [
            [blockPos[0] + 1, blockPos[1]],
            [blockPos[0] - 1, blockPos[1]],
            [blockPos[0], blockPos[1] + 1],
            [blockPos[0], blockPos[1] - 1],
        ]

        for (var i = 0; i < blockPositions.length; ++i) {
            var pos = blockPositions[i];
            if (checked[pos[0]] == null || checked[pos[0]][pos[1]] == null) {
                if (checked[pos[0]] == null)
                    checked[pos[0]] = [];
                checked[pos[0]][pos[1]] = getStrength(gameData.blockWorld, pos[0], pos[1]);
                var blockId = getForeground(gameData.blockWorld, pos[0], pos[1]);
                if (blockType.id == blockId)
                    runRecursively(pos, blockType);
            }

        }
    }
    checked[startBlockPos[0]] = [];
    checked[startBlockPos[0]][startBlockPos[1]] = getStrength(gameData.blockWorld, startBlockPos[0], startBlockPos[1]);
    runRecursively(startBlockPos, blockType);

    // Too big doors should not work.
    if (doors.length > blockType.maxDoorSize)
        return;

    setTimeout(function() {
        for (var i = 0; i < doors.length; ++i) {
            var blockPos = doors[i];
            sendCommand(new CommandEntityBuild(-1, blockPos[0], blockPos[1], Blocks.RedForcefieldOpen.id, BlockTypes.FOREGROUND));
            sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], checked[blockPos[0]][blockPos[1]]));
            //sendCommand(new CommandParticles(Particles.Door.id, [blockPos[0] + 0.5, blockPos[1] + 0.5], 100));
        }

        var blockTypeId = blockType.id;
        if (doors.length > 0) {
            setTimeout(function() {
                for (var i = 0; i < this.length; ++i) {
                    var blockPos = this[i];
                    sendCommand(new CommandEntityBuild(-1, blockPos[0], blockPos[1], blockTypeId, BlockTypes.FOREGROUND));
                    sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], checked[blockPos[0]][blockPos[1]]));
                }
            }.bind(this), blockType.doorOpenTime);
        }
    }.bind(doors), blockType.doorOpenDelay);
}

BlockDoorFunctions.blueForcefield = function(blockPos, blockType, entity, clickType) {
    var startStrength = getStrength(gameData.blockWorld, blockPos[0], blockPos[1]);
    setTimeout(function() {
        sendCommand(new CommandEntityBuild(-1, blockPos[0], blockPos[1], Blocks.BlueForcefieldOpen.id, BlockTypes.FOREGROUND));
        sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], startStrength));
        //sendCommand(new CommandParticles(Particles.Door.id, [startBlockPos[0] + 0.5, startBlockPos[1] + 0.5], 100));

        var blockTypeId = blockType.id;
        setTimeout(function() {
            sendCommand(new CommandEntityBuild(-1, blockPos[0], blockPos[1], blockTypeId, BlockTypes.FOREGROUND));
            sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], startStrength));
        }, blockType.doorOpenTime);
    }, blockType.doorOpenDelay);
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
    bulletFunction: BlockBulletFunctions.bunker,
    bulletBunkerDistance: 1.0,
    bulletBunkerNearFactor: 1.0,
    bulletBunkerFarFactor: 0.5
}

Blocks.BlueForcefield = {
    name: "Blue Forcefield",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND,
    isDoor: true,
    clickFunction: BlockDoorFunctions.blueForcefield,
    maxDoorSize: 1,
    doorOpenTime: 1000,
    doorOpenDelay: 200
}

Blocks.RedForcefield = {
    name: "Red Forcefield",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND,
    isDoor: true,
    clickFunction: BlockDoorFunctions.redForcefield,
    maxDoorSize: 4,
    doorOpenTime: 1000,
    doorOpenDelay: 200
}

Blocks.BlueForcefieldOpen = {
    name: "Blue Forcefield",
    isSolid: false,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND
}

Blocks.RedForcefieldOpen = {
    name: "Red Forcefield",
    isSolid: false,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND
}
