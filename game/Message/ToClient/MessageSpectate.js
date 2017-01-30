var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var IndexCounter = require("engine/IndexCounter.js")

var Global = require("game/Global.js")

var MessageSpectate = function(entityId) {
    this.entityId = entityId;
}
module.exports = MessageSpectate

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
