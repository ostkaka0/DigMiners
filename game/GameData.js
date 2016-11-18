GameData = function(idList) {
    initItems(this);
    this.port = 3000;
    this.itemPickupDistance = 2.0;
    this.blockPlaceDistance = 96; //Pixels

    this.tickDuration = 1000 / 20;
    this.tickId = 0;
    this.fakeLag = 0;
    this.fakeJitter = 0;
    this.playerWorld = new ObjectWorld();
    this.entityWorld = new ObjectWorld();
    this.tileWorld = new Map2D();
    this.blockWorld = new Map2D();
    this.tileRegister = objectRegisterAddByObject([], Tiles);
    this.itemRegister = objectRegisterAddByObject([], Items);
    this.blockRegister = objectRegisterAddByObject([], Blocks);
    this.projectileRegister = objectRegisterAddByObject([], Projectiles);
    this.physicsWorld = new PhysicsWorld();
    this.physicsEntities = {};
    this.generator = null;
    if (!isServer)
        this.animationManager = new AnimationManager();
    else
        this.animationManager = {};
    this.commands = [];
    this.pendingCommands = {};
    this.commandTypes = typeRegisterAddByArray([], [CommandEntityMove, CommandDig, CommandEntityDig, CommandEntityEquipItem, CommandEntityBuild, CommandEntityHurtEntity, CommandEntitySpawn, CommandCollisions, CommandEntityDestroy, CommandPlayerJoin, CommandPlayerLeave, CommandKeyStatusUpdate, CommandEntityInventory, CommandPlayerOreInventory, CommandEntityRotate, CommandBlockStrength, CommandProjectileSpawn]);
    this.messagesToClient = [MessageInit, MessageCommands, MessageChunk];
    this.messagesToServer = [MessageRequestKeyStatusUpdate, MessageRequestItemPickup, MessageRequestClickSlot, MessageRequestCraft, MessageRequestPlaceBlock, MessageRequestClickEntity, MessageRequestRotate];
    this.messageTypes = typeRegisterAddByArray([], this.messagesToClient.concat(this.messagesToServer));
    this.componentTypes = typeRegisterAddByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ItemComponent, Health, ControlledByPlayer, NameComponent, EquippedItems, Projectile]);

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

    // Update physicsEntities
    this.entityWorld.onAdd.push((function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = entity;
    }).bind(this));
    this.entityWorld.onRemove.push((function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = undefined;
    }).bind(this));

    if (idList) {
        var onObjectRemove = function(object) { idList.remove(object.id); };
        this.playerWorld.onRemove.push(onObjectRemove);
        this.entityWorld.onRemove.push(onObjectRemove);
    }
}

GameData.prototype.tick = function(dt) {
    var that = this;

    if (this.pendingCommands[this.tickId])
        this.commands = this.commands.concat(this.pendingCommands[this.tickId]);

    this.entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.physicsBody.angle)
            entity.physicsBody.angleOld = entity.physicsBody.angle;
    });
    this.commands.forEach(function(command) {
        command.execute(that);
    });
    this.commands.length = 0;
    this.playerWorld.update();
    this.physicsWorld.update(dt);
    entityFunctionEntityMovement(this, dt);
    entityFunctionPhysicsBodySimulate(this, dt);
    entityFunctionProjectileSimulate(this, dt);
    this.entityWorld.update();
    this.tickId++;
}
