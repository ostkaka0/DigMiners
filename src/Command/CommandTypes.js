
CommandsTypes = function (commandList) {
    this.commandList = commandList;

    for (var i = 0; i < commandList.length; ++i)
        commandList[i].prototype.id = i;
}

CommandsTypes.prototype.serializeCommand = function (command) {
    var byteArray = new Uint8Array(command.getSerializationSize() + 4);
    var counter = new IndexCounter();
    serializeInt32(byteArray, counter, command.id);
    command.serialize(byteArray, counter);
    return byteArray;
}

CommandsTypes.prototype.deserializeCommand = function (byteArray) {
    var counter = new IndexCounter();
    var commandId = deserializeInt32(byteArray, counter);
    var command = new this.commandList[commandId]();
    command.deserialize(byteArray, counter);
    return command;
}
