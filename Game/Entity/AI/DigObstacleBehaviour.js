var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var BlockWorld = require("Engine/BlockWorld.js")
var TileWorld = require("Engine/TileWorld.js")
var Keys = require("Engine/Keys.js")

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Items = require("Game/Items.js")
var CommandEntityEquipItem = require("Game/Command/CommandEntityEquipItem.js")
var CommandKeyStatusUpdate = require("Game/Command/CommandKeyStatusUpdate.js")
var CommandEntityMove = require("Game/Command/CommandEntityMove.js")
var CommandEntityRotate = require("Game/Command/CommandEntityRotate.js")


var DigObstacleBehaviour = function(entity, maxWalkDis) {
    this.entity = entity;
    this.maxWalkDis = maxWalkDis;
    this.targetTilePos = null;
    this.oldMoveDir = null;
    this.stopTick = null;
    this.nextRunTick = null;
    this.nextCanRunTickId = Global.gameData.world.tickId;
    this.canRunOldPos = null;
    this.oldItemId = 0;
    this.digPauseDuration = 10; // Duration between finish digging and start digging again
}
module.exports = DigObstacleBehaviour

DigObstacleBehaviour.prototype.canRun = function() {
    if (!this.entity.inventory) return false;
    if (this.nextRunTick && Global.gameData.world.tickId < this.nextRunTick)
        return false;
    if (Global.gameData.world.tickId < this.nextCanRunTickId)
        return false;
    this.nextCanRunTickId = Global.gameData.world.tickId + 5;

    // Change equipped item to shovel
    var shovelSlotId = -1;
    if (!this.entity.equippedItems.items["tool"] || this.entity.equippedItems.items["tool"].itemFunction != Items.Functions.Shovel) {
        shovelSlotId = this.entity.inventory.findTool(Items.Functions.Shovel);
        if (shovelSlotId == -1) return false;
    }

    var velocity = this.entity.physicsBody.getVelocity();
    var moveDir = this.entity.movement.direction;
    //if (v2.dot(moveDir, velocity) > 1.0)
    //    return false;
    var pos = this.entity.physicsBody.getPos();

    if (this.canRunOldPos && v2.distance(this.canRunOldPos, pos) > this.maxWalkDis) {
        this.canRunOldPos = v2.clone(pos);
        return false;
    }
    this.canRunOldPos = v2.clone(pos);

    var digPos = [pos[0] + moveDir[0] / 2, pos[1] + moveDir[1] / 2];
    var tilePos = [Math.floor(digPos[0] - 0.5), Math.floor(digPos[1] - 0.5)];
    for (var i = 0; i < 4; i++) {
        var itPos = [tilePos[0] + (i & 1), tilePos[1] + (i >> 1)];
        var blockId = BlockWorld.getForeground(Global.gameData.world.blockWorld, itPos[0], itPos[1]);
        var density = TileWorld.getDensity(Global.gameData.world.tileWorld, itPos[0], itPos[1]);
        if (blockId != 0 || density > 127) {
            this.targetTilePos = itPos;
            if (shovelSlotId != -1) {
                this.oldItemId = this.entity.equippedItems.items["tool"].id;
                sendCommand(new CommandEntityEquipItem(this.entity.id, shovelSlotId, this.entity.inventory.items[shovelSlotId].id, true));
            }
            return true;
        }
    }
    return false;
}

DigObstacleBehaviour.prototype.initialize = function() {
    this.oldMoveDir = this.entity.movement.direction;
    sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, true, this.entity.physicsBody.getPos()));
    sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    var pos = this.entity.physicsBody.getPos();
    var tilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
    var diff = [this.targetTilePos[0] - tilePos[0], this.targetTilePos[1] - tilePos[1]];
    var normalized = v2.create(0, 0);
    v2.normalize(diff, normalized);
    sendCommand(new CommandEntityRotate(this.entity.id, normalized));
    this.stopTick = Global.gameData.world.tickId + (4000 / Config.tickDuration >> 0);
    this.nextRunTick = null;
}

DigObstacleBehaviour.prototype.run = function() {
    var blockId = BlockWorld.getForeground(Global.gameData.world.blockWorld, this.targetTilePos[0], this.targetTilePos[1]);
    var density = TileWorld.getDensity(Global.gameData.world.tileWorld, this.targetTilePos[0], this.targetTilePos[1]);
    if (Global.gameData.world.tickId >= this.stopTick) {
        // No digging for 2 seconds
        this.nextRunTick = Global.gameData.world.tickId + (2000 / Config.tickDuration >> 0);
        return false;
    }

    var pos = this.entity.physicsBody.getPos();
    var tilePos = [Math.floor(pos[0]), Math.floor(pos[1])];
    var dis = v2.distance(this.targetTilePos, tilePos);
    if (dis > 0.8) {
        var diff = [this.targetTilePos[0] - tilePos[0], this.targetTilePos[1] - tilePos[1]];
        var normalized = v2.create(0, 0);
        v2.normalize(diff, normalized);
        this.isMoving = true;
        sendCommand(new CommandEntityMove(this.entity.id, normalized, this.entity.physicsBody.getPos()));
    } else if (this.isMoving)
        sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));

    return (blockId != 0 || density != 0);
}

DigObstacleBehaviour.prototype.finish = function() {
    sendCommand(new CommandKeyStatusUpdate(this.entity.id, Keys.SPACEBAR, false, this.entity.physicsBody.getPos()));
    sendCommand(new CommandEntityMove(this.entity.id, [0, 0], this.entity.physicsBody.getPos()));
    sendCommand(new CommandEntityRotate(this.entity.id, this.oldMoveDir));

    this.nextCanRunTickId = Global.gameData.world.tickId + this.digPauseDuration;
    //if (this.oldItemId)
    //    sendCommand(new CommandEntityEquipItem(this.entity.id, 0, this.oldItemId, true));
}

DigObstacleBehaviour.prototype.destroy = function(entity) {

}