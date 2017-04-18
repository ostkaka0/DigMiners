




























global.gameData = {};

global.gameData.destroy = function() {
    global.gameData = {};
}

global.gameData.init = function(idList) {
    this.events3 = { onChangeGamemode: new Map() };

    Blocks.initBlocks();
    Items.initItems(this);
    RegisterItem.init();
    RegisterCommand.init();
    RegisterMessage.init();
    RegisterEntity.init();
    this.tileRegister = ObjectRegister.addByObject([], Tiles);
    this.blockRegister = ObjectRegister.addByObject([], Blocks);
    this.projectileRegister = ObjectRegister.addByObject([], Projectiles);
    this.particleRegister = ObjectRegister.addByObject([], Particles);
    this.particleFunctionRegister = ObjectRegister.addByObject([], ParticleFunctions);
    this.potionEffectTypeRegister = ObjectRegister.addByObject([], PotionEffectTypes);
    this.gameModeRegister = TypeRegister.addByArray([], [/*GameModeBaseWar,*/ GameModeZombieInvasion/*, GameModeSurvivalWar*/]);
    this.defaultGameMode = GameModeEmpty;

    // global.gameData.textures is set in TextureManager.js when textures are loaded
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
        this.playerWorld.onRemove.set(this, onObjectRemove);
    }
}

global.gameData.tick = function(dt) {
    if (this.nextGameMode) {
        this.clearTimeouts();
        if (isServer)
            clearCommands();
        if (this.gameMode && this.gameMode.onDestroy)
            this.gameMode.onDestroy();
        if (this.world) this.world.destroy();
        this.world = new World();
        Object.assign(this, this.world);
        this.gameMode = this.nextGameMode;
        this.gameMode.init();
        Event.trigger(this.events3.onChangeGamemode);
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

global.gameData.changeGameMode = function() {
    if (this.playerWorld.objectArray.length < 4)
        this.nextGameMode =  new global.gameData.defaultGameMode();
    else
        this.nextGameMode = new global.gameData.gameModeRegister[global.gameData.gameModeRegister.length * Math.random() >> 0]();
    console.log("Changing game mode to: " + this.nextGameMode.name);
}

global.gameData.setTimeout = function(callback, duration) {
    var timeoutId = this.timeoutIdList.next();
    var timeout = setTimeout(function() {
        delete global.gameData.timeouts[timeoutId];
        callback();
    }, duration);
    this.timeouts[timeoutId] = timeout;
    return timeout;
}

global.gameData.clearTimeouts = function() {
    Object.keys(this.timeouts).forEach(function(timeoutId) {
        clearTimeout(this.timeouts[timeoutId]);
    }.bind(this));
    this.timeouts = {};
}
