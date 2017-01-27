
CommandPlayerJoin = function(playerId, entityId, playerName, socketId) {
    this.playerId = playerId;
    this.playerName = playerName;
    this.socketId = socketId;
}

CommandPlayerJoin.prototype.execute = function() {
    var player = new Player(this.playerId);
    player.name = this.playerName;
    if (isServer || this.playerId != global.player.id)
        gameData.playerWorld.add(player, this.playerId);

    if (isServer) {
        var socket = connections[this.socketId].socket;
        connections[this.socketId].player = player;
        player.socket = socket;

        // Send init message
        // Sends generator seed, chunks must be sent AFTERWARDS
        new MessageInit(gameData, player).send(gameData, socket);

        // Send chunks
        // TODO: client requests chunks instead
        for (var x = -3; x < 3; ++x) {
            for (var y = -3; y < 3; ++y) {
                var chunk = gameData.world.tileWorld.get(x, y);
                var blockChunk = gameData.world.blockWorld.get(x, y);
                var message = new MessageChunk(chunk, blockChunk, x, y);
                message.send(socket);
            }
        }
    }
    if (isServer)
        console.log(this.playerName + " connected with playerId " + this.playerId);
    else
        gameData.HUD.chat.write(this.playerName + " connected.");
}

CommandPlayerJoin.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.playerId);
    serializeUTF8(byteArray, index, this.playerName);
}

CommandPlayerJoin.prototype.deserialize = function(byteArray, index) {
    this.playerId = deserializeInt32(byteArray, index);
    this.playerName = deserializeUTF8(byteArray, index);
}

CommandPlayerJoin.prototype.getSerializationSize = function() {
    return 4 + getUTF8SerializationSize(this.playerName);
}
