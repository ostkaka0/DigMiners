
GameModeZombieInvasion = function() {
    this.playerSpawns = {};
    this.teams = [Teams.Human];
    this.bases = {};
}

GameModeZombieInvasion.prototype.init = function() {
    if (!isServer) return;
    
    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        gameData.world.generator.generate(chunk, x, y);
        world.set(x, y, chunk);

        gameData.world.generator.generateDungeons(gameData.world.blockWorld, chunk, x, y);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(gameData.world.tileWorld, x, y);
        }
    }
    
    // Player spawns and bases
    this.playerSpawns[Teams.Human] = [];
    for (var i = 0; i < 4; i++) {
        var pos = [15.0*(-1 + 2*Math.random()), 15.0*(-1 + 2*Math.random())];
        this.playerSpawns[Teams.Human].push(pos);
        sendCommand(new CommandDig(pos, 5.0));
        
        // Base Entity
        var entityId = gameData.world.idList.next();
        var entity = entityTemplates.humanBase(entityId, pos, Teams.Human);
        this.bases[entityId] = entity;
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId, Teams.Human));
    }
    
    // Zombie spawners
    for (var i = 0; i < 25; i++) {
        var pos = [0, 0];
        // calculate random position at least 40 tiles from middle
        for (var j = 0; j < 10 && v2.length(pos) < 40.0; j++)
            pos = [90.0*(-1 + 2*Math.random()), 90.0*(-1 + 2*Math.random())];
        var entityId = gameData.world.idList.next();
        var entity = entityTemplates.monsterSpawner(entityId, pos, entityTemplates.zombie, 2, 2.0, 200, null, null, Teams.Zombie);
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId, Teams.Zombie));
        sendCommand(new CommandDig(pos, 5.0));
    }
    
    gameData.world.entityWorld.onRemove["GameModeBaseWar.j"] = function(entity) {
        if (!this.bases[entity.id]) return;

        // Delete spawn
        delete this.bases[entity.id];
        
        console.log("Base destroyed! " + Object.keys(this.bases).length + " bases remaining.");
       
       // End gamemode
        if (Object.keys(this.bases).length <= 0)
            gameData.changeGameMode();
    }.bind(this);
}

GameModeZombieInvasion.prototype.name = "Zombie Invasion";
