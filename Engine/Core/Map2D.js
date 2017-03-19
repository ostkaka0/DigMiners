"use strict"

global.Map2D = class {
    constructor() {
        this.map = new Map();
    }

    get(pos) {
        return this.map.get(pos[0] + "|" + pos[1]);
    }

    set(pos, value) {
        this.map.set(pos[0] + "|" + pos[1], value);
    }
}
