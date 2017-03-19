"use strict"

global.BlockWorld = class extends Map2D {
    constructor() {
        super();
        this.events = { onPlace: new Map(), onStrengthChange: new Map() };
    }

    getForeground([x, y]) {
        var blockChunkX = Math.floor(x / BlockChunk.dim);
        var blockChunkY = Math.floor(y / BlockChunk.dim);
        var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;

        var blockChunk = this.get([blockChunkX, blockChunkY]);
        if (!blockChunk)
            return 0;

        return blockChunk.getForeground(localX, localY);
    }

    setForeground([x, y], value, strength = 255) {
        var blockChunkX = Math.floor(x / BlockChunk.dim);
        var blockChunkY = Math.floor(y / BlockChunk.dim);
        var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;

        var blockChunk = this.get([blockChunkX, blockChunkY]);
        if (!blockChunk) {
            blockChunk = new BlockChunk();
            this.set([blockChunkX, blockChunkY], blockChunk);
        }
        blockChunk.setForeground(localX, localY, value, strength);
        Event.trigger(this.events.onPlace, [x, y], value, strength);

        if (!value) {
            for (var x = 0; x < BlockChunk.dim; ++x) {
                for (var y = 0; y < BlockChunk.dim; ++y) {
                    if (blockChunk.getForeground(x, y) || blockChunk.getBackground(x, y))
                        return;
                }
            }
            this.set([blockChunkX, blockChunkY], null);
        }

        if (!isServer) {
            if (localX == 0) {
                var otherChunk = this.get([blockChunkX - 1, blockChunkY]);
                if (otherChunk)
                    otherChunk.isChanged = true;
            } else if (localX == BlockChunk.dim - 1) {
                var otherChunk = this.get([blockChunkX + 1, blockChunkY]);
                if (otherChunk)
                    otherChunk.isChanged = true;
            }
            if (localY == 0) {
                var otherChunk = this.get([blockChunkX, blockChunkY - 1]);
                if (otherChunk)
                    otherChunk.isChanged = true;
            } else if (localY == BlockChunk.dim - 1) {
                var otherChunk = this.get([blockChunkX, blockChunkY + 1]);
                if (otherChunk)
                    otherChunk.isChanged = true;
            }
        }

    }

    getBackground([x, y]) {
        var blockChunkX = Math.floor(x / BlockChunk.dim);
        var blockChunkY = Math.floor(y / BlockChunk.dim);
        var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;

        var blockChunk = this.get([blockChunkX, blockChunkY]);
        if (!blockChunk)
            return 0;

        return blockChunk.getBackground(localX, localY);
    }

    setBackground([x, y], value) {
        var blockChunkX = Math.floor(x / BlockChunk.dim);
        var blockChunkY = Math.floor(y / BlockChunk.dim);
        var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;

        var blockChunk = this.get([blockChunkX, blockChunkY]);
        if (!blockChunk) {
            blockChunk = new BlockChunk();
            this.set([blockChunkX, blockChunkY], blockChunk);
        }
        blockChunk.setBackground(localX, localY, value);

        if (!value) {
            for (var x = 0; x < BlockChunk.dim; ++x) {
                for (var y = 0; y < BlockChunk.dim; ++y) {
                    if (blockChunk.getForeground(x, y) || blockChunk.getBackground(x, y))
                        return;
                }
            }
            this.set([blockChunkX, blockChunkY], null);
        }
    }

    getStrength([x, y]) {
        var blockChunkX = Math.floor(x / BlockChunk.dim);
        var blockChunkY = Math.floor(y / BlockChunk.dim);
        var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;

        var blockChunk = this.get([blockChunkX, blockChunkY]);
        if (!blockChunk)
            return 0;

        return blockChunk.getStrength(localX, localY);
    }

    setStrength([x, y], value) {
        var blockChunkX = Math.floor(x / BlockChunk.dim);
        var blockChunkY = Math.floor(y / BlockChunk.dim);
        var localX = Math.floor(x) - blockChunkX * BlockChunk.dim;
        var localY = Math.floor(y) - blockChunkY * BlockChunk.dim;

        var blockChunk = this.get([blockChunkX, blockChunkY]);
        if (!blockChunk) {
            blockChunk = new BlockChunk();
            this.set([blockChunkX, blockChunkY], blockChunk);
        }
        blockChunk.setStrength(localX, localY, value);
        Event.trigger(this.events.onStrengthChange, [x, y], value);
    }
}
