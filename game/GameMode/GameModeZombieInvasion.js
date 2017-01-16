
GameModeZombieInvasion = function() {
    this.wavePauseDuration = 10000;
    this.numEndWaveZombies = 10;
    this.waveDuration = 60000;
    this.waveNum = 0;

    this.playerSpawns = {};
    this.teams = [Teams.Human];
    this.bases = {};
    this.zombieSpawners = [];
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
        var pos = [15.0 * (-1 + 2 * Math.random()), 15.0 * (-1 + 2 * Math.random())];
        this.playerSpawns[Teams.Human].push(pos);
        sendCommand(new CommandDig(pos, 5.0));

        // Base Entity
        var entityId = gameData.world.idList.next();
        var entity = entityTemplates.humanBase(entityId, pos, Teams.Human);
        this.bases[entityId] = entity;
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId, Teams.Human));
    }

    // Zombie spawners
    for (var i = 0; i < 10; i++) {
        var pos = [0, 0];
        // calculate random position at least 40 tiles from middle
        for (var j = 0; j < 10 && v2.length(pos) < 40.0; j++)
            pos = [90.0 * (-1 + 2 * Math.random()), 90.0 * (-1 + 2 * Math.random())];
        var entityId = gameData.world.idList.next();
        var entity = entityTemplates.monsterSpawner(entityId, pos, this.spawnZombie.bind(this), 0, 2.0, 1, null, null, Teams.Zombie);
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId, Teams.Zombie));
        sendCommand(new CommandDig(pos, 5.0));
        this.zombieSpawners.push(entity);
    }

    gameData.world.entityWorld.onRemove["GameModeBaseWar.js"] = function(entity) {
        if (!this.bases[entity.id]) return;

        // Delete spawn
        delete this.bases[entity.id];

        // End gamemode
        if (Object.keys(this.bases).length <= 0) {
            sendCommand(new CommandPopupMessage("All bases destroyed. Changing gamemode in 5 seconds.", 5000));
            gameData.setTimeout(function() { gameData.changeGameMode(); }, 5000);
        } else
            sendCommand(new CommandPopupMessage("Base destroyed! " + Object.keys(this.bases).length + " bases remaining."));
    }.bind(this);


    gameData.setTimeout(this.startWave.bind(this), this.initialWaitTicks);
}

GameModeZombieInvasion.prototype.name = "Zombie Invasion";

GameModeZombieInvasion.prototype.startWave = function() {
    this.waveNum++;
    gameData.setTimeout(this.startWave.bind(this), this.waveDuration + this.wavePauseDuration);

    sendCommand(new CommandPopupMessage("Starting wave " + this.waveNum + "."));

    // Enable spawns
    this.zombieSpawners.forEach(function(entity) {
        entity.spawner.maxEntities = Math.max(1, Math.min(5, this.waveNum + gameData.playerWorld.objectArray.length - 1));
    }.bind(this));
    // Disable spawns after 1 seconds
    gameData.setTimeout(function() {
        this.zombieSpawners.forEach(function(entity) {
            entity.spawner.maxEntities = 0;
        }.bind(this));
    }.bind(this), 1000);
}

GameModeZombieInvasion.prototype.spawnZombie = function(entityId, pos, teamId) {
    var entity = entityTemplates.zombie(entityId, pos, teamId);
    // Make zombie stronger for each wave
    for (var i = 0; i < this.waveNum; i++) {
        switch (4 * Math.random() >> 0) {
            default:
            case 0:
                // Improve speed, decrease health
                entity.movement.speed += 10;
                var newMaxHealth = Math.max(50, entity.health.maxHealth - 10);
                entity.health.health = newMaxHealth;
                entity.health.maxHealth = newMaxHealth;
                break;
            case 1:
                // Improve health, decrease speed                // Improve speed: 
                entity.health.health += 20;
                entity.health.maxHealth += 20;
                entity.movement.speed = Math.max(10, entity.movement.speed - 4);
                break;
            case 2:
                // Improve armor, decrease speed
                entity.health.armor = Math.min(0.8, entity.health.armor + 0.1);
                entity.movement.speed = Math.max(10, entity.movement.speed - 4);
                break;
            case 3:
                // Increase damage
                entity.damageMultiplier += 0.1;
                break;
        }
    }

    return entity;
}
