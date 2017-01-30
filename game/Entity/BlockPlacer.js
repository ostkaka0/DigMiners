var Serialize = require("engine/Serialization.js").Serialize
var Deserialize = require("engine/Serialization.js").Deserialize
var Sprite = require("engine/Animation/Sprite.js")

var Config = require("game/Config.js")
var CommandEntityInventory = require("game/Command/CommandEntityInventory.js")
var CommandPlaceBlock = require("game/Command/CommandPlaceBlock.js")
var Global = require("game/Global.js")

var BlockPlacer = function(blockPos, blockId, duration, entityId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
    this.duration = duration;
    this.entityId = entityId;
}
module.exports = BlockPlacer

BlockPlacer.prototype.name = blockPlacer.name; function blockPlacer() { };

BlockPlacer.prototype.update = function(entity) {
    this.duration--;

    if (!this.isInitialized) {
        this.isInitialized = true;
        var placerEntity = Global.gameData.world.entityWorld.objects[this.entityId];
        if (placerEntity)
            placerEntity.blockPlacerId = entity.id;
        if (!isServer) {
            var block = Config.blockRegister[this.blockId];
            this.sprite = new Sprite(block.name);
            this.sprite.anchor[0] = 0.5;
            this.sprite.anchor[1] = 0.5;
            this.sprite.alpha = 0.75;
            zindices[2].add(this.sprite);
        }
    }
    var placerEntity = Global.gameData.world.entityWorld.objects[this.entityId];
    var playerId = (placerEntity && placerEntity.controlledByPlayer) ? placerEntity.controlledByPlayer.playerId : undefined;
    var player = (playerId != undefined) ? Global.gameData.playerWorld.objects[playerId] : undefined;
    var inventoryItem = (placerEntity && placerEntity.inventory) ? placerEntity.inventory.getEquippedItemType("tool") : undefined;
    var buildFailure = false;

    if (!placerEntity || placerEntity.blockPlacerId != entity.id)
        buildFailure = true;
    if (player && !player.canPlaceBlock(Global.gameData, this.blockPos[0], this.blockPos[1]))
        buildFailure = true;
    if (inventoryItem && inventoryItem.blockId != this.blockId)
        buildFailure = true;

    var shouldDestroy = (buildFailure && this.duration >= 0) || this.duration <= -2;
    if (!isServer && shouldDestroy) {
        zindices[2].remove(this.sprite);
    }

    if (shouldDestroy) {
        if (placerEntity && placerEntity.blockPlacerId == entity.id)
            placerEntity.blockPlacerId = undefined;
        Global.gameData.world.entityWorld.remove(entity);
        return;
    }

    if (isServer && this.duration == 0 && inventoryItem && inventoryItem.id) {
        // Remove from inventory and place block
        sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.REMOVE_ITEM, inventoryItem.id, 1));
        sendCommand(new CommandPlaceBlock(this.blockPos, this.blockId));
    }
    if (shouldDestroy) {
        if (placerEntity)
            placerEntity.blockPlacerId = undefined;
        Global.gameData.world.entityWorld.remove(entity);
    }
}

BlockPlacer.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.blockPos[0]);
    Serialize.int32(byteArray, index, this.blockPos[1]);
    Serialize.int32(byteArray, index, this.blockId);
    Serialize.int32(byteArray, index, this.duration);
    Serialize.int32(byteArray, index, this.entityId);
}

BlockPlacer.prototype.deserialize = function(byteArray, index) {
    this.blockPos = [Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index)]
    this.blockId = Deserialize.int32(byteArray, index);
    this.duration = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
}

BlockPlacer.prototype.getSerializationSize = function() {
    return 20;
}
