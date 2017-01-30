var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var IndexCounter = require("engine/IndexCounter.js")

var Global = require("game/Global.js")

var MessageChangeGameMode = function() {
    this.gameModeId = Global.gameData.gameMode.id;
}
module.exports = MessageChangeGameMode

MessageChangeGameMode.prototype.execute = function(gameData) {
    // TODO: Don't reload page
    location.reload(); // Reload page
    Global.gameData.changeGameMode(this.gameModeId);
    Global.gameData.tick(); // Change gameMode instantly
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
