
BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1,
    STRENGTH: 2
}

MessagePlayerBuild = function(playerId, x, y, id, type) {
    this.playerId = playerId;
    this.x = x;
    this.y = y;
    this.id = id;
    this.type = type;
}

MessagePlayerBuild.prototype.execute = function(gameData) {
    //TODO: Support other types
    setForeground(gameData.blockWorld, this.x, this.y, this.id);

    var player = gameData.playerWorld.objects[this.playerId];
    if(!player) return;
    var entity = gameData.entityWorld.objects[player.entityId];
    if(!entity) return;
    if(!isServer)
        entity.bodyparts.bodyparts["rightArm"].cycle(gameData, "rightArm", 256, false);
}

MessagePlayerBuild.prototype.getSerializationSize = function() {
    return 20;
}

MessagePlayerBuild.prototype.send = function(socket) {
    var byteArray = new Buffer(this.getSerializationSize());
    var index = new IndexCounter();
    serializeInt32(byteArray, index, this.playerId);
    serializeInt32(byteArray, index, this.x);
    serializeInt32(byteArray, index, this.y);
    serializeInt32(byteArray, index, this.id);
    serializeInt32(byteArray, index, this.type);
    socket.emit(this.idString, byteArray);
}

MessagePlayerBuild.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var index = new IndexCounter();
    this.playerId = deserializeInt32(byteArray, index);
    this.x = deserializeInt32(byteArray, index);
    this.y = deserializeInt32(byteArray, index);
    this.id = deserializeInt32(byteArray, index);
    this.type = deserializeInt32(byteArray, index);
}
