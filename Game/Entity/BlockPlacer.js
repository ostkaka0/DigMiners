import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import Sprite from "Engine/Animation/Sprite.js";

import Config from "Game/Config.js";
import CommandEntityInventory from "Game/Command/CommandEntityInventory.js";
import CommandPlaceBlock from "Game/Command/CommandPlaceBlock.js";

import EntityRegister from "Engine/Register/Entity.js";

var EntityBlockPlacer = function(blockPos, blockId, duration, entityId) {
    this.blockPos = blockPos;
    this.blockId = blockId;
    this.duration = duration;
    this.entityId = entityId;
}
export default EntityBlockPlacer
EntityRegister.push(EntityBlockPlacer);

EntityBlockPlacer.prototype.name = blockPlacer.name; function blockPlacer() { };

EntityBlockPlacer.prototype.update = function(entity) {
    this.duration--;

    if (!this.isInitialized) {
        this.isInitialized = true;
        var placerEntity = global.gameData.world.entityWorld.objects[this.entityId];
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
    var placerEntity = global.gameData.world.entityWorld.objects[this.entityId];
    var playerId = (placerEntity && placerEntity.controlledByPlayer) ? placerEntity.controlledByPlayer.playerId : undefined;
    var player = (playerId != undefined) ? global.gameData.playerWorld.objects[playerId] : undefined;
    var inventoryItem = (placerEntity && placerEntity.inventory) ? placerEntity.inventory.getEquippedItemType("tool") : undefined;
    var buildFailure = false;

    if (!placerEntity || placerEntity.blockPlacerId != entity.id)
        buildFailure = true;
    if (player && !player.canPlaceBlock(global.gameData, this.blockPos[0], this.blockPos[1]))
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
        global.gameData.world.entityWorld.remove(entity);
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
        global.gameData.world.entityWorld.remove(entity);
    }
}

EntityBlockPlacer.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.blockPos[0]);
    Serialize.int32(byteArray, index, this.blockPos[1]);
    Serialize.int32(byteArray, index, this.blockId);
    Serialize.int32(byteArray, index, this.duration);
    Serialize.int32(byteArray, index, this.entityId);
}

EntityBlockPlacer.prototype.deserialize = function(byteArray, index) {
    this.blockPos = [Deserialize.int32(byteArray, index), Deserialize.int32(byteArray, index)]
    this.blockId = Deserialize.int32(byteArray, index);
    this.duration = Deserialize.int32(byteArray, index);
    this.entityId = Deserialize.int32(byteArray, index);
}

EntityBlockPlacer.prototype.getSerializationSize = function() {
    return 20;
}
