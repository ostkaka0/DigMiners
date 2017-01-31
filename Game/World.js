var Event = require("Engine/Core/Event.js")
var Map2D = require("Engine/Core/Map2D.js")
var IdList = require("Engine/IdList.js")
var ObjectWorld = require("Engine/ObjectWorld.js")
var ParticleWorld = require("Engine/ParticleWorld.js")
var PhysicsWorld = require("Engine/PhysicsWorld.js")
var Generator = require("Game/Generator.js")
var EventHandler = require("Engine/EventHandler.js")
var BodyPart = require("Engine/Animation/BodyPart.js")
var BlockWorld = require("Engine/BlockWorld.js")

var Global = require("Game/Global.js")
var Config = require("Game/Config.js")
var Entity = require("Game/Entity/Entity.js")
var Projectile = require("Game/Entity/Projectile.js")
var Health = require("Game/Entity/Health.js")
var Interacter = require("Game/Entity/Interacter.js")
var Interactable = require("Game/Entity/Interactable.js")
var EntityTemplates = require("Game/Entity/EntityTemplates/EntityTemplates.js")
var Movement = require("Game/Entity/Movement.js")
var entityFunctionPhysicsBodySimulate = require("Game/Entity/Physics.js")
var entityFunctionProjectileSimulate = require("Game/ProjectilePhysics.js").entityFunctionProjectileSimulate
var CommandParticles = require("Game/Command/CommandParticles.js")
var CommandBlockStrength = require("Game/Command/CommandBlockStrength.js")
var CommandEntityInteractEntity = require("Game/Command/CommandEntityInteractEntity.js")
var CommandCollisions = require("Game/Command/CommandCollisions.js")
var InventoryHUD = require("Game/GUI/InventoryHUD.js")
var ParticleFunctions = require("Game/ParticleFunctions.js")

var World = function() {
    this.tickId = 0;
    this.idList = (isServer) ? new IdList() : null;
    this.entityWorld = new ObjectWorld(true);
    this.particleWorld = new ParticleWorld();
    this.tileWorld = new Map2D();
    this.blockWorld = new Map2D();
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
}
module.exports = World

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
    Movement.entityFunction(dt);
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
    }

    this.tickId++;
}

World.prototype.initializeEvents = function() {
    // Update physicsEntities
    // No unsubscribing is required, becuase world is owner of entityWorld
    Event.subscribe(this.entityWorld.onAdd, this, function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = entity;
    }.bind(this));
    Event.subscribe(this.entityWorld.onRemove, this, function(entity) {
        if (entity.physicsBody)
            this.physicsEntities[entity.physicsBody.bodyId] = undefined;
    }.bind(this));

    if (this.idList) {
        var onObjectRemove = function(object) { this.idList.remove(object.id); }.bind(this);
        Event.subscribe(this.entityWorld.onRemove, this, onObjectRemove);
    }

    if (isServer) {
        this.physicsWorld.onCollision.push(function(collisions) {
            sendCommand(new CommandCollisions(collisions));
        });
    }

    Event.subscribe(Projectile.Events.onHit, this, function(projectileEntity, hitPos) {
        Global.gameData.setTimeout(function(projectileEntity) {
            var type = projectileEntity.projectile.projectileType;
            if (type.isExplosive)
                createExplosion(hitPos, type.explosiveRadius, type.explosiveEntityDamage, type.explosionBlockDamage, type.explosionTileDamage);
            this.entityWorld.remove(projectileEntity);
        }.bind(this, projectileEntity), projectileEntity.projectile.projectileType.stayTime);
        if (!isServer)
            ParticleFunctions.create(ParticleFunctions.BulletHitParticles, hitPos, projectileEntity.projectile.angle);
    }.bind(this));

    Event.subscribe(Projectile.Events.onHitEntity, this, function(projectileEntity, hitEntity, hitPos) {
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

    Event.subscribe(Projectile.Events.onHitBlock, this, function(projectileEntity, blockPos) {
        if (isServer) {
            if (projectileEntity.projectile.projectileType.blockDamage > 0) {
                var strength = BlockWorld.getStrength(this.blockWorld, blockPos[0], blockPos[1]);
                var blockId = BlockWorld.getForeground(this.blockWorld, blockPos[0], blockPos[1]);
                var block = Config.blockRegister[blockId];
                var projectileArmor = (block.projectileArmor) ? block.projectileArmor : 0;
                strength -= (1 / block.hardness) * Math.round((1.0 - projectileArmor) * projectileEntity.projectile.projectileType.blockDamage);
                sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], Math.max(strength, 0)));
            }
        }
    }.bind(this));

    Event.subscribe(Projectile.Events.onHitTile, this, function(projectileEntity, tilePos) {

    }.bind(this));

    Event.subscribe(Health.Events.onChange, this, function(entity) {
        if (!isServer) {
            var sprite = entity.drawable.sprites["healthbar"];
            if (!sprite) return;
            var defaultHealthbarWidth = 64;
            sprite.frame = [0, 0, (entity.health.health / entity.health.maxHealth) * defaultHealthbarWidth, sprite.texture.height];
        }
    }.bind(this));

    Event.subscribe(Health.Events.onDeath, this, function(entity) {
        if (!entity.isDead) {
            entity.isDead = true;
            this.entityWorld.remove(entity);
            if (entity.controlledByPlayer) {
                var playerId = entity.controlledByPlayer.playerId;
                var player = Global.gameData.playerWorld.objects[playerId];
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

    Event.subscribe(Interactable.Events.onInteract, this, function(interactableEntity, interactingEntity) {
        //console.log(interactingEntity.id + " is now interacting with " + interactableEntity.id);
        if (!isServer) {
            if (global.playerEntity && global.playerEntity.id == interactingEntity.id) {
                if (interactableEntity.chest && interactableEntity.inventory) {
                    //TODO: inventory size
                    Global.gameData.HUD.inventory2 = new InventoryHUD(interactableEntity.inventory, "Chest", 80);
                    Global.gameData.HUD.inventory2.update();
                }
            }

            interactingEntity.bodyparts.bodyparts["rightArm"].cycle("rightArmAction", 200, true);
            interactingEntity.bodyparts.bodyparts["leftArm"].cycle("leftArmAction", 200, true);
        }
    });

    Event.subscribe(Interactable.Events.onFinishInteract, this, function(interactableEntity, interactingEntity) {
        //console.log(interactingEntity.id + " is no longer interacting with " + interactableEntity.id);
        if (!isServer) {
            if (global.playerEntity && global.playerEntity.id == interactingEntity.id) {
                if (interactableEntity.chest && interactableEntity.inventory) {
                    Global.gameData.HUD.inventory2.remove();
                    Global.gameData.HUD.inventory2 = null;
                }
            }
        }
    });

    this.events.on("entityHitBlockSide", function(entity, blockPos, blockType, blockCollisionSide) {
        if (isServer && blockType && blockType.isDoor)
            blockType.clickFunction(blockPos, blockType, entity, 0);
    }.bind(this));

    this.events.on("equip", function(entity, stackId, itemType) {
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
    Event.unsubscribeAll(Health.Events, this);
    Event.unsubscribeAll(Projectile.Events, this);
}
