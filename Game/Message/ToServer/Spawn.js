









;






var MessageRequestSpawn = function(playerName, classId) {
    this.playerName = playerName;
    this.classId = classId;
}
global.MessageRequestSpawn = MessageRequestSpawn;
RegisterMessage.ToServer.push(MessageRequestSpawn);

MessageRequestSpawn.prototype.execute = function(gameData, player) {
    if (player.entity != null && player.entityId != null) return;
    if (World.tickId - player.deathTick < 20 * Config.respawnTime) return;
    if (!PlayerClass.Register[this.classId]) return;
    if (!this.playerName || this.playerName.length <= 0) {
        this.playerName = "Guest - " + player.id;
    }
    this.playerName = this.playerName.substring(0, 20);
    player.name = this.playerName;
    player.classId = this.classId;

    var entityId = World.idList.next();
    var entity;
    if (gameData.gameMode.createEntity) {
        entity = gameData.gameMode.createEntity(player, entityId);
    } else {
        entity = entityTemplatePlayer(player.id, entityId, player.name, PlayerClass.Register[this.classId], EntityTeam.Enum.None);
    }

    // Set spawn position
    /*var pos = playerSpawns[teamId][Math.random() * playerSpawns[teamId].length >> 0];
    entity.physicsBody.setPos(pos);
    entity.physicsBody.posOld = v2.clone(pos);*/
    Event.trigger(World.events2.onPlayerSpawn, player, entity);
    //}

    //if (entity) {
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId));
        sendCommand(new CommandPlayerSpawn(player.id, entityId, player.name));
    /*} else {

        var entities = [];
        World.entities.objectArray.forEach(function(entity) {
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
