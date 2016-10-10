GameData = function(idList) {
    initItems();
    this.port = 3000;
    this.itemPickupDistance = 1.0;

    this.tickDuration = 1000 / 20;
    this.tickId = 0;
    this.fakeLag = 100;
    this.fakeJitter = 8;
    this.playerWorld = new ObjectWorld();
    this.entityWorld = new ObjectWorld();
    this.tileWorld = new Map2D();
    this.blockWorld = new Map2D();
    this.tileRegister = objectRegisterAddByObject([], Tiles);
    this.itemRegister = objectRegisterAddByObject([], Items);
    this.generator = {};
    if(!isServer)
        this.animationManager = new AnimationManager();
    else
        this.animationManager = {};
    this.commands = [];
    this.pendingCommands = {};
    this.commandTypes = typeRegisterAddByArray([], [CommandPlayerMove, CommandDig, CommandPlayerDig, CommandPlayerEquipItem]);
    this.messagesToClient = [MessageInit, MessageCommands, MessageChunk, MessagePlayerJoin, MessagePlayerLeave, MessagePlayerInventory, MessageEntitySpawn, MessageEntityDestroy];
    this.messagesToServer = [MessagePlayerMove, MessageRequestItemPickup, MessageRequestDropStack, MessageRequestEquipStack, MessageRequestCraft];
    this.messageTypes = typeRegisterAddByArray([], this.messagesToClient.concat(this.messagesToServer));
    this.componentTypes = typeRegisterAddByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ComponentItem]);

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
        item: [[Items.ApatiteShovel, 1]],
        requiredOres: [[Tiles.Apatite, 10]],
        requiredItems: [[Items.SmallSticks, 10], [Items.RottenRoot, 4]],
    });




    if(idList) {
        var onObjectRemove = function(object) { idList.remove(object.id); };
        this.playerWorld.onRemove = onObjectRemove;
        this.entityWorld.onRemove = onObjectRemove;
    }
}

GameData.prototype.tick = function(dt) {
    var that = this;

    if(this.pendingCommands[this.tickId])
        this.commands = this.commands.concat(this.pendingCommands[this.tickId]);

    this.entityWorld.objectArray.forEach(function(entity) {
        if(entity.physicsBody && entity.physicsBody.angle)
            entity.physicsBody.angleOld = entity.physicsBody.angle;
    });

    this.commands.forEach(function(command) {
        command.execute(that);
    });
    this.commands.length = 0;
    this.playerWorld.update();
    entityFunctionPlayerMovement(this, dt);
    entityFunctionPhysicsBodySimulate(this, dt);
    this.entityWorld.update();
    this.tickId++;
}
