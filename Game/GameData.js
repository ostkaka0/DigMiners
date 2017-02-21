import IdList from "Engine/Core/IdList.js";
import ObjectWorld from "Engine/Core/ObjectWorld.js";
import Event from "Engine/Core/Event.js";

import Global from "Game/Global.js";
import Config from "Game/Config.js";
import World from "Game/World.js";
import Items from "Game/Items.js";
import Blocks from "Game/Blocks.js";

import ItemRegister from "Game/Register/Item.js";
import CommandRegister from "Game/Register/Command.js";
import MessageRegister from "Game/Register/Message.js";
import EntityRegister from "Game/Register/Entity.js";

import PlayerClass from "Game/PlayerClass.js";
import Tiles from "Game/Tiles.js";
import AnimationManager from "Engine/Animation/AnimationManager.js";
import MessageChangeGameMode from "Game/Message/ToClient/MessageChangeGamemode.js";

Global.gameData = {};
global.gameData = Global.gameData;
export default Global.gameData;

global.gameData.events = { onChangeGamemode: [] };

Global.gameData.destroy = function() {
    Global.gameData = {};
}

Global.gameData.init = function(idList) {
    Blocks.initBlocks();
    Items.initItems(this);
    ItemRegister.init();
    CommandRegister.init();
    MessageRegister.init();
    EntityRegister.init();
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
        Event.trigger(this.events.onChangeGamemode);
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
    if (this.playerWorld.objectArray.length < 4)
        this.nextGameMode =  new Config.defaultGameMode();
    else
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
