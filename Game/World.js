
var World = null;

var worldInit = function() {
    World = {
        tickId: 0,
        idList: (isServer)? new IdList() : null,
        entities: new ObjectWorld(true),
        particles: new ParticleWorld(),
        tiles: new TileWorld(),
        blocks: new BlockWorld(),
        physics: new PhysicsWorld(),
        physicsEntityMap: new Map(),
        generator: new Generator(123),
        pendingCommands: new Map(),
    };
}

var worldTick = function(dt) {
    var commands = [];
    if (World.pendingCommands[World.tickId])
        commands = World.pendingCommands.get(World.tickId);
    World.pendingCommands.delete(World.tickId);

    for (var i = 0; i < World.entities.objectArray.length; i++) {
        var entity = World.entities.objectArray[i];
        if (entity.physicsBody && entity.physicsBody.angle)
            entity.physicsBody.angleOld = entity.physicsBody.angle;
    }
    for (var i = 0; i < commands.length; i++) {
        command = commands[i];
        command.execute(World);
    }
    var collisionList = World.physics.update(dt);
    EntityMovement.entityFunction(dt);
    entityFunctionPhysicsBodySimulate(dt);
    entityFunctionProjectileSimulate(dt);
    World.entities.update();

    if (isServer) {
        // Synchronize collisions:
        sendCommand(new CommandCollisions(World.collisionList));
    }

    World.tickId++;
}

/*
var World = function() {
    World.tickId = 0;
    World.idList = (isServer) ? new IdList() : null;
    World.entities = new ObjectWorld(true);
    World.particleWorld = new ParticleWorld();
    World.tileWorld = new TileWorld();
    World.blockWorld = new BlockWorld();
    World.celluralAutomata = new CelluralAutomata(World.blockWorld, gameData.blockRegister);
    World.physics = new PhysicsWorld();
    World.physicsEntities = {};
    World.generator = new Generator(Math.random() * 1000000 >> 0);

    World.inventoryIdList = new IdList();
    World.inventories = {};
    World.entityInventories = {};


    World.commands = [];
    World.pendingCommands = {};
    World.commandCallbacks = [];

    World.events = new EventHandler();
    World.initializeEvents();
    World.events2 = { onPlayerSpawn: [] };

    //Temp variables:
    World.collisionList = []; // Updated, then sent before tick ends
}
World = World;

World.prototype.tick = function(dt) {
    if (World.pendingCommands[World.tickId])
        World.commands = World.commands.concat(World.pendingCommands[World.tickId]);
    World.pendingCommands[World.tickId] = undefined;

    World.entities.objectArray.forEach(function(entity) {
        if (entity.physicsBody && entity.physicsBody.angle)
            entity.physicsBody.angleOld = entity.physicsBody.angle;
    });
    World.commands.forEach(function(command) {
        command.execute(this);
    }.bind(this));
    World.commands.length = 0;
    World.celluralAutomata.tick();
    World.physics.update(dt);
    EntityMovement.entityFunction(dt);
    entityFunctionPhysicsBodySimulate(dt);
    entityFunctionProjectileSimulate(dt);
    World.entities.objectArray.forEach(function(entity) {
        Object.keys(entity).forEach(function(key) {
            var component = entity[key];
            if (component && component.update)
                component.update(entity);
        });
    });
    World.entities.update();

    if (isServer) {
        gameData.world.entityWorld.objectArray.forEach(function(entity) {
            if (entity.behaviourContainer)
                entity.behaviourContainer.update();
            //TODO: 20 magic number
            if (entity.interacter && entity.interacter.interacting && (!entity.interacter.lastCheck || gameData.world.tickId - entity.interacter.lastCheck > 20)) {
                var interactableEntity = gameData.world.entityWorld.objects[entity.interacter.interacting];
                if (interactableEntity) {
                    if (!Interactable.canInteract(interactableEntity, entity)) {
                        sendCommand(new CommandEntityInteractEntity(entity.id, interactableEntity.id, false));
                        entity.interacter.interacting = null;
                        entity.interacter.lastCheck = null;
                    }
                }
                entity.interacter.lastCheck = gameData.world.tickId;
            }
        });

        // Synchronize collisions:
        sendCommand(new CommandCollisions(World.collisionList));
        World.collisionList = [];
    }

    World.tickId++;
}

World.prototype.initializeEvents = function() {
    // Update physicsEntities
    // No unsubscribing is required, becuase world is owner of entityWorld
    World.entities.onAdd.set(this, function(entity) {
        if (entity.physicsBody)
            World.physicsEntities[entity.physicsBody.bodyId] = entity;
    }.bind(this));
    World.entities.onRemove.set(this, function(entity) {
        if (entity.physicsBody)
            World.physicsEntities[entity.physicsBody.bodyId] = undefined;

        if (entity.controlledByPlayer) {
            var playerId = entity.controlledByPlayer.playerId;
            var player = gameData.playerWorld.objects[playerId];
            if (player) {
                player.deathTick = World.tickId;
                player.entityId = null;
                if (!isServer && player.id == global.player.id) {
                    global.playerEntity = null;
                    global.playerEntityId = null;
                }
            }
        }
    }.bind(this));

    if (World.idList) {
        var onObjectRemove = function(object) { World.idList.remove(object.id); }.bind(this);
        World.entities.onRemove.set(this, onObjectRemove);
    }

    if (isServer) {
        World.physics.onCollision.push((collisions) => {
            World.collisionList = collisions;
        });
    }

    EntityProjectile.Events.onHit.set(this, function(projectileEntity, hitPos) {
        gameData.setTimeout(function(projectileEntity) {
            var type = projectileEntity.projectile.projectileType;
            if (type.isExplosive) {
                var shooter = World.entities.objects[projectileEntity.projectile.shooterEntityId];
                ExplosionFunctions.createExplosion(hitPos, type.explosiveRadius, type.explosiveEntityDamage, type.explosionBlockDamage, type.explosionTileDamage, shooter);
                if (isServer) sendCommand(new CommandParticles(ParticleFunctions.ExplosionParticles.id, hitPos, 10.0));
            }
            World.entities.remove(projectileEntity);
        }.bind(this, projectileEntity), projectileEntity.projectile.projectileType.stayTime);
        if (!isServer)
            ParticleFunctions.create(ParticleFunctions.BulletHitParticles, hitPos, projectileEntity.projectile.angle);
    }.bind(this));

    EntityProjectile.Events.onHitEntity.set(this, function(projectileEntity, hitEntity, hitPos) {
        if (isServer) {
            if (hitEntity && hitEntity.health && projectileEntity.projectile.projectileType.damage > 0) {
                var damage = projectileEntity.projectile.projectileType.damage * projectileEntity.projectile.damageFactor;
                var armorPenentration = projectileEntity.projectile.projectileType.armorPenentration;
                var shooterId = projectileEntity.projectile.shooterEntityId;
                var shooter = World.entities.objects[shooterId];
                Entity.hurt(hitEntity, shooter, damage, armorPenentration);
                sendCommand(new CommandParticles(ParticleFunctions.BloodHitParticles.id, hitPos, projectileEntity.projectile.angle));
            }
        }
    }.bind(this));

    EntityProjectile.Events.onHitBlock.set(this, function(projectileEntity, blockPos) {
        if (isServer) {
            if (projectileEntity.projectile.projectileType.blockDamage > 0) {
                var strength = World.blockWorld.getStrength(blockPos);
                var blockId = World.blockWorld.getForeground(blockPos);
                var block = gameData.blockRegister[blockId];
                var projectileArmor = (block.projectileArmor) ? block.projectileArmor : 0;
                strength -= (1 / block.hardness) * Math.round((1.0 - projectileArmor) * projectileEntity.projectile.projectileType.blockDamage);
                sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], Math.max(strength, 0)));
            }
        }
    }.bind(this));

    EntityProjectile.Events.onHitTile.set(this, function(projectileEntity, tilePos) {

    }.bind(this));

    EntityHealth.Events.onChange.set(this, function(entity) {
        if (!isServer) {
            var sprite = entity.drawable.sprites["healthbar"];
            if (!sprite) return;
            var defaultHealthbarWidth = 64;
            sprite.frame = [0, 0, (entity.health.health / entity.health.maxHealth) * defaultHealthbarWidth, sprite.texture.height];
        }
    }.bind(this));

    EntityHealth.Events.onDeath.set(this, function(entity, killer) {
        if (isServer && killer && killer.controlledByPlayer) {
            var player = gameData.playerWorld.objects[killer.controlledByPlayer.playerId];
            if (player)
                sendCommand(new CommandPlayerXP(player.id, entity.health.maxHealth / 4 >> 0));
        }

        if (!entity.isDead) {
            entity.isDead = true;
            World.entities.remove(entity);
        }

        Object.keys(entity).forEach(function(key) {
            var component = entity[key];
            if (component && component.onDestroy)
                component.onDestroy(entity);
        });
    }.bind(this));

    EntityInteractable.Events.onInteract.set(this, function(interactableEntity, interactingEntity) {
        //console.log(interactingEntity.id + " is now interacting with " + interactableEntity.id);
        if (!isServer) {
            if (global.playerEntity && global.playerEntity.id == interactingEntity.id) {
                if (interactableEntity.chest && interactableEntity.inventory) {
                    //TODO: inventory size
                    gameData.HUD.inventory2 = new InventoryHUD(interactableEntity.inventory, "Chest", 80);
                    gameData.HUD.inventory2.update();
                }
            }

            interactingEntity.bodyparts.bodyparts["rightArm"].cycle("rightArmAction", 200, true);
            interactingEntity.bodyparts.bodyparts["leftArm"].cycle("leftArmAction", 200, true);
        }
    });

    EntityInteractable.Events.onFinishInteract.set(this, function(interactableEntity, interactingEntity) {
        //console.log(interactingEntity.id + " is no longer interacting with " + interactableEntity.id);
        if (!isServer) {
            if (global.playerEntity && global.playerEntity.id == interactingEntity.id) {
                if (interactableEntity.chest && interactableEntity.inventory) {
                    gameData.HUD.inventory2.remove();
                    gameData.HUD.inventory2 = null;
                }
            }
        }
    });

    World.events.on("entityHitBlockSide", function(entity, blockPos, blockType, blockCollisionSide) {
        if (isServer && blockType && blockType.isDoor)
            blockType.clickFunction(blockPos, blockType, entity, 0);
    }.bind(this));

    World.events.on("equip", function(entity, stackId, itemType) {
        if (itemType.type == "tool" && itemType.typeOfType == "rangedWeapon") {
            var shoulderAngle = Math.PI / 4.0;
            if (entity.bodyparts.bodyparts["leftArm"]) {
                var pos = BodyPart.rotate(0, 0, entity.bodyparts.bodyparts["leftArm"].offset[0], entity.bodyparts.bodyparts["leftArm"].offset[1], shoulderAngle + 1.0);
                entity.bodyparts.bodyparts["leftArm"].offset[0] = -pos[0];
                entity.bodyparts.bodyparts["leftArm"].offset[1] = pos[1];
                entity.bodyparts.bodyparts["leftArm"].offset[2] = 2.5;
            }
            if (entity.bodyparts.bodyparts["rightArm"]) {
                pos = BodyPart.rotate(0, 0, entity.bodyparts.bodyparts["rightArm"].offset[0], entity.bodyparts.bodyparts["rightArm"].offset[1], shoulderAngle);
                entity.bodyparts.bodyparts["rightArm"].offset[0] = -pos[0];
                entity.bodyparts.bodyparts["rightArm"].offset[1] = pos[1];
            }
        }
    }.bind(this));

    EntityEquippedItems.Events.onDequip.set(this, (entity, stackId, itemType) => {
        if (itemType.type == "tool" && itemType.typeOfType == "rangedWeapon") {
            entity.bodyparts.bodyparts["tool"].offset[2] = entity.bodyparts.bodyparts["tool"].defaultOffset[2];
            entity.bodyparts.bodyparts["leftArm"].offset[2] = entity.bodyparts.bodyparts["leftArm"].defaultOffset[2];
            entity.bodyparts.bodyparts["rightArm"].offset[2] = entity.bodyparts.bodyparts["rightArm"].defaultOffset[2];

            entity.bodyparts.bodyparts["leftArm"].offset[0] = entity.bodyparts.bodyparts["leftArm"].defaultOffset[0];
            entity.bodyparts.bodyparts["leftArm"].offset[1] = entity.bodyparts.bodyparts["leftArm"].defaultOffset[1];
            entity.bodyparts.bodyparts["rightArm"].offset[0] = entity.bodyparts.bodyparts["rightArm"].defaultOffset[0];
            entity.bodyparts.bodyparts["rightArm"].offset[1] = entity.bodyparts.bodyparts["rightArm"].defaultOffset[1];
        }
    });
}

World.prototype.destroy = function() {
    Event.unsubscribeAll(EntityHealth.Events, this);
    Event.unsubscribeAll(EntityProjectile.Events, this);
    Event.unsubscribeAll(EntityEquippedItems.Events, this);
}*/
