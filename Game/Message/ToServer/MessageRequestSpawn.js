import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import IndexCounter from "Engine/Core/IndexCounter.js";
import Event from "Engine/Core/Event.js"


import Config from "Game/Config.js";
import PlayerClass from "Game/PlayerClass.js";
import MessageRegister from "Engine/Register/Message.js";;
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
    if (global.gameData.world.tickId - player.deathTick < 20 * Config.respawnTime) return;
    if (!PlayerClass.Register[this.classId]) return;
    if (!this.playerName || this.playerName.length <= 0) {
        this.playerName = "Guest - " + player.id;
    }
    this.playerName = this.playerName.substring(0, 20);
    player.name = this.playerName;
    player.classId = this.classId;

    var entityId = global.gameData.world.idList.next();
    var entity;
    if (global.gameData.gameMode.createEntity) {
        entity = global.gameData.gameMode.createEntity(player, entityId);
    } else {
        entity = entityTemplatePlayer(player.id, entityId, player.name, PlayerClass.Register[this.classId], Team.Enum.None);
    }

    // Set spawn position
    /*var pos = playerSpawns[teamId][Math.random() * playerSpawns[teamId].length >> 0];
    entity.physicsBody.setPos(pos);
    entity.physicsBody.posOld = v2.clone(pos);*/
    Event.trigger(global.gameData.world.events2.onPlayerSpawn, player, entity);
    //}

    //if (entity) {
        sendCommand(new CommandEntitySpawn(global.gameData, entity, entityId));
        sendCommand(new CommandPlayerSpawn(player.id, entityId, player.name));
    /*} else {

        var entities = [];
        global.gameData.world.entityWorld.objectArray.forEach(function(entity) {
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
