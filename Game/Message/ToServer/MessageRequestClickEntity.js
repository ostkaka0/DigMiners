import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import IndexCounter from "Engine/IndexCounter.js";

import Global from "Game/Global.js";
import Message from "Game/Message/Message.js";;

var MessageRequestClickEntity = function(entityId, clickType) {
    this.entityId = entityId;
    this.clickType = clickType;
}
export default MessageRequestClickEntity;
Message.ToServer.push(MessageRequestClickEntity);

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
