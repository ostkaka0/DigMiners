





;
;

var MessageCommands = function() {
    this.tickId = (isServer) ? World.tickId : 0;
    this.commands = (isServer) ? World.commands : [];
}
global.MessageCommands = MessageCommands;
TypeRegister.add(RegisterMessage.ToClient, MessageCommands);

MessageCommands.prototype.execute = function(gameData) {
    if (!World || !GameMode) return;
    if (Config.fakeLag == 0 && Config.fakeJitter == 0) {
        World.pendingCommands[this.tickId] = this.commands;
    } else {
        worldSetTimeout(function() {
            World.pendingCommands[this.tickId] = this.commands;
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
