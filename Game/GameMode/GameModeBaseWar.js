import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Event from "Engine/Core/Event.js";
import Chunk from "Engine/Chunk.js";
import TileWorld from "Engine/TileWorld.js";
import BlockWorld from "Engine/BlockWorld.js";

import Global from "Game/Global.js";
import Config from "Game/Config.js";
import Blocks from "Game/Blocks.js";
import Items from "Game/Items.js";
import Team from "Game/Entity/Team.js";
import Ammo from "Game/Entity/Ammo.js";
import Spawner from "Game/Entity/Spawner.js";
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
    this.teams = [Team.Enum.Blue, Team.Enum.Red];
    this.spawnEntities[Team.Enum.Blue] = [];
    this.spawnEntities[Team.Enum.Red] = [];
}
export default GameModeBaseWar

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
