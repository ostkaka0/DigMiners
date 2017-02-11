import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import IndexCounter from "Engine/IndexCounter.js";
import Event from "Engine/Core/Event.js"

import Global from "Game/Global.js";
import Config from "Game/Config.js";
import PlayerClass from "Game/PlayerClass.js";
import MessageRegister from "Game/Register/Message.js";;
import CommandEntitySpawn from "Game/Command/CommandEntitySpawn.js";
import CommandPlayerSpawn from "Game/Command/CommandPlayerSpawn.js";
import MessageSpectate from "Game/Message/ToClient/MessageSpectate.js";
import entityTemplatePlayer from "Game/Entity/EntityTemplates/Player.js";
import entityTemplateGhost from "Game/Entity/EntityTemplates/Ghost.js";

var MessageRequestSpawn = function(playerName, classId) {
    this.playerName = playerName;
    this.classId = classId;
}
export default MessageRequestSpawn;
MessageRegister.ToServer.push(MessageRequestSpawn);

MessageRequestSpawn.prototype.execute = function(gameData, player) {
    if (player.entity != null && player.entityId != null) return;
    if (Global.gameData.world.tickId - player.deathTick < 20 * Config.respawnTime) return;
    if (Object.keys(global.gameData.world.playerSpawns).length == 0) return;


    if (this.playerName && this.playerName.length > 0)
        player.name = this.playerName;

    var entityId = Global.gameData.world.idList.next();
    var entity;
    var playerSpawns = Global.gameData.world.playerSpawns;
    var teamId = Object.keys(playerSpawns)[Math.random() * Object.keys(playerSpawns).length >> 0];
    var classType = PlayerClass.Register[this.classId];
    if (classType == undefined) return;
    if (Global.gameData.gameMode.createEntity) {
        entity = Global.gameData.gameMode.createEntity(player, entityId, this.classId);
    } else {
        entity = entityTemplatePlayer(player.id, entityId, player.name, classType, teamId);
    }

    // Set spawn position
    var pos = playerSpawns[teamId][Math.random() * playerSpawns[teamId].length >> 0];
    entity.physicsBody.setPos(pos);
    entity.physicsBody.posOld = v2.clone(pos);
    Event.trigger(global.gameData.world.events2.onPlayerSpawn, player, entity);
    //}

    //if (entity) {
        sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId));
        sendCommand(new CommandPlayerSpawn(player.id, entityId, player.name));
    /*} else {

        var entities = [];
        Global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
            if (entity.physicsBody)
                entities.push(entity);
        });

        if (entities.length > 0) {
            var spectateEntity = entities[Math.floor(Math.random() * entities.length)];
            new MessageSpectate(spectateEntity.id).send(player.socket);
        }
    }*/
}

MessageRequestSpawn.prototype.send = function(socket) {
    socket.emit(this.idString, [this.playerName, this.classId]);
}

MessageRequestSpawn.prototype.receive = function(gameData, data) {
    this.playerName = data[0];
    this.classId = data[1];
}
