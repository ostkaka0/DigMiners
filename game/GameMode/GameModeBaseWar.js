var Event = require("engine/Core/Event.js")
var Chunk = require("engine/Chunk.js")
var BlockChunk = require("engine/BlockChunk.js")

var Global = require("game/Global.js")
var Team = require("game/Entity/Team.js")
var CommandEntitySpawn = require("game/Command/CommandEntitySpawn.js")

var GameModeBaseWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [Team.Enum.Blue, Team.Enum.Red];
    this.spawnEntities[Team.Enum.Blue] = [];
    this.spawnEntities[Team.Enum.Red] = [];
}
module.exports = GameModeBaseWar

GameModeBaseWar.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        Global.gameData.world.generator.generate(chunk, x, y);
        world.set(x, y, chunk);

        Global.gameData.world.generator.generateDungeons(Global.gameData.world.blockWorld, chunk, x, y);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(Global.gameData.world.tileWorld, x, y);
        }
    }

    this.playerSpawns[Team.Enum.Blue] = [[-60, -40], [-60, 0], [-60, 40]];
    this.playerSpawns[Team.Enum.Red] = [[60, -40],[60, 0],[60, 40]];

    Object.keys(this.playerSpawns).forEach(function(teamId) {
        this.playerSpawns[teamId].forEach(function(pos) {
            var entityId = Global.gameData.world.idList.next();
            var entity = entityTemplateTeamBase(entityId, pos, teamId, 5, 2.0, 40);
            this.spawnEntities[teamId][entityId] = entity;
            sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId, teamId));
            sendCommand(new CommandDig(pos, 5.0));
        }.bind(this));
    }.bind(this));

    Event.subscribe(Global.gameData.world.entityWorld.onRemove, this, function(entity) {
        var team = Team.Enum.none;

        this.teams.forEach(function(currentTeam) {
            if (this.spawnEntities[currentTeam] && this.spawnEntities[currentTeam][entity.id])
                team = currentTeam;
        }.bind(this));
        if (team == Team.Enum.none) return;

        console.log("Base destroyed! " + Object.keys(this.spawnEntities[team]).length-1 + " bases remaining.");

        // Delete spawn
        delete this.spawnEntities[team][entity.id];

        // Delete team
        if (Object.keys(this.spawnEntities[team]).length == 0)
            delete this.spawnEntities[team]

       // End gamemode
        if (Object.keys(this.spawnEntities).length <= 1)
            Global.gameData.changeGameMode();
    }.bind(this));
}

GameModeBaseWar.prototype.name = "Base War";
