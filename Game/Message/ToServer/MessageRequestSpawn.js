var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var IndexCounter = require("Engine/IndexCounter.js")

var Global = require("Game/Global.js")
var Config = require("Game/Config.js")
var PlayerClass = require("Game/PlayerClass.js")
var CommandEntitySpawn = require("Game/Command/CommandEntitySpawn.js")
var CommandPlayerSpawn = require("Game/Command/CommandPlayerSpawn.js")
var MessageSpectate = require("Game/Message/ToClient/MessageSpectate.js")
var entityTemplatePlayer = require("Game/Entity/EntityTemplates/Player.js")

var MessageRequestSpawn = function(playerName, classId) {
    this.playerName = playerName;
    this.classId = classId;
}
module.exports = MessageRequestSpawn

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
