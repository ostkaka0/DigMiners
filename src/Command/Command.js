var COMMAND_ID_COUNTER = (COMMAND_ID_COUNTER || 0)+1;
var COMMANDS = COMMANDS || [null];

serializeCommand = function(byteArray, command) {
    console.log(byteArray.push);
    serializeInt32(byteArray, command.id);
    command.serialize(byteArray);
}

deserializeCommand = function(byteArray, index) {
    var commandId = deserializeInt32(byteArray, index);
    var command = new COMMANDS[commandId]();
    command.deserialize(byteArray, index);
    return command;
}