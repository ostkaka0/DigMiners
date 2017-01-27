import { Serialize, Deserialize } from "engine/Serialization.js"

var MessageChangeGameMode = function() {
    this.gameModeId = gameData.gameMode.id;
}
export default MessageChangeGameMode

MessageChangeGameMode.prototype.execute = function(gameData) {
    // TODO: Don't reload page
    location.reload(); // Reload page
    gameData.changeGameMode(this.gameModeId);
    gameData.tick(); // Change gameMode instantly
}

MessageChangeGameMode.prototype.send = function(socket) {
    var serializationSize = 4;
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, this.gameModeId);
    socket.emit(this.idString, byteArray);
}

MessageChangeGameMode.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    this.gameModeId = Deserialize.int32(byteArray, counter);
}
