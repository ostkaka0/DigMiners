
MessageRequestSpawn = function(playerName, classId) {
    this.playerName = playerName;
    this.classId = classId;
}

MessageRequestSpawn.prototype.execute = function(gameData, player) {
    if (player.entity != null && player.entityId != null) return;
    if (gameData.tickId - player.deathTick < 20 * gameData.respawnTime) return;

    var entityId = gameData.idList.next();
    var classType = PlayerClassRegister[this.classId];
    var entity = entityTemplates.player(player.id, entityId, this.playerName, classType);

    // Set spawn position
    var pos = gameData.spawnPoints[Math.floor(Math.random() * gameData.spawnPoints.length)];
    entity.physicsBody.setPos(pos);
    entity.physicsBody.posOld = v2.clone(pos);

    console.log("spawning entity " + entityId + " at " + pos);
    sendCommand(new CommandEntitySpawn(gameData, entity, entityId));
    sendCommand(new CommandPlayerSpawn(player.id, entityId, this.playerName));

    classType.weapons.forEach(function(weapon) {
        sendCommand(new CommandEntityInventory(entityId, InventoryActions.ADD_ITEM, weapon.id, 1));
    });
    classType.blocks.forEach(function(blockItem) {
        sendCommand(new CommandEntityInventory(entityId, InventoryActions.ADD_ITEM, blockItem.id, 16));
    });
    sendCommand(new CommandEntityInventory(entityId, InventoryActions.ADD_ITEM, Items.Egg.id, 1000));
}

MessageRequestSpawn.prototype.send = function(socket) {
    socket.emit(this.idString, [this.playerName, this.classId]);
}

MessageRequestSpawn.prototype.receive = function(gameData, data) {
    this.playerName = data[0];
    this.classId = data[1];
}
