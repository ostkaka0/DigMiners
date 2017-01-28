import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import TileWorld from "engine/TileWorld.js"
import BlockWorld from "engine/BlockWorld.js"
import Sprite from "engine/Animation/Sprite.js"
import Event from "engine/Core/Event.js"

import Config from "game/Config.js"
import Global from "game/Global.js"
import { Team, Teams } from "game/Entity/Team.js"
import Chest from "game/Entity/Chest.js"
import PhysicsBody from "game/Entity/PhysicsBody.js"
import Health from "game/Entity/Health.js"
import Bodyparts from "game/Entity/Bodyparts.js"
import PotionEffects from "game/Entity/PotionEffects.js"
import PotionEffectTypes from "game/PotionEffectTypes.js"
import Interactable from "game/Entity/Interactable.js"
import CommandPlaceBlock from "game/Command/CommandPlaceBlock.js"
import CommandEntitySpawn from "game/Command/CommandEntitySpawn.js"
import CommandBuild from "game/Command/CommandBuild.js"
import CommandBlockStrength from "game/Command/CommandBlockStrength.js"
import { CommandEntityInventory, InventoryActions } from "game/Command/CommandEntityInventory.js"
import CommandEntityEquipItem from "game/Command/CommandEntityEquipItem.js"
import entityTemplatesTurret from "game/Entity/EntityTemplates/Turret.js"

export var BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1
}

export var Blocks = {};
export default Blocks

export var BlockFunctions = {};
BlockFunctions.createEntity = function(blockPos, block) {
    if (isServer) {
        var entity = block.createEntity(blockPos, block);
        var entityId = Global.gameData.world.idList.next();
        sendCommand(new CommandPlaceBlock(blockPos, 0));
        sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId));
    }
}

BlockFunctions.createEntityBox = function(blockPos, block) {
    if (isServer) {
        var entity = {};
        var entityId = Global.gameData.world.idList.next();
        entity.physicsBody = new PhysicsBody(v2.create(blockPos[0] + 0.5, blockPos[1] + 0.5), 0.01);
        entity.health = new Health(100, 100);
        var bodySprite = new Sprite(block.name);
        var bodyparts = {
            "body": new BodyPart(bodySprite, 0, 0, 0),
            "text": new BodyPart(bodySprite, 0, 0, 0)
        };
        entity.bodyparts = new Bodyparts(bodyparts);
        entity.drawable = new Drawable(1);
        var healthbarSprite = new Sprite("healthbar.png");
        entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

        if (block.onCreateEntity)
            entity = block.onCreateEntity(entity, entityId);

        sendCommand(new CommandPlaceBlock(blockPos, 0));
        sendCommand(new CommandEntitySpawn(Global.gameData, entity, entityId));
    }
}

export var BlockBulletFunctions = {};
BlockFunctions.createEntityTurret = function(blockPos, block) {
    if (isServer) {
        var turretEntityId = Global.gameData.world.idList.next();
        var turret = entityTemplatesTurret(turretEntityId, v2.create(blockPos[0] + 0.5, blockPos[1] + 0.5), Teams.Human);

        if (block.onCreateEntity)
            entity = block.onCreateEntity(turret, turretEntityId);

        sendCommand(new CommandPlaceBlock(blockPos, 0));
        sendCommand(new CommandEntitySpawn(Global.gameData, turret, turretEntityId));

        if (block.onEntityCreated)
            block.onEntityCreated(turret, turretEntityId);
    }
}

BlockBulletFunctions.bunker = function(blockPos, blockType, entity) {
    if (entity.projectile.projectileType.penentrateBunkerWindow)
        return;
    // Fix of diagonal shooting
    if (entity.projectile.lastBunkerPos != undefined) {
        var dir = [Math.abs(Math.cos(entity.projectile.angle)), Math.abs(-Math.sin(entity.projectile.angle))]
        if (dir[0] > dir[1] && entity.projectile.lastBunkerPos[0] == blockPos[0])
            return
        else if (dir[1] > dir[0] && entity.projectile.lastBunkerPos[1] == blockPos[1])
            return;
    }
    entity.projectile.lastBunkerPos = v2.clone(blockPos);
    var entityPos = entity.projectile.startPos;
    var deltaPos = [blockPos[0] + 0.5 - entityPos[0], blockPos[1] + 0.5 - entityPos[1]];
    deltaPos = [Math.max(0, Math.abs(deltaPos[0]) - 0.5), Math.max(0, Math.abs(deltaPos[1]) - 0.5)];
    var dis = v2.length(deltaPos);
    var rand = noiseRand(noiseRand(noiseRand(noiseRand(blockPos[0]) ^ blockPos[1]) ^ Global.gameData.world.tickId) ^ entity.id) % 100;
    var damageFactor;
    if (dis > blockType.bulletBunkerDistance)
        damageFactor = blockType.bulletBunkerFarFactor;
    else
        damageFactor = blockType.bulletBunkerNearFactor;

    if (rand > damageFactor * 100) {
        Event.trigger(ProjectileEvents.onHitBlock, entity, blockPos);
        entity.projectile.hit = true;
        return;
    }
}

export var BlockDoorFunctions = {};
BlockDoorFunctions.redForcefield = function(startBlockPos, blockType, entity, clickType) {
    var checked = [];
    var doors = [];

    var runRecursively = function(blockPos, blockType) {
        doors.push(blockPos);
        var blockPositions = [
            [blockPos[0] + 1, blockPos[1]],
            [blockPos[0] - 1, blockPos[1]],
            [blockPos[0], blockPos[1] + 1],
            [blockPos[0], blockPos[1] - 1],
        ]

        for (var i = 0; i < blockPositions.length; ++i) {
            var pos = blockPositions[i];
            if (checked[pos[0]] == null || checked[pos[0]][pos[1]] == null) {
                if (checked[pos[0]] == null)
                    checked[pos[0]] = [];
                checked[pos[0]][pos[1]] = BlockWorld.getStrength(Global.gameData.world.blockWorld, pos[0], pos[1]);
                var blockId = BlockWorld.getForeground(Global.gameData.world.blockWorld, pos[0], pos[1]);
                if (blockType.id == blockId)
                    runRecursively(pos, blockType);
            }

        }
    }
    checked[startBlockPos[0]] = [];
    checked[startBlockPos[0]][startBlockPos[1]] = BlockWorld.getStrength(Global.gameData.world.blockWorld, startBlockPos[0], startBlockPos[1]);
    runRecursively(startBlockPos, blockType);

    // Too big doors should not work.
    if (doors.length > blockType.maxDoorSize)
        return;

    Global.gameData.setTimeout(function() {
        for (var i = 0; i < doors.length; ++i) {
            var blockPos = doors[i];
            sendCommand(new CommandBuild(blockPos[0], blockPos[1], Blocks.RedForcefieldOpen.id, BlockTypes.FOREGROUND));
            sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], checked[blockPos[0]][blockPos[1]]));
        }

        var blockTypeId = blockType.id;
        if (doors.length > 0) {
            var checkDoorClose = function() {
                Global.gameData.setTimeout(function() {
                    var shouldClose = true;
                    for (var i = 0; i < this.length; ++i) {
                        var blockPos = this[i];
                        var bodies = [];
                        Global.gameData.world.physicsWorld.getBodiesInRadius(bodies, [blockPos[0] + 0.5, blockPos[1] + 0.5], 0.5); // TODO: 1.0 magic number
                        if (bodies.length > 0) {
                            shouldClose = false;
                            break;
                        }

                    }
                    if (shouldClose) {
                        for (var i = 0; i < this.length; ++i) {
                            var blockPos = this[i];
                            sendCommand(new CommandBuild(blockPos[0], blockPos[1], blockTypeId, BlockTypes.FOREGROUND));
                            sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], checked[blockPos[0]][blockPos[1]]));
                        }
                    } else
                        checkDoorClose();
                }.bind(this), blockType.doorOpenTime);
            }.bind(this);
            checkDoorClose();
        }
    }.bind(doors), blockType.doorOpenDelay);
}

BlockDoorFunctions.blueForcefield = function(blockPos, blockType, entity, clickType) {
    var startStrength = BlockWorld.getStrength(Global.gameData.world.blockWorld, blockPos[0], blockPos[1]);
    Global.gameData.setTimeout(function() {
        sendCommand(new CommandBuild(blockPos[0], blockPos[1], Blocks.BlueForcefieldOpen.id, BlockTypes.FOREGROUND));
        sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], startStrength));

        var checkDoorClose = function() {
            Global.gameData.setTimeout(function() {
                var bodies = [];
                Global.gameData.world.physicsWorld.getBodiesInRadius(bodies, [blockPos[0] + 0.5, blockPos[1] + 0.5], 0.5); // TODO: 1.0 magic number
                if (bodies.length > 0)
                    checkDoorClose();
                else {
                    sendCommand(new CommandBuild(blockPos[0], blockPos[1], blockType.id, BlockTypes.FOREGROUND));
                    sendCommand(new CommandBlockStrength(blockPos[0], blockPos[1], startStrength));
                }
            }, blockType.doorOpenTime);
        }
        checkDoorClose();
    }, blockType.doorOpenDelay);
}

export function initBlocks() {
    Blocks.Null = {
        name: "Air",
        isSolid: false,
        hardness: 0,
        type: -1
    }

    Blocks.StoneWall = {
        name: "Stone Wall",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 20
    };

    Blocks.WoodCrate = {
        name: "Wood Crate",
        isSolid: true,
        hardness: 0.50,
        type: BlockTypes.FOREGROUND,
        buildDuration: 5,
        /*onPlace: BlockFunctions.createEntity,
        createEntity: function(blockPos, block) {
            var entity = {};
            entity.physicsBody = new PhysicsBody(v2.create(blockPos[0] + 0.5, blockPos[1] + 0.5), 0.01, 4.0);
            entity.health = new Health(50, 50);

            var bodySprite = new Sprite(block.name);
            var bodyparts = {
                "body": new BodyPart(bodySprite, 0, 0, 0),
                "text": new BodyPart(bodySprite, 0, 0, 0)
            };
            entity.bodyparts = new Bodyparts(bodyparts);
            entity.drawable = new Drawable(0);

            return entity;
        }*/
    }

    Blocks.StoneFloor = {
        name: "Stone Floor",
        isSolid: false,
        hardness: 1.0,
        type: BlockTypes.BACKGROUND
    };

    Blocks.BunkerWindow = {
        name: "Bunker Window",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 40,
        isBulletSolid: false,
        bulletFunction: BlockBulletFunctions.bunker,
        bulletBunkerDistance: 1.0,
        bulletBunkerNearFactor: 1.0,
        bulletBunkerFarFactor: 0.5,
        projectileArmor: 0.5
    }

    Blocks.BlueForcefield = {
        name: "Blue Forcefield",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 40,
        isDoor: true,
        clickFunction: BlockDoorFunctions.blueForcefield,
        maxDoorSize: 1,
        doorOpenTime: 2000,
        doorOpenDelay: 200
    }

    Blocks.RedForcefield = {
        name: "Red Forcefield",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 40,
        isDoor: true,
        clickFunction: BlockDoorFunctions.redForcefield,
        maxDoorSize: 10,
        doorOpenTime: 2000,
        doorOpenDelay: 200
    }

    Blocks.BlueForcefieldOpen = {
        name: "Blue Forcefield",
        isSolid: false,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND
    }

    Blocks.RedForcefieldOpen = {
        name: "Red Forcefield",
        isSolid: false,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND
    }

    Blocks.HealthBox = {
        name: "Health Box",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 40,
        onPlace: BlockFunctions.createEntityBox,
        onCreateEntity: function(entity) {
            entity.potionEffects = new PotionEffects();
            entity.potionEffects.add(PotionEffectTypes.HealNearEntities, -1);
            return entity;
        }
    }

    Blocks.AmmoBox = {
        name: "Ammo Box",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 40,
        onPlace: BlockFunctions.createEntityBox,
        onCreateEntity: function(entity) {
            entity.potionEffects = new PotionEffects();
            entity.potionEffects.add(PotionEffectTypes.SupplyAmmoNearEntities, -1);
            return entity;
        }
    }

    Blocks.Chest = {
        name: "Chest",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 5,
        onPlace: BlockFunctions.createEntityBox,
        onCreateEntity: function(entity, entityId) {
            entity.interactable = new Interactable(function(interactableEntity, entity) {
                if (v2.distance(interactableEntity.physicsBody.getPos(), entity.physicsBody.getPos()) > 1.5)
                    return false;
                return true;
            });
            entity.chest = new Chest();
            entity.inventory = Inventory.createInventory(entityId, 4, 4);
            entity.inventory.addItem(Global.gameData, Items.RustyShovel.id, Math.floor(Math.random() * 8));
            return entity;
        }
    }

    Blocks.MachineGunTurret = {
        name: "Turret(Machinegun)",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 5,
        onPlace: BlockFunctions.createEntityTurret,
        onCreateEntity: null,
        onEntityCreated: function(entity, entityId) {
            var weaponId = Items.WeaponMachineGun.id;
            sendCommand(new CommandEntityInventory(entityId, InventoryActions.ADD_ITEM, weaponId, 1));
            sendCommand(new CommandEntityEquipItem(entityId, 0, weaponId, true));
        }
    }

    Blocks.PistolTurret = {
        name: "Turret(Pistol)",
        isSolid: true,
        hardness: 1.0,
        type: BlockTypes.FOREGROUND,
        buildDuration: 5,
        onPlace: BlockFunctions.createEntityTurret,
        onCreateEntity: null,
        onEntityCreated: function(entity, entityId) {
            var weaponId = Items.WeaponPistol.id;
            sendCommand(new CommandEntityInventory(entityId, InventoryActions.ADD_ITEM, weaponId, 1));
            sendCommand(new CommandEntityEquipItem(entityId, 0, weaponId, true));
        }
    }
}
