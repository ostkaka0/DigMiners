import { Serialize, Deserialize } from "engine/Serialization.js"
import IndexCounter from "engine/IndexCounter.js"

import Global from "game/Global.js"

var MessageSpectate = function(entityId) {
    this.entityId = entityId;
}
export default MessageSpectate

MessageSpectate.prototype.execute = function(gameData) {
    global.spectateEntity = Global.gameData.world.entityWorld.objects[this.entityId];
    Global.gameData.world.events.trigger("spectate", global.spectateEntity);
}

MessageSpectate.prototype.send = function(socket) {
    var serializationSize = 4;
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, this.entityId);
    socket.emit(this.idString, byteArray);
}

MessageSpectate.prototype.receive = function(gameData, byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    this.entityId = Deserialize.int32(byteArray, counter);
}
