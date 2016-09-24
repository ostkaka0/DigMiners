
CommandsTypes = function(commandList) {
    this.commandList = commandList;

    for (var i = 0; i < commandList.length; ++i)
        commandList[i].prototype.id = i;
}

CommandsTypes.prototype.serializeCommand = function (command) {
    var byteArray = new Uint8Array(command.getSerializationSize() + 4);
    serializeInt32(byteArray, 0, command.id);
    command.serialize(byteArray, 4);
    return byteArray;
}

CommandsTypes.prototype.deserializeCommand = function (byteArray) {
    var commandId = deserializeInt32(byteArray, 0);
    var command = new this.commandList[commandId]();
    command.deserialize(byteArray, 4);
    return command;
}
