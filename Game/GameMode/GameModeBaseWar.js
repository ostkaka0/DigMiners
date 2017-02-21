import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Event from "Engine/Core/Event.js";
import Chunk from "Engine/Chunk.js";
import TileWorld from "Engine/TileWorld.js";
import BlockWorld from "Engine/BlockWorld.js";


import Config from "Game/Config.js";
import Blocks from "Game/Blocks.js";
import Items from "Game/Items.js";
import EntityTeam from "Game/Entity/Team.js";
import EntityAmmo from "Game/Entity/Ammo.js";
import EntitySpawner from "Game/Entity/Spawner.js";
import PlayerClass from "Game/PlayerClass.js";
import CommandEntitySpawn from "Game/Command/CommandEntitySpawn.js";
import CommandDig from "Game/Command/CommandDig.js";
import CommandPopupMessage from "Game/Command/CommandPopupMessage.js";
import CommandPlayerJoin from "Game/Command/CommandPlayerJoin.js";
import CommandPlayerSpawn from "Game/Command/CommandPlayerSpawn.js";
import entityTemplateMonsterSpawner from "Game/Entity/EntityTemplates/MonsterSpawner.js";
import entityTemplatePlayer from "Game/Entity/EntityTemplates/Player.js";
import entityTemplateZombie from "Game/Entity/EntityTemplates/Zombie.js";
import entityTemplateMonster from "Game/Entity/EntityTemplates/Monster.js";
import entityTemplateTeamBase from "Game/Entity/EntityTemplates/TeamBase.js";
import MessageAmmoChange from "Game/Message/ToClient/MessageAmmoChange.js";
import CommandEntityHealthChange from "Game/Command/CommandEntityHealthChange.js";

var GameModeBaseWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [EntityTeam.Enum.Blue, EntityTeam.Enum.Red];
    this.spawnEntities[EntityTeam.Enum.Blue] = [];
    this.spawnEntities[EntityTeam.Enum.Red] = [];
    this.playerSpawning = true;
}
export default GameModeBaseWar

GameModeBaseWar.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        global.gameData.world.generator.generate(chunk, x, y);
        world.set([x, y], chunk);

        global.gameData.world.generator.generateDungeons(global.gameData.world.blockWorld, chunk, x, y);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(global.gameData.world.tileWorld, x, y);
        }
    }

    this.playerSpawns[EntityTeam.Enum.Blue] = [[-40, -40], [-40, 0], [-40, 10]];
    this.playerSpawns[EntityTeam.Enum.Red] = [[40, -40],[40, 0],[40, 10]];

    Object.keys(this.playerSpawns).forEach(function(teamId) {
        this.playerSpawns[teamId].forEach(function(pos) {
            var entityId = global.gameData.world.idList.next();
            var entity = entityTemplateTeamBase(entityId, pos, teamId, 5, 2.0, 40);
            this.spawnEntities[teamId][entityId] = entity;
            sendCommand(new CommandEntitySpawn(global.gameData, entity, entityId, teamId));
            sendCommand(new CommandDig(pos, 5.0));
        }.bind(this));
    }.bind(this));

    Event.subscribe(global.gameData.world.entityWorld.onRemove, this, function(entity) {
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
            global.gameData.changeGameMode();
    }.bind(this));
}

GameModeBaseWar.prototype.name = "Base War";
