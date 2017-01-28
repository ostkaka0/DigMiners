import { Serialize, Deserialize } from "engine/Serialization.js"
import IndexCounter from "engine/IndexCounter.js"

import Config from "game/Config.js"
import Global from "game/Global.js"

var MessageCommands = function() {
    this.tickId = (isServer) ? Global.gameData.world.tickId : 0;
    this.commands = (isServer) ? Global.gameData.world.commands : [];
}
export default MessageCommands

MessageCommands.prototype.execute = function(gameData) {
    if (Config.fakeLag == 0 && Config.fakeJitter == 0) {
        Global.gameData.world.pendingCommands[this.tickId] = this.commands;
    } else {
        Global.gameData.setTimeout(function() {
            Global.gameData.world.pendingCommands[this.tickId] = this.commands;
        }.bind(this), Config.fakeLag + Config.fakeJitter * Math.random());
    }
}

MessageCommands.prototype.send = function(socket) {
    var serializationSize = 4;
    this.commands.forEach(function(command) {
        serializationSize += 4 + command.getSerializationSize();
    });
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, this.tickId);
    this.commands.forEach(function(command) {
        Serialize.int32(byteArray, counter, command.id);
        command.serialize(byteArray, counter);
    });
    socket.emit(this.idString, byteArray);

}

MessageCommands.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    this.tickId = Deserialize.int32(byteArray, counter);
    while (counter.value < byteArray.byteLength) {
        var commandId = Deserialize.int32(byteArray, counter);
        var command = new Config.commandTypes[commandId]();
        command.deserialize(byteArray, counter);
        this.commands.push(command);
    }
}
