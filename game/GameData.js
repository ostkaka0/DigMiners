gameData = {};

gameData.destroy = function() {
    gameData = {};
}

gameData.init = function(idList) {
    initItems(this);
    initConfig();
    
    this.tickId = 0;
    this.idList = idList;
    this.playerWorld = new ObjectWorld(true);
    this.entityWorld = new ObjectWorld(true);
    this.particleEmitterWorld = new ObjectWorld();
    this.particleEmitterIdList = new IdList();
    this.tileWorld = new Map2D();
    this.blockWorld = new Map2D();
    this.physicsWorld = new PhysicsWorld();
    this.physicsEntities = {};
    this.generator = null;
    this.events = new EventHandler();
    this.initializeEvents();
    if (!isServer)
        this.animationManager = new AnimationManager();
    else
        this.animationManager = {};
    this.commands = [];
    this.pendingCommands = {};
    this.commandCallbacks = [];
    this.messageCallbacks = {};
    this.spawnPoints = {};
    this.spawnPoints[Teams.Blue] = [[-60, -20], [-60, 0], [-60, 20]];
    this.spawnPoints[Teams.Red] = [[60, -20],[60, 0],[60, 20]];
    
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

    // Update physicsEntities
    this.entityWorld.onAdd["GameData.js"] = function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = entity;
    }.bind(this);
    this.entityWorld.onRemove["GameData.js"] = function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = undefined;
    }.bind(this);

    if (idList) {
        var onObjectRemove = function(object) { idList.remove(object.id); };
        this.playerWorld.onRemove["GameData.js"] = onObjectRemove;
        this.entityWorld.onRemove["GameData.js"] = onObjectRemove;
    }
}

gameData.tick = function(dt) {
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
    entityFunctionEntityMovement(dt);
    entityFunctionPhysicsBodySimulate(dt);
    entityFunctionProjectileSimulate(dt);
    this.entityWorld.objectArray.forEach(function(entity) {
        Object.keys(entity).forEach(function(key) {
            var component = entity[key];
            if (component && component.update)
                component.update(entity);
        });
    });
    this.entityWorld.update();
    this.particleEmitterWorld.update();
    this.tickId++;
}

gameData.initializeEvents = function() {
    this.events.on("projectileHit", function(projectileEntity, hitPos) {
        setTimeout(function() {
            var type = this.projectile.projectileType;
            if (type.isExplosive)
                createExplosion(hitPos, type.explosiveRadius, type.explosiveEntityDamage, type.explosionBlockDamage, type.explosionTileDamage);
            gameData.entityWorld.remove(this);
        }.bind(projectileEntity), projectileEntity.projectile.projectileType.stayTime);
        if (!isServer)
            createDespawningParticles(projectileEntity.projectile.projectileType.hitParticle(), hitPos, 200);
    });

    this.events.on("projectileHitEntity", function(projectileEntity, hitEntity) {
        if (isServer) {
            if (hitEntity && hitEntity.health && projectileEntity.projectile.projectileType.damage > 0) {
                var damage = projectileEntity.projectile.projectileType.damage * projectileEntity.projectile.damageFactor;
                var armorPenentration = projectileEntity.projectile.projectileType.armorPenentration;
                var shooterId = projectileEntity.projectile.shooterEntityId;
                var shooter = gameData.entityWorld.objects[shooterId];
                hitEntity.health.hurt(hitEntity, shooter, damage, armorPenentration);
            }
        }
    });

    this.events.on("projectileHitBlock", function(projectileEntity, blockPos) {
        if (isServer) {
            if (projectileEntity.projectile.projectileType.blockDamage > 0) {
                var strength = getStrength(gameData.blockWorld, blockPos[0], blockPos[1]);
                var blockId = getForeground(gameData.blockWorld, blockPos[0], blockPos[1]);
                var block = gameData.blockRegister[blockId];
                var projectileArmor = (block.projectileArmor) ? block.projectileArmor : 0;
                strength -= (1 / block.hardness) * Math.round((1.0 - projectileArmor) * projectileEntity.projectile.projectileType.blockDamage);
                sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], Math.max(strength, 0)));
            }
        }
    });

    this.events.on("projectileHitTile", function(projectileEntity, tilePos) {

    });

    this.events.on("healthChange", function(entity) {
        var sprite = entity.drawable.sprites["healthbar"];
        if (!sprite || !sprite.sprite) return;
        var defaultHealthbarWidth = 64;
        sprite.sprite.width = (entity.health.health / entity.health.maxHealth) * defaultHealthbarWidth;
    });

    this.events.on("entityDeath", function(entity) {
        if (!entity.isDead) {
            entity.isDead = true;
            gameData.entityWorld.remove(entity);
            if (entity.controlledByPlayer) {
                var playerId = entity.controlledByPlayer.playerId;
                var player = gameData.playerWorld.objects[playerId];
                if (player) {
                    player.deathTick = gameData.tickId;
                    player.entityId = null;
                    if (!isServer && player.id == global.player.id) {
                        global.playerEntity = null;
                        global.playerEntityId = null;
                    }
                }
            }
        }
        
        Object.keys(entity).forEach(function (key) {
            var component = entity[key];
            if (component.onDestroy)
                component.onDestroy(entity);
        });
    });

    this.events.on("entityHitBlockSide", function(entity, blockPos, blockType, blockCollisionSide) {
        //console.log(entity.id + " hit block " + blockPos);
        if (isServer && blockType && blockType.isDoor)
            blockType.clickFunction(blockPos, blockType, entity, 0);
    });
}
