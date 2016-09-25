GameData = function(idList) {
    this.tickDuration = 1000 / 20;
    this.playerWorld = new ObjectWorld();
    this.entityWorld = new ObjectWorld();
    this.tileWorld = new Map2D();
    this.tileRegister = new TileRegister();
    this.generator = new Generator();
    this.commandTypes = new ObjectTypes([CommandPlayerMove, CommandDig]);
    this.messageTypes = new ObjectTypes([MessageInit, MessageCommands, MessageChunk, MessageEntityStatus, MessagePlayerJoin, MessagePlayerLeave]);
    this.clientMessages = [MessageInit, MessageCommands, MessageChunk, MessageEntityStatus, MessagePlayerJoin, MessagePlayerLeave];
    this.serverMessages = [];

    this.tileRegister.register("dirt", true, false, 1.0);
    this.tileRegister.register("stone", true, false, 4.0);
    this.tileRegister.register("stone2", true, false, 8.0);
    this.tileRegister.register("stone3", true, false, 16.0);
    this.tileRegister.register("ore1", true, false, 32.0);
    this.tileRegister.register("ore2", true, false, 64.0);

    if (idList) {
        var onObjectRemove = function(object) { idList.remove(object.id); };
        this.playerWorld.onRemove = onObjectRemove;
        this.entityWorld.onRemove = onObjectRemove;
    }
}
