
var World = null;
var WorldEvents = { onInit: new Map() };
var WorldPendingCommands = {};

var worldInit = function() {
    World = {
        tickId: 0,
        idList: (isServer) ? new IdList() : null,
        entities: new ObjectWorld(true),
        particles: new ParticleWorld(),
        tiles: new TileWorld(),
        blocks: new BlockWorld(),
        physics: new PhysicsWorld(),
        physicsEntityMap: {},
        generator: new Generator(123),
        pendingCommands: WorldPendingCommands,
        commands: [],
        timeouts: {},
        timeoutIdList: new IdList(),
        inventoryIdList: new IdList(),
        inventories: {},
        entityInventories: {},
        events: new EventHandler(),
    };
    WorldPendingCommands = {};
    worldInitializeEvents();
    Event.trigger(WorldEvents.onInit);
}

var worldDestroy = function() {
    if (!World) return;
    worldClearTimeouts();
    World = null;
}

var worldTick = function(dt) {
    if (!World) return;
    var commands = World.commands;
    World.commands = [];
    if (World.pendingCommands[World.tickId])
        commands = commands.concat(World.pendingCommands[World.tickId]);
    delete World.pendingCommands[World.tickId];

    Object.keys(WorldPendingCommands).forEach(function(key) {
        commands = commands.concat(WorldPendingCommands[key]);
    });
    WorldPendingCommands = {};

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

worldSetTimeout = function(callback, duration) {
    var timeoutId = World.timeoutIdList.next();
    var timeout = setTimeout(function() {
        delete World.timeouts[timeoutId];
        callback();
    }, duration);
    World.timeouts[timeoutId] = timeout;
    return timeout;
}

worldClearTimeouts = function() {
    Object.keys(World.timeouts).forEach(function(timeoutId) {
        clearTimeout(World.timeouts[timeoutId]);
    }.bind(this));
    World.timeouts = {};
}

worldInitializeEvents = function() {
    // Update physicsEntityMap
    // No unsubscribing is required, becuase world is owner of entityWorld

    Event.subscribe(World.entities.onAdd, World, function(entity) {
        if (entity.physicsBody)
            World.physicsEntityMap[entity.physicsBody.bodyId] = entity;
    }.bind(this));
    Event.subscribe(World.entities.onRemove, World, function(entity) {
        if (entity.physicsBody)
            World.physicsEntityMap[entity.physicsBody.bodyId] = undefined;

        if (entity.controlledByPlayer) {
            var playerId = entity.controlledByPlayer.playerId;
            var player = Game.playerWorld.objects[playerId];
            if (player) {
                player.deathTick = World.tickId;
                player.entityId = null;
                if (!isServer && player.id == Client.playerId) {
                    Client.playerEntity = null;
                    Client.playerEntityId = null;
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
    } else {
        World.physics.onCollision.push(function(collisions) {
            if (Client.playerEntity && collisions) {
                collisions.forEach(function(collision) {
                    var aEntity = World.physicsEntityMap[collision[0]];
                    var bEntity = World.physicsEntityMap[collision[1]];
                    if (aEntity == undefined || bEntity == undefined) return;
                    var playerEntity = null;
                    var itemEntity = null;
                    if (aEntity.id == Client.playerEntity.id) {
                        playerEntity = aEntity;
                        itemEntity = bEntity;
                    } else if (bEntity.id == Client.playerEntity.id) {
                        playerEntity = bEntity;
                        itemEntity = aEntity;
                    } else
                        return;
                    if (itemEntity.item && itemEntity.physicsBody && (!itemEntity.item.dropped || ((new Date()) - itemEntity.item.dropped) >= 500)) {
                        var message = new MessageRequestItemPickup(itemEntity.id);
                        message.send(Client.socket);
                    }
                });
            }
        });
    }

    EntityProjectile.Events.onHit.set(this, function(projectileEntity, hitPos) {
        worldSetTimeout(function(projectileEntity) {
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
                var strength = World.blocks.getStrength(blockPos);
                var blockId = World.blocks.getForeground(blockPos);
                var block = Game.blockRegister[blockId];
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
            var player = Game.playerWorld.objects[killer.controlledByPlayer.playerId];
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
            if (Client.playerEntity && Client.playerEntity.id == interactingEntity.id) {
                if (interactableEntity.chest && interactableEntity.inventory) {
                    //TODO: inventory size
                    Game.HUD.inventory2 = new InventoryHUD(interactableEntity.inventory, "Chest", 80);
                    Game.HUD.inventory2.update();
                }
            }

            interactingEntity.bodyparts.bodyparts["rightArm"].cycle("rightArmAction", 200, true);
            interactingEntity.bodyparts.bodyparts["leftArm"].cycle("leftArmAction", 200, true);
        }
    });

    EntityInteractable.Events.onFinishInteract.set(this, function(interactableEntity, interactingEntity) {
        //console.log(interactingEntity.id + " is no longer interacting with " + interactableEntity.id);
        if (!isServer) {
            if (Client.playerEntity && Client.playerEntity.id == interactingEntity.id) {
                if (interactableEntity.chest && interactableEntity.inventory) {
                    Game.HUD.inventory2.remove();
                    Game.HUD.inventory2 = null;
                }
            }
        }
    });

    World.events.on("entityHitBlockSide", function(entity, blockPos, blockType, blockCollisionSide) {
        if (isServer && blockType && blockType.isDoor)
            blockType.clickFunction(blockPos, blockType, entity, 0);
    }.bind(this));

    Event.subscribe(EntityEquippedItems.Events.onEquip, this, (entity, stackId, itemType) => {
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
    });

    Event.subscribe(EntityEquippedItems.Events.onDequip, this, (entity, stackId, itemType) => {
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

    if (!isServer) {
        World.events.on("ownPlayerSpawned", function(entity, player) {
            if (Game.HUD.inventory)
                Game.HUD.inventory.remove();
            if (entity.inventory) {
                Game.HUD.inventory = new InventoryHUD(entity.inventory, "Your amazing inventory", 10);
                Game.HUD.inventory.update();
            }
        });
    }
}