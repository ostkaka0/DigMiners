
global.GameModeSurvivalWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [EntityTeam.Enum.Blue, EntityTeam.Enum.Red];
    this.spawnEntities[EntityTeam.Enum.Blue] = [];
    this.spawnEntities[EntityTeam.Enum.Red] = [];
}

GameModeSurvivalWar.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        World.generator.generate(chunk, x, y);
        world.set([x, y], chunk);

        World.generator.generateDungeons(World.blocks, chunk, x, y);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(World.tiles, x, y);
        }
    }

    this.playerSpawns[EntityTeam.Enum.Blue] = [[-20, -20], [-20, 0], [-20, 20]];
    this.playerSpawns[EntityTeam.Enum.Red] = [[20, -20],[20, 0],[20, 20]];
    sendCommand(new CommandWorldSpawnStatus(this.playerSpawns, true));


    Object.keys(this.playerSpawns).forEach(function(team) {
        var array = this.playerSpawns[team];
        array.forEach(function(pos) {
            sendCommand(new CommandDig(pos, 2.0));
        }.bind(this))
    }.bind(this))

    var templates = [entityTemplateMonster, entityTemplateZombie];
    for (var i = 0; i < 25; i++) {
        var pos = [90 * (1.0 - 2.0 * Math.random()), 90 * (1.0 - 2.0 * Math.random())]
        var entityId = World.idList.next();
        var entity = entityTemplateMonsterSpawner(entityId, pos, entityTemplateZombie, 2, 5.0, 1200, null, null, EntityTeam.Enum.None);
        this.spawnEntities[entityId] = entity;
        sendCommand(new CommandEntitySpawn(entity, entityId, EntityTeam.Enum.none));
        sendCommand(new CommandDig(pos, 5.0));
    }

    // End gamemode after 15 minutes
    worldSetTimeout(gameModeChange, 15 * 60 * 1000);

    // End game when less than 2 players, activate after 60 seconds
    worldSetTimeout(() => {
        Game.playerWorld.onRemove.set(this, (player) => {
            if (Game.playerWorld.objectArray.length < 2)
                gameModeChange();
        });
    }, 60 * 1000);
}

GameModeSurvivalWar.prototype.destroy = function() {
    Event.unsubscribe(Game.playerWorld.onRemove, this);
}

GameModeSurvivalWar.prototype.name = "Survival War";
