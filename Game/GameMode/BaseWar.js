



























global.GameModeBaseWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [EntityTeam.Enum.Blue, EntityTeam.Enum.Red];
    this.spawnEntities[EntityTeam.Enum.Blue] = [];
    this.spawnEntities[EntityTeam.Enum.Red] = [];
    this.playerSpawning = true;
}
global.GameModeBaseWar = GameModeBaseWar;

GameModeBaseWar.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        World.generator.generate(chunk, x, y);
        world.set([x, y], chunk);

        World.generator.generateDungeons(World.blockWorld, chunk, x, y);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(World.tileWorld, x, y);
        }
    }

    this.playerSpawns[EntityTeam.Enum.Blue] = [[-40, -40], [-40, 0], [-40, 10]];
    this.playerSpawns[EntityTeam.Enum.Red] = [[40, -40],[40, 0],[40, 10]];

    Object.keys(this.playerSpawns).forEach(function(teamId) {
        this.playerSpawns[teamId].forEach(function(pos) {
            var entityId = World.idList.next();
            var entity = entityTemplateTeamBase(entityId, pos, teamId, 5, 2.0, 40);
            this.spawnEntities[teamId][entityId] = entity;
            sendCommand(new CommandEntitySpawn(gameData, entity, entityId, teamId));
            sendCommand(new CommandDig(pos, 5.0));
        }.bind(this));
    }.bind(this));

    World.entities.onRemove.set(this, function(entity) {
        var team = EntityTeam.Enum.none;

        this.teams.forEach(function(currentTeam) {
            if (this.spawnEntities[currentTeam] && this.spawnEntities[currentTeam][entity.id])
                team = currentTeam;
        }.bind(this));
        if (team == EntityTeam.Enum.none) return;

        console.log("Base destroyed! " + Object.keys(this.spawnEntities[team]).length-1 + " bases remaining.");

        // Delete spawn
        delete this.spawnEntities[team][entity.id];

        // Delete team
        if (Object.keys(this.spawnEntities[team]).length == 0)
            delete this.spawnEntities[team]

       // End gamemode
        if (Object.keys(this.spawnEntities).length <= 1)
            gameData.changeGameMode();
    }.bind(this));
}

GameModeBaseWar.prototype.name = "Base War";
