

World = function() {
    this.tickId = 0;
    this.idList = (isServer) ? new IdList() : null;
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

    subscribeEvent(ProjectileEvents.onHit, this, function(projectileEntity, hitPos) {
        gameData.setTimeout(function(projectileEntity) {
            var type = projectileEntity.projectile.projectileType;
            if (type.isExplosive)
                createExplosion(hitPos, type.explosiveRadius, type.explosiveEntityDamage, type.explosionBlockDamage, type.explosionTileDamage);
            this.entityWorld.remove(projectileEntity);
        }.bind(this, projectileEntity), projectileEntity.projectile.projectileType.stayTime);
        if (!isServer)
            createDespawningParticles(projectileEntity.projectile.projectileType.hitParticle(), hitPos, 200);
    }.bind(this));

    subscribeEvent(ProjectileEvents.onHitEntity, this, function(projectileEntity, hitEntity) {
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

    subscribeEvent(ProjectileEvents.onHitBlock, this, function(projectileEntity, blockPos) {
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

    subscribeEvent(ProjectileEvents.onHitTile, this, function(projectileEntity, tilePos) {

    }.bind(this));

    subscribeEvent(HealthEvents.onChange, this, function(entity) {
        if (!isServer) {
            var sprite = entity.drawable.sprites["healthbar"];
            if (!sprite) return;
            var defaultHealthbarWidth = 64;
            sprite.frame = [0, 0, (entity.health.health / entity.health.maxHealth) * defaultHealthbarWidth, sprite.texture.height];
        }
    }.bind(this));

    subscribeEvent(HealthEvents.onDeath, this, function(entity) {
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

        Object.keys(entity).forEach(function(key) {
            var component = entity[key];
            if (component && component.onDestroy)
                component.onDestroy(entity);
        });
    }.bind(this));

    this.events.on("entityHitBlockSide", function(entity, blockPos, blockType, blockCollisionSide) {
        if (isServer && blockType && blockType.isDoor)
            blockType.clickFunction(blockPos, blockType, entity, 0);
    }.bind(this));

    this.events.on("equip", function(entity, stackId, itemType) {
        if (itemType.type == "tool" && itemType.typeOfType == "rangedWeapon") {
            /*entity.bodyparts.bodyparts["tool"].offset[2] = Config.shootAngle;
            entity.bodyparts.bodyparts["leftArm"].offset[2] = Config.shootAngle;
            entity.bodyparts.bodyparts["rightArm"].offset[2] = -Config.shootAngle;*/



            var shoulderAngle = Math.PI / 4.0;
            var pos = BodyPart.rotate(0, 0, entity.bodyparts.bodyparts["leftArm"].offset[0], entity.bodyparts.bodyparts["leftArm"].offset[1], shoulderAngle + 1.0);
            entity.bodyparts.bodyparts["leftArm"].offset[0] = -pos[0];
            entity.bodyparts.bodyparts["leftArm"].offset[1] = pos[1];

            pos = BodyPart.rotate(0, 0, entity.bodyparts.bodyparts["rightArm"].offset[0], entity.bodyparts.bodyparts["rightArm"].offset[1], shoulderAngle);
            entity.bodyparts.bodyparts["rightArm"].offset[0] = -pos[0];
            entity.bodyparts.bodyparts["rightArm"].offset[1] = pos[1];

            entity.bodyparts.bodyparts["leftArm"].offset[2] = 2.5;

        }
    }.bind(this));

    this.events.on("dequip", function(entity, stackId, itemType) {
        if (itemType.type == "tool" && itemType.typeOfType == "rangedWeapon") {
            entity.bodyparts.bodyparts["tool"].offset[2] = entity.bodyparts.bodyparts["tool"].defaultOffset[2];
            entity.bodyparts.bodyparts["leftArm"].offset[2] = entity.bodyparts.bodyparts["leftArm"].defaultOffset[2];
            entity.bodyparts.bodyparts["rightArm"].offset[2] = entity.bodyparts.bodyparts["rightArm"].defaultOffset[2];

            entity.bodyparts.bodyparts["leftArm"].offset[0] = entity.bodyparts.bodyparts["leftArm"].defaultOffset[0];
            entity.bodyparts.bodyparts["leftArm"].offset[1] = entity.bodyparts.bodyparts["leftArm"].defaultOffset[1];
            entity.bodyparts.bodyparts["rightArm"].offset[0] = entity.bodyparts.bodyparts["rightArm"].defaultOffset[0];
            entity.bodyparts.bodyparts["rightArm"].offset[1] = entity.bodyparts.bodyparts["rightArm"].defaultOffset[1];
        }
    }.bind(this));
}

World.prototype.destroy = function() {
    unsubscribeEvents(HealthEvents, this);
    unsubscribeEvents(ProjectileEvents, this);
}
