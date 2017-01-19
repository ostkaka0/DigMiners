
GameModeZombieInvasion = function() {
    this.wavePauseDuration = 30000;
    this.numEndWaveZombies = 5;
    this.waveNum = 0;
    this.numZombieToSpawn = 0;
    this.zombies = {};
    this.endingWave = false;
    this.endingWaveTimer = null;

    this.playerSpawns = {};
    this.zombieSpawns = [];
    this.teams = [Teams.Human];
    this.zombieSpawners = [];
    this.survivors = {};

    this.lastStartMessage = null;
    this.startSecondsDuration = 15;
    this.startSeconds = this.startSecondsDuration;
    this.playerSpawning = true;
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
        this.zombieSpawns.push(pos);
    }

    subscribeEvent(gameData.world.entityWorld.onRemove, this, function(entity) {
        if (this.zombies[entity.id]) {
            delete this.zombies[entity.id];
            if (Object.keys(this.zombies).length <= this.numEndWaveZombies && this.numZombiesToSpawn <= 0 && !this.endingWave) {
                this.endingWave = true;
                if (this.endingWaveTimer) {
                    clearTimeout(this.endingWaveTimer);
                    this.endingWaveTimer = null;
                }
                this.endWave();
            }
            // start wave with timer when there are few zombies
            else if (Object.keys(this.zombies).length <= this.numEndWaveZombies + 5 && this.numZombiesToSpawn <= 0 && !this.endingWave && !this.endingWaveTimer) {
                this.endingWaveTimer = gameData.setTimeout(function() {
                    this.endingWaveTimer = null;
                    if (this.endingWave) return;
                    this.endingWave = true;
                    this.endWave();
                }.bind(this), 10000);
            }
        } else if (entity.controlledByPlayer && this.survivors[entity.controlledByPlayer.playerId]) {
            delete this.survivors[entity.controlledByPlayer.playerId];
            if (Object.keys(this.survivors).length == 0 && !this.playerSpawning)
                gameData.setTimeout(gameData.changeGameMode.bind(gameData), 5000);
        }
    }.bind(this));
    
    subscribeEvent(gameData.playerWorld.onRemove, this, function(player) {
        if (this.survivors[player.id]) {
            delete this.survivors[player.id];
            if (Object.keys(this.survivors).length == 0 && !this.playerSpawning)
                gameData.setTimeout(gameData.changeGameMode.bind(gameData), 5000);
        }
    }.bind(this));

    this.lastStartMessage = new Date();
}

GameModeZombieInvasion.prototype.createEntity = function(player, entityId, classId) {
    if (this.playerSpawning) {
        var classType = PlayerClassRegister[classId];
        var entity = entityTemplates.player(player.id, entityId, player.name, classType, Teams.Human);

        // Set spawn position
        var pos = this.playerSpawns[Teams.Human][Math.random() * this.playerSpawns[Teams.Human].length >> 0];
        entity.physicsBody.setPos(pos);
        entity.physicsBody.posOld = v2.clone(pos);
        
        this.survivors[player.id] = player;
        return entity;
    } else {
        /*var pos = this.zombieSpawns[Math.random() * this.zombieSpawns.length >> 0];
        var entity = entityTemplates.playerZombie(player.id, entityId, player.name, pos, classId);
        entity.inventory.addItem(gameData, Items.RustyShovel.id, 1);
        return entity;*/
        return null;
    }
}

GameModeZombieInvasion.prototype.tick = function(dt) {
    if (Object.keys(this.survivors).length == 0) {
        this.startSeconds = this.startSecondsDuration;
    } else if (this.startSeconds >= 0 && this.lastStartMessage && ((new Date()).getTime() - this.lastStartMessage.getTime()) >= 1000) {
        this.lastStartMessage = new Date();
        if (this.startSeconds > 0)
            sendCommand(new CommandPopupMessage("Game starting in " + this.startSeconds + " seconds."));
        else {
            this.startWave();
        }
        --this.startSeconds;
    }
}

GameModeZombieInvasion.prototype.name = "Zombie Invasion";

GameModeZombieInvasion.prototype.endWave = function() {
    this.playerSpawning = true;
    gameData.setTimeout(this.startWave.bind(this), this.wavePauseDuration);
    sendCommand(new CommandPopupMessage("Zombies are mutating"));
    

}

GameModeZombieInvasion.prototype.startWave = function() {
    this.forceRespawnPlayers();
    
    this.playerSpawning = false;
    this.waveNum++;

    sendCommand(new CommandPopupMessage("Wave " + this.waveNum + "."));

    // Enable spawns
    this.zombieSpawners.forEach(function(entity) {
        entity.spawner.maxEntities = 5; //Math.max(1, Math.min(5, this.waveNum/4 + gameData.playerWorld.objectArray.length - 1));
    }.bind(this));

    this.numZombiesToSpawn = 10 + 10 * Math.pow(2, this.waveNum/3);
    this.endingWave = false;
}

GameModeZombieInvasion.prototype.forceRespawnPlayers = function() {
    gameData.playerWorld.objectArray.forEach(function(player) {
        if (player.entityId) {
            // Heal and supply ammo
            var entity = gameData.world.entityWorld.objects[player.entityId];
            console.log("entity: " + entity);
            if (!entity || !entity.inventory || !entity.ammo || !entity.health)
                return;
            entity.health.health = entity.health.maxHealth;
            triggerEvent(HealthEvents.onChange, entity);
            entity.inventory.items.forEach(function(item) {
                var itemType = Config.itemRegister[item.id];
                if (entity.ammo[item.id] != undefined)
                    entity.ammo[item.id] = itemType.ammoMax;
            });
            return;
        }

        var entityId = gameData.world.idList.next();
        var entity = this.createEntity(player, entityId, PlayerClasses.Assault.id);

        if (!entity) {
            console.error("entity is null");
            return;
        }
        
        sendCommand(new CommandEntitySpawn(gameData, entity, entityId));
        sendCommand(new CommandPlayerSpawn(player.id, entityId, player.name));
    }.bind(this));
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
