



// TODO: Fix engine dependency to game




var CommandPlayerJoin = function(playerId, entityId, playerName, socketId) {
    this.playerId = playerId;
    this.playerName = playerName;
    this.socketId = socketId;
}
global.CommandPlayerJoin = CommandPlayerJoin;
TypeRegister.add(RegisterCommand, CommandPlayerJoin);

CommandPlayerJoin.prototype.execute = function() {
    var player = new Player(this.playerId);
    if (isServer)
        player.name = this.playerName;
    if (isServer || this.playerId != Client.playerId)
        Game.playerWorld.add(player, this.playerId);

    if (isServer) {
        var socket = Server.connections[this.socketId].socket;
        Server.connections[this.socketId].player = player;
        player.socket = socket;

        // Send init message
        // Sends generator seed, chunks must be sent AFTERWARDS
        new MessageInit(player).send(socket);

        // Send chunks
        // TODO: client requests chunks instead
        for (var x = -World.width / 2; x < World.width / 2; ++x) {
            for (var y = -World.height / 2; y < World.height / 2; ++y) {
                var chunk = World.tiles.get([x, y]);
                var blockChunk = World.blocks.get([x, y]);
                var message = new MessageChunk(chunk, blockChunk, x, y);
                message.send(socket);
            }
        }
    }
    if (isServer)
        console.log(this.playerName + " connected with playerId " + this.playerId);
}

CommandPlayerJoin.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.playerId);
    Serialize.utf8(byteArray, index, this.playerName);
}

CommandPlayerJoin.prototype.deserialize = function(byteArray, index) {
    this.playerId = Deserialize.int32(byteArray, index);
    this.playerName = Deserialize.utf8(byteArray, index);
}

CommandPlayerJoin.prototype.getSerializationSize = function() {
    return 4 + Serialize.utf8Size(this.playerName);
}
