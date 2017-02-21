import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import IndexCounter from "Engine/Core/IndexCounter.js";


import MessageRegister from "Engine/Register/Message.js";;

var MessageChangeGameMode = function() {
    this.gameModeId = global.gameData.gameMode.id;
}
export default MessageChangeGameMode;
MessageRegister.ToClient.push(MessageChangeGameMode);

MessageChangeGameMode.prototype.execute = function(gameData) {
    // TODO: Don't reload page
    location.reload(); // Reload page
    global.gameData.changeGameMode(this.gameModeId);
    global.gameData.tick(); // Change gameMode instantly
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
