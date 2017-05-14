




;

var MessageChangeGameMode = function() {
    this.gameModeId = GameMode.id;
}
global.MessageChangeGameMode = MessageChangeGameMode;
TypeRegister.add(RegisterMessage.ToClient, MessageChangeGameMode);

MessageChangeGameMode.prototype.execute = function() {
    // TODO: Don't reload page
    location.reload(); // Reload page
    gameModeChange(this.gameModeId);
    Game.tick(); // Change gameMode instantly
}

MessageChangeGameMode.prototype.send = function(socket) {
    var serializationSize = 4;
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, this.gameModeId);
    socket.emit(this.idString, byteArray);
}

MessageChangeGameMode.prototype.receive = function(byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    this.gameModeId = Deserialize.int32(byteArray, counter);
}
