var IdList = require("engine/IdList.js")
var ObjectWorld = require("engine/ObjectWorld.js")
var Event = require("engine/Core/Event.js")

var Global = require("game/Global.js")
var Config = require("game/Config.js")
var World = require("game/World.js")
var Items = require("game/Items.js")
var Blocks = require("game/Blocks.js")

var PlayerClass = require("game/PlayerClass.js")
var Tiles = require("game/Tiles.js")
var AnimationManager = require("engine/Animation/AnimationManager.js")
var MessageChangeGameMode = require("game/Message/ToClient/MessageChangeGamemode.js")

Global.gameData = {};
module.exports = Global.gameData;

Global.gameData.destroy = function() {
    Global.gameData = {};
}

Global.gameData.init = function(idList) {
    Blocks.initBlocks();
    Items.initItems(this);
    Config.init();

    // Global.gameData.textures is set in TextureManager.js when textures are loaded
    this.textures = {};

    this.timeouts = {};
    this.timeoutIdList = new IdList();
    this.playerIdList = (isServer) ? new IdList() : null;
    this.playerWorld = new ObjectWorld(true);
    this.world = null;
    this.gameMode = null;
    this.nextGameMode = null;
    this.changeGameMode();
    this.tick(); // Load gamemode

    if (!isServer)
        this.animationManager = new AnimationManager();
    else
        this.animationManager = {};

    this.messageCallbacks = {};

    PlayerClass.init();

    var Recipes = [];

    Recipes.push({
        item: [[Items.Types.SmallSticks, 1]],
        requiredOres: [],
        requiredItems: [[Items.Types.RottenRoot, 1]],
    });

    Recipes.push({
        item: [[Items.Types.Torch, 1]],
        requiredOres: [[Tiles.Coal, 1]],
        requiredItems: [[Items.Types.SmallSticks, 1]],
    });

    Recipes.push({
        item: [[Items.Types.CopperShovel, 1]],
        requiredOres: [[Tiles.Copper, 10]],
        requiredItems: [[Items.Types.SmallSticks, 10], [Items.Types.RottenRoot, 4]],
    });

    Recipes.push({
        item: [[Items.Types.IronShovel, 1]],
        requiredOres: [[Tiles.Iron, 10]],
        requiredItems: [[Items.Types.SmallSticks, 10], [Items.Types.RottenRoot, 4]],
    });

    Recipes.push({
        item: [[Items.Types.SteelShovel, 1]],
        requiredOres: [[Tiles.Coal, 10], [Tiles.Iron, 10]],
        requiredItems: [[Items.Types.SmallSticks, 10], [Items.Types.RottenRoot, 4]],
    });

    Recipes.push({
        item: [[Items.Types.CopperSword, 1]],
        requiredOres: [[Tiles.Copper, 10]],
        requiredItems: [[Items.Types.SmallSticks, 10], [Items.Types.RottenRoot, 4]],
    });

    if (this.playerIdList) {
        var onObjectRemove = function(object) { this.playerIdList.remove(object.id); }.bind(this);
        Event.subscribe(this.playerWorld.onRemove, this, onObjectRemove);
    }
}

Global.gameData.tick = function(dt) {
    if (this.nextGameMode) {
        this.clearTimeouts();
        if (isServer)
            clearCommands();
        if (this.gameMode && this.gameMode.onDestroy)
            this.gameMode.onDestroy();
        if (this.world) this.world.destroy();
        this.world = new World();
        this.gameMode = this.nextGameMode;
        this.gameMode.init();
        this.nextGameMode = null;
        if (isServer)
            new MessageChangeGameMode().send(io.sockets);
        return;
    }

    this.playerWorld.update();
    if (this.world)
        this.world.tick(dt);
    if (this.gameMode.tick)
        this.gameMode.tick(dt);
}

Global.gameData.changeGameMode = function() {
    this.nextGameMode = new Config.gameModeRegister[Config.gameModeRegister.length * Math.random() >> 0]();
    console.log("Changing game mode to: " + this.nextGameMode.name);
}

Global.gameData.setTimeout = function(callback, duration) {
    var timeoutId = this.timeoutIdList.next();
    var timeout = setTimeout(function() {
        delete Global.gameData.timeouts[timeoutId];
        callback();
    }, duration);
    this.timeouts[timeoutId] = timeout;
    return timeout;
}

Global.gameData.clearTimeouts = function() {
    Object.keys(this.timeouts).forEach(function(timeoutId) {
        clearTimeout(this.timeouts[timeoutId]);
    }.bind(this));
    this.timeouts = {};
}
