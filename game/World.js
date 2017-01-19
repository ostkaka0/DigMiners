

World = function() {
    this.tickId = 0;
    this.idList = (isServer)? new IdList() : null;
    this.entityWorld = new ObjectWorld(true);
    this.particleEmitterWorld = new ObjectWorld();
    this.particleEmitterIdList = new IdList();
    this.tileWorld = new Map2D();
    this.blockWorld = new Map2D();
    this.physicsWorld = new PhysicsWorld();
    this.physicsEntities = {};
    this.generator = new Generator(Math.random() * 1000000 >> 0);
    
    this.commands = [];
    this.pendingCommands = {};
    this.commandCallbacks = [];
    
    this.events = new EventHandler();
    this.initializeEvents();
}

World.prototype.tick = function(dt) {
    if (this.pendingCommands[this.tickId])
        this.commands = this.commands.concat(this.pendingCommands[this.tickId]);
    this.pendingCommands[this.tickId] = undefined;

    this.entityWorld.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.physicsBody.angle)
            entity.physicsBody.angleOld = entity.physicsBody.angle;
    });
    this.commands.forEach(function(command) {
        command.execute(this);
    }.bind(this));
    this.commands.length = 0;
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

World.prototype.initializeEvents = function() {
    // Update physicsEntities
    // No unsubscribing is required, becuase world is owner of entityWorld
    subscribeEvent(this.entityWorld.onAdd, this, function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = entity;
    }.bind(this));
    subscribeEvent(this.entityWorld.onRemove, this, function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = undefined;
    }.bind(this));

    if (this.idList) {
        var onObjectRemove = function(object) { this.idList.remove(object.id); }.bind(this);
        subscribeEvent(this.entityWorld.onRemove, this, onObjectRemove);
    }
    
    this.events.on("projectileHit", function(projectileEntity, hitPos) {
        gameData.setTimeout(function(projectileEntity) {
            var type = projectileEntity.projectile.projectileType;
            if (type.isExplosive)
                createExplosion(hitPos, type.explosiveRadius, type.explosiveEntityDamage, type.explosionBlockDamage, type.explosionTileDamage);
            this.entityWorld.remove(projectileEntity);
        }.bind(this, projectileEntity), projectileEntity.projectile.projectileType.stayTime);
        if (!isServer)
            createDespawningParticles(projectileEntity.projectile.projectileType.hitParticle(), hitPos, 200);
    }.bind(this));

    this.events.on("projectileHitEntity", function(projectileEntity, hitEntity) {
        if (isServer) {
            if (hitEntity && hitEntity.health && projectileEntity.projectile.projectileType.damage > 0) {
                var damage = projectileEntity.projectile.projectileType.damage * projectileEntity.projectile.damageFactor;
                var armorPenentration = projectileEntity.projectile.projectileType.armorPenentration;
                var shooterId = projectileEntity.projectile.shooterEntityId;
                var shooter = this.entityWorld.objects[shooterId];
                hitEntity.health.hurt(hitEntity, shooter, damage, armorPenentration);
            }
        }
    }.bind(this));

    this.events.on("projectileHitBlock", function(projectileEntity, blockPos) {
        if (isServer) {
            if (projectileEntity.projectile.projectileType.blockDamage > 0) {
                var strength = getStrength(this.blockWorld, blockPos[0], blockPos[1]);
                var blockId = getForeground(this.blockWorld, blockPos[0], blockPos[1]);
                var block = Config.blockRegister[blockId];
                var projectileArmor = (block.projectileArmor) ? block.projectileArmor : 0;
                strength -= (1 / block.hardness) * Math.round((1.0 - projectileArmor) * projectileEntity.projectile.projectileType.blockDamage);
                sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], Math.max(strength, 0)));
            }
        }
    }.bind(this));

    this.events.on("projectileHitTile", function(projectileEntity, tilePos) {

    }.bind(this));

    subscribeEvent(Health.onChange, this, function(entity) {
        var sprite = entity.drawable.sprites["healthbar"];
        if (!sprite || !sprite.sprite) return;
        var defaultHealthbarWidth = 64;
        sprite.sprite.width = (entity.health.health / entity.health.maxHealth) * defaultHealthbarWidth;
    }.bind(this));

    subscribeEvent(Health.onDeath, this, function(entity) {
        if (!entity.isDead) {
            entity.isDead = true;
            this.entityWorld.remove(entity);
            if (entity.controlledByPlayer) {
                var playerId = entity.controlledByPlayer.playerId;
                var player = gameData.playerWorld.objects[playerId];
                if (player) {
                    player.deathTick = this.tickId;
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
            if (component && component.onDestroy)
                component.onDestroy(entity);
        });
    }.bind(this));

    this.events.on("entityHitBlockSide", function(entity, blockPos, blockType, blockCollisionSide) {
        if (isServer && blockType && blockType.isDoor)
            blockType.clickFunction(blockPos, blockType, entity, 0);
    }.bind(this));
}

World.prototype.destroy = function() {
    unsubscribeEvent(Health.onChange, this);
    unsubscribeEvent(Health.onDeath, this);
}
