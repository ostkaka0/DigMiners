import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import { Serialize, Deserialize } from "engine/Serialization.js"
import IndexCounter from "engine/IndexCounter.js"

import Global from "game/Global.js"
import Config from "game/Config.js"
import PlayerClass from "game/PlayerClass.js"
import CommandEntitySpawn from "game/Command/CommandEntitySpawn.js"
import CommandPlayerSpawn from "game/Command/CommandPlayerSpawn.js"
import MessageSpectate from "game/Message/ToClient/MessageSpectate.js"

var MessageRequestSpawn = function(playerName, classId) {
    this.playerName = playerName;
    this.classId = classId;
}
export default MessageRequestSpawn

MessageRequestSpawn.prototype.execute = function(gameData, player) {
    if (player.entity != null && player.entityId != null) return;
    if (Global.gameData.world.tickId - player.deathTick < 20 * Config.respawnTime) return;

    if (this.playerName && this.playerName.length > 0)
        player.name = this.playerName;

    var entityId = Global.gameData.world.idList.next();
    var entity = null;
    if (Global.gameData.gameMode.createEntity)
        entity = Global.gameData.gameMode.createEntity(player, entityId, this.classId);
    else {
        var classType = PlayerClassRegister[this.classId];
        var teamId = Global.gameData.gameMode.teams[Math.random() * Global.gameData.gameMode.teams.length >> 0];
        entity = entityTemplatePlayer(player.id, entityId, player.name, classType, teamId);

        // Set spawn position
        var pos = Global.gameData.gameMode.playerSpawns[teamId][Math.random() * Global.gameData.gameMode.playerSpawns[teamId].length >> 0];
        entity.physicsBody.setPos(pos);
        entity.physicsBody.posOld = v2.clone(pos);
    }

    if (entity) {
        sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId));
        sendCommand(new CommandPlayerSpawn(player.id, entityId, player.name));
    } else {

        var entities = [];
        Global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
            if (entity.physicsBody)
                entities.push(entity);
        });

        if (entities.length > 0) {
            var spectateEntity = entities[Math.floor(Math.random() * entities.length)];
            new MessageSpectate(spectateEntity.id).send(player.socket);
        }
    }
}

MessageRequestSpawn.prototype.send = function(socket) {
    socket.emit(this.idString, [this.playerName, this.classId]);
}

MessageRequestSpawn.prototype.receive = function(gameData, data) {
    this.playerName = data[0];
    this.classId = data[1];
}
