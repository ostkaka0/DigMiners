import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import IndexCounter from "Engine/IndexCounter.js";

import Global from "Game/Global.js";
import Config from "Game/Config.js";
import PlayerClass from "Game/PlayerClass.js";
import Message from "Game/Message/Message.js";;
import CommandEntitySpawn from "Game/Command/CommandEntitySpawn.js";
import CommandPlayerSpawn from "Game/Command/CommandPlayerSpawn.js";
import MessageSpectate from "Game/Message/ToClient/MessageSpectate.js";
import entityTemplatePlayer from "Game/Entity/EntityTemplates/Player.js";

var MessageRequestSpawn = function(playerName, classId) {
    this.playerName = playerName;
    this.classId = classId;
}
export default MessageRequestSpawn;
Message.ToServer.push(MessageRequestSpawn);

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
        var classType = PlayerClass.Register[this.classId];
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
