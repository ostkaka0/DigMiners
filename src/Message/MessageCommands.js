MessageCommands = function(gameData) {
    this.tickId = (gameData) ? gameData.tickId : 0;
    this.commands = (gameData) ? gameData.commands : [];
}

MessageCommands.prototype.execute = function(gameData) {
    var that = this;
    setTimeout(function() {
        gameData.pendingCommands[that.tickId] = that.commands;
    }, gameData.fakeLag + gameData.fakeJitter * Math.random());
}

MessageCommands.prototype.send = function(socket) {
    var serializationSize = 4;
    this.commands.forEach(function(command) {
        serializationSize += 4 + command.getSerializationSize();
    });
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    serializeInt32(byteArray, counter, this.tickId);
    this.commands.forEach(function(command) {
        serializeInt32(byteArray, counter, command.id);
        command.serialize(byteArray, counter);
    });
    socket.emit(this.idString, byteArray);

}

MessageCommands.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    this.tickId = deserializeInt32(byteArray, counter);
    while(counter.value < byteArray.byteLength) {
        var commandId = deserializeInt32(byteArray, counter);
        var command = new gameData.commandTypes[commandId]();
        command.deserialize(byteArray, counter);
        this.commands.push(command);
    }
}
