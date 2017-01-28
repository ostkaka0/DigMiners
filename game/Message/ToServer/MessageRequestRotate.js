import { Serialize, Deserialize } from "engine/Serialization.js"
import IndexCounter from "engine/IndexCounter.js"
import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"

import Global from "game/Global.js"
import CommandEntityRotate from "game/Command/CommandEntityRotate.js"

var MessageRequestRotate = function(deltaWorldCursorPos) {
    this.deltaWorldCursorPos = deltaWorldCursorPos;
    //this.direction = direction;
}
export default MessageRequestRotate

MessageRequestRotate.prototype.execute = function(gameData, player) {
    if (!this.deltaWorldCursorPos) return;
    if (player.entityId == null) return;
    var entity = Global.gameData.world.entityWorld.objects[player.entityId];
    if (!entity) return;
    var movement = entity.movement;
    if (!movement) return;
    if (v2.length(this.deltaWorldCursorPos) < 0.1) return;

    // Calculate direction:
    var pos = entity.physicsBody.getPos();
    var direction = [0, 0];
    v2.normalize(this.deltaWorldCursorPos, direction);
    var diffLen = 2 * v2.length(this.deltaWorldCursorPos);
    if (diffLen < 0.1) return;

    entity.drawable.positionAll(0, 0, 0, entity.bodyparts);
    var tool = entity.bodyparts.bodyparts["tool"];
    var toolUsePos = [0, 0];
    v2.add(toolUsePos, tool.finalPos, toolUsePos);
    toolUsePos = [toolUsePos[0], -toolUsePos[1]];
    v2.mul(1 / 32, toolUsePos, toolUsePos);
    var armLength = -toolUsePos[1] * 2; // The distance from origin to weapon

    var rotateAngle = Math.acos(Math.sqrt(diffLen * diffLen - armLength * armLength) / diffLen);
    direction = [Math.cos(rotateAngle) * direction[0] - Math.sin(rotateAngle) * direction[1], Math.cos(rotateAngle) * direction[1] + Math.sin(rotateAngle) * direction[0]];
    if (isNaN(direction[0]) || isNaN(direction[1])) return;

    movement.rotationDirection = direction;
    movement.deltaWorldCursorPos = this.deltaWorldCursorPos;
    sendCommand(new CommandEntityRotate(entity.id, direction));
}

MessageRequestRotate.prototype.send = function(socket) {
    if (v2.length(this.deltaWorldCursorPos) < 0.1) return;
    socket.emit(this.idString, this.deltaWorldCursorPos);
}

MessageRequestRotate.prototype.receive = function(gameData, data) {
    this.deltaWorldCursorPos = data;
}
