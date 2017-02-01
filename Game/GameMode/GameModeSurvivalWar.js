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
var MessageAmmoChange = require("Game/Message/ToClient/MessageAmmoChange.js")
var CommandEntityHealthChange = require("Game/Command/CommandEntityHealthChange.js")

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
