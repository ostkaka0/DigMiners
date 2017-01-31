var Global = require("Game/Global.js")
var Chunk = require("Engine/Chunk.js")
var BlockChunk = require("Engine/BlockChunk.js")

var Team = require("Game/Entity/Team.js")
var CommandEntitySpawn = require("Game/Command/CommandEntitySpawn.js")

var GameModeSurvivalWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [Team.Enum.Blue, Team.Enum.Red];
    this.spawnEntities[Team.Enum.Blue] = [];
    this.spawnEntities[Team.Enum.Red] = [];
}
module.exports = GameModeSurvivalWar

GameModeSurvivalWar.prototype.init = function() {
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

    this.playerSpawns[Team.Enum.Blue] = [[-60, -60], [-60, 0], [-60, 60]];
    this.playerSpawns[Team.Enum.Red] = [[60, -60],[60, 0],[60, 60]];

    var templates = [entityTemplateMonster, entityTemplateZombie];
    for (var i = 0; i < 25; i++) {
        var pos = [90 * (1.0 - 2.0 * Math.random()), 90 * (1.0 - 2.0 * Math.random())]
        var entityId = Global.gameData.world.idList.next();
        var entity = entityTemplateMonsterSpawner(entityId, pos, entityTemplateZombie, 2, 2.0, 600, null, null, Team.Enum.None);
        this.spawnEntities[entityId] = entity;
        sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId, Team.Enum.none));
        sendCommand(new CommandDig(pos, 5.0));
    }

    // End gamemode after 15 minutes
    Global.gameData.setTimeout(Global.gameData.changeGameMode.bind(Global.gameData), 15 * 60 * 1000);
}

GameModeSurvivalWar.prototype.name = "Survival War";
