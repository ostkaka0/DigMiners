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
import MessageAmmoChange from "Game/Message/ToClient/MessageAmmoChange.js";
import CommandEntityHealthChange from "Game/Command/CommandEntityHealthChange.js";
import CommandWorldSpawnStatus from "Game/Command/CommandWorldSpawnStatus.js"

var GameModeSurvivalWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [Team.Enum.Blue, Team.Enum.Red];
    this.spawnEntities[Team.Enum.Blue] = [];
    this.spawnEntities[Team.Enum.Red] = [];
}
export default GameModeSurvivalWar

GameModeSurvivalWar.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        Global.gameData.world.generator.generate(chunk, x, y);
        world.set([x, y], chunk);

        Global.gameData.world.generator.generateDungeons(Global.gameData.world.blockWorld, chunk, x, y);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(Global.gameData.world.tileWorld, x, y);
        }
    }

    this.playerSpawns[Team.Enum.Blue] = [[-20, -20], [-20, 0], [-20, 20]];
    this.playerSpawns[Team.Enum.Red] = [[20, -20],[20, 0],[20, 20]];
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
        var entityId = Global.gameData.world.idList.next();
        var entity = entityTemplateMonsterSpawner(entityId, pos, entityTemplateZombie, 2, 5.0, 1200, null, null, Team.Enum.None);
        this.spawnEntities[entityId] = entity;
        sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId, Team.Enum.none));
        sendCommand(new CommandDig(pos, 5.0));
    }

    // End gamemode after 15 minutes
    Global.gameData.setTimeout(Global.gameData.changeGameMode.bind(Global.gameData), 15 * 60 * 1000);

    // End game when less than 2 players, activate after 60 seconds
    Global.gameData.setTimeout(() => {
        Event.subscribe(Global.gameData.playerWorld.onRemove, this, (player) => {
            if (Global.gameData.playerWorld.objectArray.length < 2)
                Global.gameData.changeGameMode();
        });
    }, 60 * 1000);
}

GameModeSurvivalWar.prototype.destroy = function() {
    Event.unsubscribe(Global.gameData.playerWorld.onRemove, this);
}

GameModeSurvivalWar.prototype.name = "Survival War";
