COMMAND_ID_COUNTER = 0;
COMMANDS = [];

serializeCommand = function (command) {
    var byteArray = new Uint8Array(command.getSerializationSize() + 4);
    serializeInt32(byteArray, 0, command.id);
    command.serialize(byteArray, 4);
    return byteArray;
}

deserializeCommand = function (byteArray) {
    var commandId = deserializeInt32(byteArray, 0);
    var command = new COMMANDS[commandId]();
    command.deserialize(byteArray, 4);
    return command;
}