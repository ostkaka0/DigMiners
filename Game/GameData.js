




























gameData = {};

gameData.destroy = function() {
    gameData = {};
}

gameData.init = function(idList) {
    this.events3 = { onChangegameDatamode: new Map() };

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
    this.gameDataModeRegister = TypeRegister.addByArray([], [/*gameDataModeBaseWar,*/ gameDataModeZombieInvasion/*, gameDataModeSurvivalWar*/]);
    this.defaultgameDataMode = gameDataModeZombieInvasion;

    // Client.textures is set in TextureManager.js when textures are loaded
    this.textures = {};

    this.timeouts = {};
    this.timeoutIdList = new IdList();
    this.playerIdList = (isServer) ? new IdList() : null;
    this.playerWorld = new ObjectWorld(true);
    this.world = null;
    this.gameDataMode = null;
    this.nextgameDataMode = null;
    this.changegameDataMode();
    this.tick(); // Load gameDatamode

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

gameData.tick = function(dt) {
    if (this.nextgameDataMode) {
        this.clearTimeouts();
        if (isServer)
            clearCommands();
        if (this.gameDataMode && this.gameDataMode.onDestroy)
            this.gameDataMode.onDestroy();
        if (this.world) this.world.destroy();
        this.world = new World();
        Object.assign(this, this.world);
        this.gameDataMode = this.nextgameDataMode;
        this.gameDataMode.init();
        Event.trigger(this.events3.onChangegameDatamode);
        this.nextgameDataMode = null;
        if (isServer)
            new MessageChangegameDataMode().send(io.sockets);
        return;
    }

    this.playerWorld.update();
    if (this.world)
        this.world.tick(dt);
    if (this.gameDataMode.tick)
        this.gameDataMode.tick(dt);
}

gameData.changegameDataMode = function() {
    if (this.playerWorld.objectArray.length < 4)
        this.nextgameDataMode =  new gameData.defaultgameDataMode();
    else
        this.nextgameDataMode = new gameData.gameDataModeRegister[gameData.gameDataModeRegister.length * Math.random() >> 0]();
    console.log("Changing gameData mode to: " + this.nextgameDataMode.name);
}

gameData.setTimeout = function(callback, duration) {
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
