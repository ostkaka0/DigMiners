
GameModeZombieInvasion = function() {
    this.wavePauseDuration = 30000;
    this.numEndWaveZombies = 5;
    this.waveNum = 0;
    this.numZombieToSpawn = 0;
    this.zombies = {};
    this.endWave = false;
    this.endWaveTimer = null;

    this.playerSpawns = {};
    this.teams = [Teams.Human];
    this.zombieSpawners = [];
}

GameModeZombieInvasion.prototype.init = function() {
    if (!isServer) return;

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        gameData.world.generator.generate(chunk, x, y);
        world.set(x, y, chunk);
    }

    for (var x = -2; x < 2; ++x) {
        for (var y = -2; y < 2; ++y) {
            loadChunk(gameData.world.tileWorld, x, y);
        }
    }

    this.playerSpawns[Teams.Human] = [[0, 0]];
    sendCommand(new CommandDig([0, 0], 5.0));
    this.generateDungeon(0, 0);

    // Zombie spawners
    for (var i = 0; i < 10; i++) {
        var pos = [0, 0];
        // calculate random position at least 20 tiles from middle
        for (var j = 0; j < 10 && v2.length(pos) < 20.0; j++)
            pos = [60.0 * (-1 + 2 * Math.random()), 60.0 * (-1 + 2 * Math.random())];
        var entityId = gameData.world.idList.next();
        var entity = entityTemplates.monsterSpawner(entityId, pos, this.spawnZombie.bind(this), 0, 2.0, 40, null, null, Teams.Zombie);
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId, Teams.Zombie));
        sendCommand(new CommandDig(pos, 5.0));
        this.zombieSpawners.push(entity);
    }

    subscribeEvent(gameData.world.entityWorld.onRemove, this, function(entity) {
        if (this.zombies[entity.id]) {
            delete this.zombies[entity.id];
            if (Object.keys(this.zombies).length <= this.numEndWaveZombies && this.numZombiesToSpawn <= 0 && !this.endWave) {
                this.endWave = true;
                if (this.endWaveTimer) {
                    clearTimeout(this.endWaveTimer);
                    this.endWaveTimer = null;
                }
                gameData.setTimeout(this.startWave.bind(this), this.wavePauseDuration);
                sendCommand(new CommandPopupMessage("Zombies are mutating."));
            }
            // start wave with timer when there are few zombies
            else if (Object.keys(this.zombies).length <= this.numEndWaveZombies + 5 && this.numZombiesToSpawn <= 0 && !this.endWave && !this.endWaveTimer) {
                this.endWaveTimer = gameData.setTimeout(function() {
                    this.endWaveTimer = null;
                    if (this.endWave) return;
                    this.endWave = true;
                    gameData.setTimeout(this.startWave.bind(this), this.wavePauseDuration);
                    sendCommand(new CommandPopupMessage("Zombies are mutating."));
                }.bind(this), 10000);
            }
        }
    }.bind(this));

    gameData.setTimeout(this.startWave.bind(this), this.initialWaitTicks);
}

GameModeZombieInvasion.prototype.name = "Zombie Invasion";

GameModeZombieInvasion.prototype.startWave = function() {
    this.waveNum++;

    sendCommand(new CommandPopupMessage("Starting wave " + this.waveNum + "."));

    // Enable spawns
    this.zombieSpawners.forEach(function(entity) {
        entity.spawner.maxEntities = 5; //Math.max(1, Math.min(5, this.waveNum/4 + gameData.playerWorld.objectArray.length - 1));
    }.bind(this));

    this.numZombiesToSpawn = 10 + 10 * Math.pow(2, this.waveNum/3);
    this.endWave = false;
}

GameModeZombieInvasion.prototype.spawnZombie = function(entityId, pos, teamId) {
    var entity = entityTemplates.zombie(entityId, pos, teamId);
    this.zombies[entityId] = entity;
    // Make zombie stronger for each wave
    for (var i = 0; i < this.waveNum - 1; i++) {
        switch (4 * Math.random() >> 0) {
            default:
            case 0:
                // Improve speed, decrease health
                entity.movement.speed += 10;
                var newMaxHealth = Math.max(50, entity.health.maxHealth - 5);
                entity.health.health = newMaxHealth;
                entity.health.maxHealth = newMaxHealth;
                break;
            case 1:
                // Improve health
                entity.health.health += 10;
                entity.health.maxHealth += 10;
                break;
            case 2:
                // Improve armor, decrease speed
                entity.health.armor = Math.min(0.8, entity.health.armor + 0.05);
                break;
            case 3:
                // Increase damage
                entity.damageMultiplier += 0.05;
                break;
        }
    }

    this.numZombiesToSpawn--;
    // Stop spawning
    if (this.numZombiesToSpawn <= 0) {
        this.zombieSpawners.forEach(function(entity) {
            entity.spawner.maxEntities = 0;
        }.bind(this));
    }

    return entity;
}

GameModeZombieInvasion.prototype.generateDungeon = function(tileX, tileY) {
    var width = Math.floor(Math.random() * 10 + 10);
    var height = Math.floor(Math.random() * 10 + 10);


    for (var yy = 0; yy < height; ++yy) {
        for (var xx = 0; xx < width; ++xx) {
            var x = xx + tileX - width / 2;
            var y = yy + tileY - height / 2;
            var tileId = 0;

            if (yy <= 0 || yy >= height - 1)
                tileId = 1;
            else if (xx <= 0 || xx >= width - 1)
                tileId = 1;

            setDensity(gameData.world.tileWorld, x, y, 0);
            setForeground(gameData.world.blockWorld, x, y, tileId);
        }
    }


    //setForeground(gameData.world.blockWorld, tileX - width / 2 + Math.random() * width / 2 >> 0, tileY + ((Math.random() > 0.5)? -1: 1) * Math.height / 2 >> 0, Blocks.BlueForcefield.id);
    //setForeground(gameData.world.blockWorld, tileX + ((Math.random() > 0.5)? -1: 1) * Math.width / 2 >> 0, tileY - height / 2 + Math.random() * height / 2 >> 0, Blocks.BlueForcefield.id);
    //setForeground(gameData.world.blockWorld, tileX - width / 2 + Math.random() * width / 2 >> 0 >> 0, tileY - height / 2 + Math.random() * height / 2 >> 0, Blocks.WoodCrate.id);
}
