MessageCommands = function(commands) {
    this.commands = commands || [];
}

MessageCommands.prototype.execute = function(gameData) {
    gameData.commands = gameData.commands.concat(this.commands);
}

MessageCommands.prototype.send = function(socket) {
    var serializationSize = 0;
    this.commands.forEach(function(command) {
        serializationSize += 4 + command.getSerializationSize();
    });
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    this.commands.forEach(function(command) {
        serializeInt32(byteArray, counter, command.id);
        command.serialize(byteArray, counter);
    });
    socket.emit(this.idString, byteArray);

}

MessageCommands.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    while(counter.value < byteArray.byteLength) {
        var commandId = deserializeInt32(byteArray, counter);
        var command = new gameData.commandTypes.list[commandId]();
        command.deserialize(byteArray, counter);
        this.commands.push(command);
    }
}
