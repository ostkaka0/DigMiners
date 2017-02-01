var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Event = require("Engine/Core/Event.js")
var Chunk = require("Engine/Chunk.js")
var TileWorld = require("Engine/TileWorld.js")
var BlockWorld = require("Engine/BlockWorld.js")

var Global = require("Game/Global.js")
var Config = require("Game/Config.js")
var Blocks = require("Game/Blocks.js")
var Items = require("Game/Items.js")
var Team = require("Game/Entity/Team.js")
var Ammo = require("Game/Entity/Ammo.js")
var Spawner = require("Game/Entity/Spawner.js")
var PlayerClass = require("Game/PlayerClass.js")
var CommandEntitySpawn = require("Game/Command/CommandEntitySpawn.js")
var CommandDig = require("Game/Command/CommandDig.js")
var CommandPopupMessage = require("Game/Command/CommandPopupMessage.js")
var CommandPlayerJoin = require("Game/Command/CommandPlayerJoin.js")
var CommandPlayerSpawn = require("Game/Command/CommandPlayerSpawn.js")
var entityTemplateMonsterSpawner = require("Game/Entity/EntityTemplates/MonsterSpawner.js")
var entityTemplatePlayer = require("Game/Entity/EntityTemplates/Player.js")
var entityTemplateZombie = require("Game/Entity/EntityTemplates/Zombie.js")
var entityTemplateMonster = require("Game/Entity/EntityTemplates/Monster.js")
var entityTemplateTeamBase = require("Game/Entity/EntityTemplates/TeamBase.js")
var MessageAmmoChange = require("Game/Message/ToClient/MessageAmmoChange.js")
var CommandEntityHealthChange = require("Game/Command/CommandEntityHealthChange.js")

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
