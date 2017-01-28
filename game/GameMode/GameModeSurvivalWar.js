import Global from "game/Global.js"
import Chunk from "engine/Chunk.js"
import BlockChunk from "engine/BlockChunk.js"

import { Team, Teams } from "game/Entity/Team.js"
import CommandEntitySpawn from "game/Command/CommandEntitySpawn.js"

var GameModeSurvivalWar = function() {
    this.playerSpawns = {};
    this.spawnEntities = {};
    this.teams = [Teams.Blue, Teams.Red];
    this.spawnEntities[Teams.Blue] = [];
    this.spawnEntities[Teams.Red] = [];
}
export default GameModeSurvivalWar

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

    this.playerSpawns[Teams.Blue] = [[-60, -60], [-60, 0], [-60, 60]];
    this.playerSpawns[Teams.Red] = [[60, -60],[60, 0],[60, 60]];

    var templates = [entityTemplateMonster, entityTemplateZombie];
    for (var i = 0; i < 25; i++) {
        var pos = [90 * (1.0 - 2.0 * Math.random()), 90 * (1.0 - 2.0 * Math.random())]
        var entityId = Global.gameData.world.idList.next();
        var entity = entityTemplateMonsterSpawner(entityId, pos, entityTemplateZombie, 2, 2.0, 600, null, null, Teams.None);
        this.spawnEntities[entityId] = entity;
        sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId, Teams.none));
        sendCommand(new CommandDig(pos, 5.0));
    }

    // End gamemode after 15 minutes
    Global.gameData.setTimeout(Global.gameData.changeGameMode.bind(Global.gameData), 15 * 60 * 1000);
}

GameModeSurvivalWar.prototype.name = "Survival War";
