




























gameData = {};

gameData.destroy = function() {
    gameData = {};
}

gameData.init = function(idList) {
    this.events3 = { onChangegameMode: new Map() };

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
    this.defaultgameMode = GameModeZombieInvasion;

    // Client.textures is set in TextureManager.js when textures are loaded
    this.textures = {};

    this.timeouts = {};
    this.timeoutIdList = new IdList();
    this.playerIdList = (isServer) ? new IdList() : null;
    this.playerWorld = new ObjectWorld(true);
    this.world = null;
    this.gameMode = null;
    this.nextgameMode = null;
    this.changegameMode();
    this.tick(); // Load gameMode

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
    if (this.nextgameMode) {
        this.clearTimeouts();
        if (isServer)
            clearCommands();
        if (this.gameMode && this.gameMode.onDestroy)
            this.gameMode.onDestroy();
        if (this.world) this.world.destroy();
        this.world = new World();
        Object.assign(this, this.world);
        this.gameMode = this.nextgameMode;
        this.gameMode.init();
        Event.trigger(this.events3.onChangegameMode);
        this.nextgameMode = null;
        if (isServer)
            new MessageChangeGameMode().send(Server.io.sockets);
        return;
    }

    this.playerWorld.update();
    if (this.world)
        this.world.tick(dt);
    if (this.gameMode.tick)
        this.gameMode.tick(dt);
}

gameData.changegameMode = function() {
    if (this.playerWorld.objectArray.length < 4)
        this.nextgameMode =  new gameData.defaultgameMode();
    else
        this.nextgameMode = new gameData.gameModeRegister[gameData.gameModeRegister.length * Math.random() >> 0]();
    console.log("Changing gameData mode to: " + this.nextgameMode.name);
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
