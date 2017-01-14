gameData = {};

gameData.destroy = function() {
    gameData = {};
}

gameData.init = function(idList) {
    initItems(this);
    initConfig();
    
    this.playerIdList = (isServer)? new IdList() : null;
    this.playerWorld = new ObjectWorld(true);
    this.world = null;
    this.gameMode = null;
    this.changeGameMode();
    
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
        this.playerWorld.onRemove["GameData.js"] = onObjectRemove;
    }
}

gameData.tick = function(dt) {
    this.playerWorld.update();
    if (this.world)
        this.world.tick(dt);
}

gameData.changeGameMode = function(gameMode)  {
    if (isServer)
        clearCommands();
    if (this.gameMode && this.gameMode.onDestroy)
        this.gameMode.onDestroy();
    this.world = new World();
    this.gameMode = new GameModeBaseWar();
    this.gameMode.init();
    
    console.log("Changing game mode to: " + this.gameMode.name);
}


