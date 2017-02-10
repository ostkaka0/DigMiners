import Event from "Engine/Core/Event.js";
import Map2D from "Engine/Core/Map2D.js";
import IdList from "Engine/IdList.js";
import ObjectWorld from "Engine/ObjectWorld.js";
import ParticleWorld from "Engine/ParticleWorld.js";
import PhysicsWorld from "Engine/PhysicsWorld.js";
import Generator from "Game/Generator.js";
import EventHandler from "Engine/EventHandler.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import BlockWorld from "Engine/BlockWorld.js";

import Global from "Game/Global.js";
import Config from "Game/Config.js";
import Entity from "Game/Entity/Entity.js";
import Projectile from "Game/Entity/Projectile.js";
import Health from "Game/Entity/Health.js";
import Interacter from "Game/Entity/Interacter.js";
import Interactable from "Game/Entity/Interactable.js";
import EntityTemplates from "Game/Entity/EntityTemplates/EntityTemplates.js";
import Movement from "Game/Entity/Movement.js";
import entityFunctionPhysicsBodySimulate from "Game/Entity/Physics.js";
import {entityFunctionProjectileSimulate} from "Game/ProjectilePhysics.js";
import CommandParticles from "Game/Command/CommandParticles.js";
import CommandBlockStrength from "Game/Command/CommandBlockStrength.js";
import CommandEntityInteractEntity from "Game/Command/CommandEntityInteractEntity.js";
import CommandCollisions from "Game/Command/CommandCollisions.js";
import InventoryHUD from "Game/GUI/InventoryHUD.js";
import ParticleFunctions from "Game/ParticleFunctions.js";
import ExplosionFunctions from "Game/ExplosionFunctions.js";

var World = function() {
    this.tickId = 0;
    this.idList = (isServer) ? new IdList() : null;
    this.entityWorld = new ObjectWorld(true);
    this.particleWorld = new ParticleWorld();
    this.tileWorld = new Map2D();
    this.blockWorld = new BlockWorld();
    this.physicsWorld = new PhysicsWorld();
    this.physicsEntities = {};
    this.generator = new Generator(Math.random() * 1000000 >> 0);

    this.inventoryIdList = new IdList();
    this.inventories = {};
    this.entityInventories = {};

    this.playerSpawns = {};
    this.playerSpawnAllowed = true;

    this.commands = [];
    this.pendingCommands = {};
    this.commandCallbacks = [];

    this.events = new EventHandler();
    this.initializeEvents();
    this.events2 = { onPlayerSpawn: [] };

    //Temp variables:
    this.collisionList = []; // Updated, then sent before tick ends
}
export default World

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

        // Synchronize collisions:
        sendCommand(new CommandCollisions(this.collisionList));
        this.collisionList = [];
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
        this.physicsWorld.onCollision.push((collisions) => {
            this.collisionList = collisions;
        });
    }

    Event.subscribe(Projectile.Events.onHit, this, function(projectileEntity, hitPos) {
        Global.gameData.setTimeout(function(projectileEntity) {
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
                var strength = this.blockWorld.getStrength(blockPos);
                var blockId = this.blockWorld.getForeground(blockPos);
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
