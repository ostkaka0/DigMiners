var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var IndexCounter = require("Engine/IndexCounter.js")

var Global = require("Game/Global.js")

var MessageRequestClickEntity = function(entityId, clickType) {
    this.entityId = entityId;
    this.clickType = clickType;
}
module.exports = MessageRequestClickEntity

MessageRequestClickEntity.prototype.execute = function(gameData, player) {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    console.log("player " + player.playerId + " clicked entity " + this.entityId + ", clicktype: " + this.clickType);
}

MessageRequestClickEntity.prototype.send = function(socket) {
    socket.emit(this.idString, [this.entityId, this.clickType]);
}

MessageRequestClickEntity.prototype.receive = function(gameData, data) {
    this.entityId = data[0];
    this.clickType = data[1];
}
