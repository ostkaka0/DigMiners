
GameModeSurvivalWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [Teams.Blue, Teams.Red];
    this.spawnEntities[Teams.Blue] = [];
    this.spawnEntities[Teams.Red] = [];
}

GameModeSurvivalWar.prototype.init = function() {
    if (!isServer) return;
    
    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        gameData.world.generator.generate(chunk, x, y);
        world.set(x, y, chunk);

        gameData.world.generator.generateDungeons(gameData.world.blockWorld, chunk, x, y);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(gameData.world.tileWorld, x, y);
        }
    }
    
    this.playerSpawns[Teams.Blue] = [[-60, -60], [-60, 0], [-60, 60]];
    this.playerSpawns[Teams.Red] = [[60, -60],[60, 0],[60, 60]];
    
    var templates = [entityTemplates.Monster, entityTemplates.Zombie];
    for (var i = 0; i < 25; i++) {
        var pos = [90 * (1.0 - 2.0 * Math.random()), 90 * (1.0 - 2.0 * Math.random())]
        var entityId = gameData.world.idList.next();
        var entity = entityTemplates.MonsterSpawner(entityId, pos, entityTemplates.Zombie, 2, 2.0, 600, null, null, Teams.None);
        this.spawnEntities[entityId] = entity;
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId, Teams.none));
        sendCommand(new CommandDig(pos, 5.0));
    }
    
    // End gamemode after 15 minutes
    gameData.setTimeout(gameData.changeGameMode.bind(gameData), 15 * 60 * 1000);
}

GameModeSurvivalWar.prototype.name = "Survival War";
