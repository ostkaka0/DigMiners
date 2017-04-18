
var World = function() {
    this.tickId = 0;
    this.idList = (isServer) ? new IdList() : null;
    this.entityWorld = new ObjectWorld(true);
    this.particleWorld = new ParticleWorld();
    this.tileWorld = new TileWorld();
    this.blockWorld = new BlockWorld();
    this.celluralAutomata = new CelluralAutomata(this.blockWorld, global.gameData.blockRegister);
    this.physicsWorld = new PhysicsWorld();
    this.physicsEntities = {};
    this.generator = new Generator(Math.random() * 1000000 >> 0);

    this.inventoryIdList = new IdList();
    this.inventories = {};
    this.entityInventories = {};


    this.commands = [];
    this.pendingCommands = {};
    this.commandCallbacks = [];

    this.events = new EventHandler();
    this.initializeEvents();
    this.events2 = { onPlayerSpawn: [] };

    //Temp variables:
    this.collisionList = []; // Updated, then sent before tick ends
}
global.World = World;

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
    this.celluralAutomata.tick();
    this.physicsWorld.update(dt);
    EntityMovement.entityFunction(dt);
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
        sendCommand(new CommandCollisions(this.collisionList));
        this.collisionList = [];
    }

    this.tickId++;
}

World.prototype.initializeEvents = function() {
    // Update physicsEntities
    // No unsubscribing is required, becuase world is owner of entityWorld
    this.entityWorld.onAdd.set(this, function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = entity;
    }.bind(this));
    this.entityWorld.onRemove.set(this, function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = undefined;

        if (entity.controlledByPlayer) {
            var playerId = entity.controlledByPlayer.playerId;
            var player = global.gameData.playerWorld.objects[playerId];
            if (player) {
                player.deathTick = this.tickId;
                player.entityId = null;
                if (!isServer && player.id == global.player.id) {
                    global.playerEntity = null;
                    global.playerEntityId = null;
                }
            }
        }
    }.bind(this));

    if (this.idList) {
        var onObjectRemove = function(object) { this.idList.remove(object.id); }.bind(this);
        this.entityWorld.onRemove.set(this, onObjectRemove);
    }

    if (isServer) {
        this.physicsWorld.onCollision.push((collisions) => {
            this.collisionList = collisions;
        });
    }

    EntityProjectile.Events.onHit.set(this, function(projectileEntity, hitPos) {
        global.gameData.setTimeout(function(projectileEntity) {
            var type = projectileEntity.projectile.projectileType;
            if (type.isExplosive) {
                var shooter = this.entityWorld.objects[projectileEntity.projectile.shooterEntityId];
                ExplosionFunctions.createExplosion(hitPos, type.explosiveRadius, type.explosiveEntityDamage, type.explosionBlockDamage, type.explosionTileDamage, shooter);
                if (isServer) sendCommand(new CommandParticles(ParticleFunctions.ExplosionParticles.id, hitPos, 10.0));
            }
            this.entityWorld.remove(projectileEntity);
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
                var shooter = this.entityWorld.objects[shooterId];
                Entity.hurt(hitEntity, shooter, damage, armorPenentration);
                sendCommand(new CommandParticles(ParticleFunctions.BloodHitParticles.id, hitPos, projectileEntity.projectile.angle));
            }
        }
    }.bind(this));

    EntityProjectile.Events.onHitBlock.set(this, function(projectileEntity, blockPos) {
        if (isServer) {
            if (projectileEntity.projectile.projectileType.blockDamage > 0) {
                var strength = this.blockWorld.getStrength(blockPos);
                var blockId = this.blockWorld.getForeground(blockPos);
                var block = global.gameData.blockRegister[blockId];
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
            this.entityWorld.remove(entity);
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
                    global.gameData.HUD.inventory2 = new InventoryHUD(interactableEntity.inventory, "Chest", 80);
                    global.gameData.HUD.inventory2.update();
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
                    global.gameData.HUD.inventory2.remove();
                    global.gameData.HUD.inventory2 = null;
                }
            }
        }
    });

    this.events.on("entityHitBlockSide", function(entity, blockPos, blockType, blockCollisionSide) {
        if (isServer && blockType && blockType.isDoor)
            blockType.clickFunction(blockPos, blockType, entity, 0);
    }.bind(this));


    Event.subscribe(EntityEquippedItems.Events.onEquip, this, function(entity, stackId, itemType) {
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

    Event.subscribe(EntityEquippedItems.Events.onDequip, this, function(entity, stackId, itemType) {
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
}
