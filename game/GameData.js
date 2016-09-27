GameData = function(idList) {
    this.port = 3000;

    this.tickDuration = 1000 / 20;
    this.tickId = 0;
    this.fakeLag = 100;
    this.fakeJitter = 100;
    this.playerWorld = new ObjectWorld();
    this.entityWorld = new ObjectWorld();
    this.tileWorld = new Map2D();
    this.tileRegister = new TileRegister();
    this.generator = new Generator();
    this.commands = [];
    this.pendingCommands = {};
    this.commandTypes = new ObjectTypes([CommandPlayerMove, CommandDig, CommandPlayerDig]);
    this.messageTypes = new ObjectTypes();
    this.messagesToClient = [MessageInit, MessageCommands, MessageChunk, MessageEntityStatus, MessagePlayerJoin, MessagePlayerLeave, MessagePlayerInventory];
    this.messagesToServer = [MessagePlayerMove];

    this.messageTypes.addArray(this.messagesToClient);
    this.messageTypes.addArray(this.messagesToServer);

    this.tileRegister.register("dirt", true, false, 1.0);
    this.tileRegister.register("stone", true, false, 4.0);
    this.tileRegister.register("stone2", true, false, 8.0);
    this.tileRegister.register("stone3", true, false, 16.0);
    this.tileRegister.register("ore1", true, false, 32.0);
    this.tileRegister.register("ore2", true, false, 64.0);

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
