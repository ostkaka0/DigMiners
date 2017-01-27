var gameData = {};
export default gameData

gameData.destroy = function() {
    gameData = {};
}

gameData.init = function(idList) {
    initItems(this);
    initConfig();

    // gameData.textures is set in TextureManager.js when textures are loaded
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

    initPlayerClasses();

    Recipes = [];

    Recipes.push({
        item: [[Items.SmallSticks, 1]],
        requiredOres: [],
        requiredItems: [[Items.RottenRoot, 1]],
    });

    Recipes.push({
        item: [[Items.Torch, 1]],
        requiredOres: [[Tiles.Coal, 1]],
        requiredItems: [[Items.SmallSticks, 1]],
    });

    Recipes.push({
        item: [[Items.CopperShovel, 1]],
        requiredOres: [[Tiles.Copper, 10]],
        requiredItems: [[Items.SmallSticks, 10], [Items.RottenRoot, 4]],
    });

    Recipes.push({
        item: [[Items.IronShovel, 1]],
        requiredOres: [[Tiles.Iron, 10]],
        requiredItems: [[Items.SmallSticks, 10], [Items.RottenRoot, 4]],
    });

    Recipes.push({
        item: [[Items.SteelShovel, 1]],
        requiredOres: [[Tiles.Coal, 10], [Tiles.Iron, 10]],
        requiredItems: [[Items.SmallSticks, 10], [Items.RottenRoot, 4]],
    });

    Recipes.push({
        item: [[Items.CopperSword, 1]],
        requiredOres: [[Tiles.Copper, 10]],
        requiredItems: [[Items.SmallSticks, 10], [Items.RottenRoot, 4]],
    });

    if (this.playerIdList) {
        var onObjectRemove = function(object) { this.playerIdList.remove(object.id); }.bind(this);
        subscribeEvent(this.playerWorld.onRemove, this, onObjectRemove);
    }
}

gameData.tick = function(dt) {
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

gameData.changeGameMode = function() {
    this.nextGameMode = new Config.gameModeRegister[Config.gameModeRegister.length * Math.random() >> 0]();
    console.log("Changing game mode to: " + this.nextGameMode.name);
}

gameData.setTimeout = function(callback, duration) {
    var gameData = this;
    var timeoutId = this.timeoutIdList.next();
    var timeout = setTimeout(function() {
        delete gameData.timeouts[timeoutId];
        callback();
    }, duration);
    this.timeouts[timeoutId] = timeout;
    return timeout;
}

gameData.clearTimeouts = function() {
    Object.keys(this.timeouts).forEach(function(timeoutId) {
        clearTimeout(this.timeouts[timeoutId]);
    }.bind(this));
    this.timeouts = {};
}
