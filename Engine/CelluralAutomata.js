import Event from "Engine/Core/Event.js"
import Map2D from "Engine/Core/Map2D.js"

export default class {
    constructor(blockWorld, blockRegister) {
        this.blockWorld = blockWorld;
        this.blockRegister = blockRegister;
        this.updatingBlocks = {};
        this.blocks = new Map2D();

        this.initEvents();
    }

    tick() {
        var updatingBlocks = this.updatingBlocks;
        this.updatingBlocks = [];
        this.blocks = new Map2D();

        Object.keys(updatingBlocks).forEach((blockId) => {
            var blockList = updatingBlocks[blockId];
            var blockType = this.blockRegister[blockId];
            if (blockType.updateCells)
                blockType.updateCells(this.blockWorld, blockList);
        });
    }

    updateBlock(blockPos, blockId) {
        if (this.blocks.get([blockPos.x, blockPos.y]) )return;
        var blockType = this.blockRegister[blockId];
        if (!blockType || !blockType.updateCells) return;
        this.blocks.set(blockPos, blockId);
        if (!this.updatingBlocks[blockId])
            this.updatingBlocks[blockId] = [blockPos];
        else
            this.updatingBlocks[blockId].push(blockPos);
    }

    initEvents() {
        Event.subscribe(this.blockWorld.events.onPlace, this, (blockPos, blockId) => this.updateBlock(blockPos, blockId));
        Event.subscribe(this.blockWorld.events.onStrengthChange, this, (blockPos, strength) => this.updateBlock(blockPos, this.blockWorld.getForeground(blockPos)));
    }

}