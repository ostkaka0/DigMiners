import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";

import Config from "Game/Config.js";

import CommandRegister from "Engine/Register/Command.js";
import Player from "Game/Player.js";
import MessageInit from "Game/Message/ToClient/Init.js";
import MessageChunk from "Game/Message/ToClient/Chunk.js";

var CommandPlayerJoin = function(playerId, entityId, playerName, socketId) {
    this.playerId = playerId;
    this.playerName = playerName;
    this.socketId = socketId;
}
export default CommandPlayerJoin;
CommandRegister.push(CommandPlayerJoin);

CommandPlayerJoin.prototype.execute = function() {
    var player = new Player(this.playerId);
    if (isServer)
        player.name = this.playerName;
    if (isServer || this.playerId != global.player.id)
        global.gameData.playerWorld.add(player, this.playerId);

    if (isServer) {
        var socket = connections[this.socketId].socket;
        connections[this.socketId].player = player;
        player.socket = socket;

        // Send init message
        // Sends generator seed, chunks must be sent AFTERWARDS
        new MessageInit(global.gameData, player).send(global.gameData, socket);

        // Send chunks
        // TODO: client requests chunks instead
        for (var x = -3; x < 3; ++x) {
            for (var y = -3; y < 3; ++y) {
                var chunk = global.gameData.world.tileWorld.get([x, y]);
                var blockChunk = global.gameData.world.blockWorld.get([x, y]);
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
