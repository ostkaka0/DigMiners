import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import IndexCounter from "Engine/Core/IndexCounter.js";


import Config from "Game/Config.js";
import RegisterMessage from "Engine/Register/Message.js";;
import CommandEntityInventory from "Engine/Command/EntityInventory.js";
import CommandPlayerOreInventory from "Game/Command/PlayerOreInventory.js";
import CommandEntityDestroy from "Engine/Command/EntityDestroy.js";

var MessageRequestItemPickup = function(entityId) {
    this.entityId = entityId;
}
export default MessageRequestItemPickup;
RegisterMessage.ToServer.push(MessageRequestItemPickup);

MessageRequestItemPickup.prototype.execute = function(gameData, player) {
    var entity = global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    if (entity.item && !entity.pickedUp) {
        var playerEntity = global.gameData.world.entityWorld.objects[player.entityId];
        if (!playerEntity) return;
        var physicsBody = entity.physicsBody;
        var playerPhysicsBody = playerEntity.physicsBody;

        var dis = v2.distance(physicsBody.getPos(), playerPhysicsBody.getPos());
        if (dis <= Config.itemPickupDistance + 0.1) {
            entity.pickedUp = true;
            // Add item to player inventory
            sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.ADD_ITEM, entity.item.itemId, entity.item.amount));
            // Destroy entity
            sendCommand(new CommandEntityDestroy(this.entityId));
        }
    }
}

MessageRequestItemPickup.prototype.send = function(socket) {
    socket.emit(this.idString, this.entityId);
}

MessageRequestItemPickup.prototype.receive = function(gameData, data) {
    this.entityId = data;
}
