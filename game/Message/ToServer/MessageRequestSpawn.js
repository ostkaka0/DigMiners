
MessageRequestSpawn = function(playerName, classId) {
    this.playerName = playerName;
    this.classId = classId;
}

MessageRequestSpawn.prototype.execute = function(gameData, player) {
    if (player.entity != null && player.entityId != null) return;
    if (gameData.world.tickId - player.deathTick < 20 * Config.respawnTime) return;

    if (this.playerName && this.playerName.length > 0)
        player.name = this.playerName;

    var entityId = gameData.world.idList.next();
    var entity = null;
    if (gameData.gameMode.createEntity)
        entity = gameData.gameMode.createEntity(player, entityId, this.classId);
    else {
        var classType = PlayerClassRegister[this.classId];
        var teamId = gameData.gameMode.teams[Math.random() * gameData.gameMode.teams.length >> 0];
        entity = entityTemplates.player(player.id, entityId, player.name, classType, teamId);

        // Set spawn position
        var pos = gameData.gameMode.playerSpawns[teamId][Math.random() * gameData.gameMode.playerSpawns[teamId].length >> 0];
        entity.physicsBody.setPos(pos);
        entity.physicsBody.posOld = v2.clone(pos);
    }

    if (entity) {
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId));
        sendCommand(new CommandPlayerSpawn(player.id, entityId, player.name));
    } else {

        var entities = [];
        gameData.world.entityWorld.objectArray.forEach(function(entity) {
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
