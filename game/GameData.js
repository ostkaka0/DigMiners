GameData = function(idList) {
    this.tickDuration = 1000 / 20;
    this.playerWorld = new ObjectWorld();
    this.entityWorld = new ObjectWorld();
    this.tileWorld = new Map2D();
    this.generator = new Generator();
    this.commandTypes = new CommandsTypes([CommandPlayerMove, CommandEntityStatus]);

    if (idList) {
        var onObjectRemove = function(object) { idList.remove(object.id); };
        this.playerWorld.onRemove = onObjectRemove;
        this.entityWorld.onRemove = onObjectRemove;
    }
}
