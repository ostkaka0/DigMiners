import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import IndexCounter from "Engine/IndexCounter.js";
import Keys from "Engine/Keys.js";

import Global from "Game/Global.js";
import MessageRegister from "Game/Register/Message.js";;
import CommandEntityInteractEntity from "Game/Command/CommandEntityInteractEntity.js";
import CommandKeyStatusUpdate from "Game/Command/CommandKeyStatusUpdate.js";

var MessageRequestKeyStatusUpdate = function(key, pressed) {
    this.key = key;
    this.pressed = pressed;
}
export default MessageRequestKeyStatusUpdate;
MessageRegister.ToServer.push(MessageRequestKeyStatusUpdate);

MessageRequestKeyStatusUpdate.prototype.execute = function(gameData, player) {
    var entity = Global.gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var physicsBody = entity.physicsBody;
    if (!physicsBody) return;

    if (this.key == Keys.SPACEBAR && this.pressed && entity.interacter) {
        var angle = physicsBody.angle;
        var dir = [Math.cos(-angle), Math.sin(-angle)];
        var interactablePos = [physicsBody.getPos()[0] + 1.0 * dir[0], physicsBody.getPos()[1] + 1.0 * dir[1]];
        var bodies = [];
        var distances = [];
        Global.gameData.world.physicsWorld.getBodiesInRadiusSorted(bodies, distances, interactablePos, 0.25);
        if (bodies.length > 0) {
            var targetEntity = Global.gameData.world.physicsEntities[bodies[0]];
            // Interact only if player has nothing equipped in hands
            if (targetEntity && targetEntity.interactable && entity.equippedItems && !entity.equippedItems.items["tool"]) {
                if (!Interactable.isInteracting(targetEntity, entity)) {
                    if (entity.interacter.interacting) {
                        sendCommand(new CommandEntityInteractEntity(entity.id, entity.interacter.interacting, false));
                        entity.interacter.interacting = null;
                    }
                    if (Interactable.canInteract(targetEntity, entity)) {
                        sendCommand(new CommandEntityInteractEntity(entity.id, targetEntity.id, true));
                        entity.interacter.interacting = targetEntity.id;
                        entity.interacter.lastCheck = Global.gameData.world.tickId;
                    }
                } else {
                    sendCommand(new CommandEntityInteractEntity(entity.id, targetEntity.id, false));
                    entity.interacter.interacting = null;
                }
            }
        } else if (entity.interacter.interacting) {
            sendCommand(new CommandEntityInteractEntity(entity.id, entity.interacter.interacting, false));
            entity.interacter.interacting = null;
        }
    }

    sendCommand(new CommandKeyStatusUpdate(player.entityId, this.key, this.pressed, physicsBody.getPos()));
}

MessageRequestKeyStatusUpdate.prototype.send = function(socket) {
    socket.emit(this.idString, [this.key, this.pressed]);
}

MessageRequestKeyStatusUpdate.prototype.receive = function(gameData, data) {
    this.key = data[0];
    this.pressed = data[1];
}
