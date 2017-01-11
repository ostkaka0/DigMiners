
MessageRequestSpawn = function(playerName) {
    this.playerName = playerName;
}

MessageRequestSpawn.prototype.execute = function(gameData, player) {
    if (player.entity != null && player.entityId != null) return;
    if (gameData.tickId - player.deathTick < 20 * gameData.respawnTime) return;

    var entityId = gameData.idList.next();
    var entity = entityTemplates.player(player.id, entityId, this.playerName, gameData);

    // Set spawn position
    var pos = gameData.spawnPoints[Math.floor(Math.random() * gameData.spawnPoints.length)];
    entity.physicsBody.setPos(pos);
    entity.physicsBody.posOld = v2.clone(pos);

    console.log("spawning entity " + entityId + " at " + pos);
    sendCommand(new CommandEntitySpawn(gameData, entity, entityId));
    sendCommand(new CommandPlayerSpawn(player.id, entityId, this.playerName));
}

MessageRequestSpawn.prototype.send = function(socket) {
    socket.emit(this.idString, this.playerName);
}

MessageRequestSpawn.prototype.receive = function(gameData, data) {
    this.playerName = data;
}
