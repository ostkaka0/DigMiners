import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import IndexCounter from "Engine/Core/IndexCounter.js";

import Config from "Game/Config.js";

import RegisterMessage from "Engine/Register/Message.js";;
import RegisterCommand from "Engine/Register/Command.js";;

var MessageCommands = function() {
    this.tickId = (isServer) ? global.gameData.world.tickId : 0;
    this.commands = (isServer) ? global.gameData.world.commands : [];
}
export default MessageCommands;
RegisterMessage.ToClient.push(MessageCommands);

MessageCommands.prototype.execute = function(gameData) {
    if (Config.fakeLag == 0 && Config.fakeJitter == 0) {
        global.gameData.world.pendingCommands[this.tickId] = this.commands;
    } else {
        global.gameData.setTimeout(function() {
            global.gameData.world.pendingCommands[this.tickId] = this.commands;
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
        var command = new RegisterCommand[commandId]();
        command.deserialize(byteArray, counter);
        this.commands.push(command);
    }
}
