MessagePlayerJoin = function(player) {
    if (player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
        this.playerName = player.name;
    }
}

MessagePlayerJoin.prototype.execute = function(gameData) {
    console.log(playerName + " connected with playerId " + playerId);
    entityTemplates.player(this.playerId, this.entityId, this.playerName, gameData);
}

MessagePlayerJoin.prototype.send = function(socket) {
    socket.send(this.idString, [this.playerId, this.entityId, this.playerName]);
}

MessagePlayerJoin.prototype.receive = function(gameData, data) {
    this.playerId = data[0];
    this.entityId = data[1];
    this.playerName = data[2];
}

MessagePlayerLeave = function(player) {
    if(player) {
        this.playerId = player.id;
        this.entityId = player.entityId;
        this.playerName = player.name;
    }
}

MessagePlayerLeave.prototype.execute = function(gameData) {
    var player = gameData.playerWorld.objects[this.playerId];
    var entity = gameData.entityWorld.objects[this.entityId];
    entity.drawable.remove();
    gameData.playerWorld.remove(player);
    gameData.entityWorld.remove(entity);
}

MessagePlayerLeave.prototype.send = function(socket) {
    socket.send(this.idString, [this.playerId, this.entityId, this.playerName]);
}

MessagePlayerLeave.prototype.receive = function(gameData, data) {
    this.playerId = data[0];
    this.entityId = data[1];
    this.playerName = data[2];
}
