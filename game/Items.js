var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var TileWorld = require("engine/TileWorld.js")
var BlockWorld = require("engine/BlockWorld.js")
var BlockChunk = require("engine/BlockChunk.js")

var Blocks = require("game/Blocks.js")
var Tiles = require("game/Tiles.js")
var Projectiles = require("game/Projectiles.js")
var Entity = require("game/Entity/Entity.js")

var Config = require("game/Config.js")
var Global = require("game/Global.js")

var CommandBlockStrength = require("game/Command/CommandEntityReloadWeapon.js")
var CommandEntityDig = require("game/Command/CommandEntityDig.js")
var CommandProjectileSpawn = require("game/Command/CommandProjectileSpawn.js")
var CommandEntityReloadWeapon = require("game/Command/CommandEntityReloadWeapon.js")

var Items = module.exports;
Items.Types = {};
Items.Functions = {};
var ItemTextures = {};
var ItemEvents = {};
Items.Events = ItemEvents;
Items.Events.onShoot = [];

Items.Functions.Shovel = function(entity, item) {
    // Shovels might be meele weapons
    Items.Functions.Sword(entity, item);

    if (isServer) {
        var angle = entity.physicsBody.angle;
        var dir = [Math.cos(-angle), Math.sin(-angle)];
        var toolUsePos = [entity.physicsBody.getPos()[0] + 1.0 * dir[0], entity.physicsBody.getPos()[1] + 1.0 * dir[1]];

        // Break block
        var chunkPos = [];
        var localPos = [];
        BlockChunk.fromV2World(toolUsePos, chunkPos, localPos);
        var blockChunk = Global.gameData.world.blockWorld.get(chunkPos[0], chunkPos[1]);
        if (blockChunk) {
            var blockId = blockChunk.getForeground(localPos[0], localPos[1]);
            if (blockId) {
                var blockType = Config.blockRegister[blockId];
                var strength = blockChunk.getStrength(localPos[0], localPos[1]);
                // TODO: 16 magic value
                strength -= 16 * (Entity.getBlockBreakSpeed(entity) / blockType.hardness);
                var x = chunkPos[0] * BlockChunk.dim + localPos[0];
                var y = chunkPos[1] * BlockChunk.dim + localPos[1];
                sendCommand(new CommandBlockStrength(x, y, Math.max(strength, 0)));
                return;
            }
        }

        // Dig terrain
        Global.gameData.world.commands.push(new CommandEntityDig(entity.id, entity.physicsBody.getPos(), dir, 1.5, Entity.getDigSpeed(entity), Entity.getMaxDigHardness(entity)));
    }
}

Items.Functions.Sword = function(entity, item) {
    if (isServer) {
        var physicsWorld = Global.gameData.world.physicsWorld;
        var hitRange = item.hitRange || 1.0;
        var hitRadius = item.hitRadius || 0.5;
        var damage = item.damage || 10.0;
        var bodies = [];
        var entityBodyId = entity.physicsBody.bodyId;
        var entityPos = entity.physicsBody.getPos();
        var angle = entity.physicsBody.angle;
        var dir = [Math.cos(-angle), Math.sin(-angle)];
        var hitPos = [0, 0];
        v2.mul(hitRange, dir, hitPos);
        v2.add(entityPos, hitPos, hitPos);
        physicsWorld.getBodiesInRadius(bodies, hitPos, hitRadius);

        var hitEntities = [];

        bodies.forEach(function(bodyId) {
            if (bodyId == entityBodyId) return;
            var targetEntity = Global.gameData.world.physicsEntities[bodyId];
            if (!targetEntity) return;

            hitEntities.push(targetEntity.id);
            if (targetEntity.health)
                Entity.hurt(targetEntity, entity, damage, 1.0);
        });

        // TODO: CommandEntityHit
        //if (isServer) {
        //    Global.gameData.world.commands.push(new CommandEntityHit(entity, hitEntities));
        //}
    }
}

Items.Functions.Potion = function(entity, item) {
    var potionEffectType = item.getPotionEffect();
    if (entity.potionEffects) {
        entity.potionEffects.add(potionEffectType, item.potionDuration);
    }
    if (entity.inventory) {
        var removed = entity.inventory.removeItem(Global.gameData, item.id, 1);
        for (var i = 0; i < removed.length; ++i) {
            // Dequip item when removed from inventory
            var entry = removed[i];
            var stackId = entry[0];
            var item = entry[1];
            var itemType = Config.itemRegister[item.id];
            if (item.equipped)
                Entity.onDequip(entity, stackId, itemType);
        };
        if (!isServer && global.playerEntity && entity.id == global.playerEntity.id) {
            Global.gameData.HUD.update();
            Global.gameData.HUD.checkCanAffordRecipe();
        }
    }
}

Items.Functions.RangedWeapon = function(entity, itemType) {
    if (!itemType || !entity.inventory) return;
    var stackId = entity.inventory.getEquippedStackId("tool");
    if (stackId == null) return;
    var item = entity.inventory.items[stackId];
    if (!item) return;
    if (!item.magazine || item.magazine <= 0) return;
    var numProjectiles = itemType.numProjectiles ? itemType.numProjectiles : 1;
    item.magazine -= 1;

    Global.gameData.world.events.trigger("bulletFired", entity, itemType);

    if (isServer) {
        var maxDistance = (itemType.projectileType.hitAtCursor && entity.movement.deltaWorldCursorPos) ?
            v2.length(entity.movement.deltaWorldCursorPos) : itemType.projectileType.maxDistance;
        for (var i = 0; i < numProjectiles; i++) {

            entity.drawable.positionAll(0, 0, entity.physicsBody.angle, entity.bodyparts);
            var tool = entity.bodyparts.bodyparts["tool"];
            var toolUsePos = [0, 0];
            v2.add(toolUsePos, tool.finalPos, toolUsePos);
            toolUsePos = [toolUsePos[0], -toolUsePos[1]];
            v2.mul(1 / 32, toolUsePos, toolUsePos);
            v2.add(entity.physicsBody.getPos(), toolUsePos, toolUsePos);
            // Put your offsets here:
            v2.add(toolUsePos, [0, 0], toolUsePos);

            var scatter = itemType.projectileScatter;
            var projectileAngle = tool.finalAngle;
            var projectileSpeed = itemType.projectileType.speed;
            var projectileMaxDistance = maxDistance;
            if (scatter > 0) {
                projectileAngle += Math.random() * 2 * scatter - scatter;
                projectileSpeed *= 1.0 - 2 * scatter + 4 * scatter * Math.random();
                projectileMaxDistance *= 1.0 - 0.5 * scatter + scatter * Math.random();
            }

            Global.gameData.world.commands.push(new CommandProjectileSpawn(Global.gameData.world.idList.next(), toolUsePos, projectileAngle, projectileSpeed, projectileMaxDistance, itemType.projectileType, entity.id));
        }
    }
}

Items.Functions.Reload = function(entity, itemType) {
    if (isServer) {
        if (!itemType || !entity.inventory) return;
        var stackId = entity.inventory.getEquippedStackId("tool");
        if (stackId == null) return;
        var item = entity.inventory.items[stackId];
        if (!item) return;
        if (item.magazine >= itemType.ammoCapacity)
            return;
        var currentAmmo = (item.magazine != null ? item.magazine : 0);

        var ammoAmount = (entity.ammo) ? entity.ammo[itemType.id] || 0 : itemType.ammoCapacity;
        if (ammoAmount <= 0) return;
        sendCommand(new CommandEntityReloadWeapon(entity.id, stackId));
    }
}

Items.Functions.ThrowableDynamite = function(entity, itemType) {
    if (isServer) {
        if (!itemType || !entity.inventory) return;
        var stackId = entity.inventory.getEquippedStackId("tool");
        if (stackId == null) return;
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.REMOVE_ITEM, itemType.id, 1));

        // Eject entity from playerEntity
        var physicsBody = entity.physicsBody;
        if (!physicsBody) return;
        var displacement1 = Math.random() / 5 - 0.1;
        var displacement2 = Math.random() / 5 - 0.1;
        var displacement3 = Math.random() / 5 - 0.1 + 1;
        var speed = v2.create(Math.cos(displacement1 + physicsBody.angle), -Math.sin(displacement2 + physicsBody.angle));
        var speed2 = {};
        v2.mul(10.0 * displacement3, speed, speed2);
        v2.mul(5, speed2, speed2);

        var itemEntityId = gameData.world.idList.next();
        var itemEntity = {};
        itemEntity.physicsBody = new PhysicsBody(physicsBody.getPos(), 0.01, 0, 1, 0.3);
        itemEntity.physicsBody.setVelocity([speed2[0], speed2[1]]);
        itemEntity.physicsBody.speedOld = v2.create(speed2[0], speed2[1]);
        itemEntity.physicsBody.angle = physicsBody.angle;
        itemEntity.physicsBody.angleOld = physicsBody.angle;

        var bodySprite = new Sprite(itemType.throwEntityTexture);
        bodySprite.frame = [0, 0, 32, 32];
        var bodyparts = {
            "body": new BodyPart(bodySprite, 0, 0, 0),
        };
        itemEntity.bodyparts = new Bodyparts(bodyparts);
        itemEntity.drawable = new Drawable(0);

        var timeout = 2000;

        sendCommand(new CommandEntitySpawn(gameData, itemEntity, itemEntityId));
        sendCommand(new CommandEntityAnimate(itemEntityId, "body", "dynamite", 64000.0 / timeout));

        gameData.setTimeout(function(attacker) {
            if (this.isActive && !this.isDead) {
                sendCommand(new CommandParticles(ParticleFunctions.ExplosionParticles.id, this.physicsBody.getPos(), 10.0));
                sendCommand(new CommandEntityDestroy(this.id));
                createExplosion(this.physicsBody.getPos(), 3.0, 50.0, 250.0, 1.0, attacker);
            }
        }.bind(itemEntity, entity), timeout);
    }
}

ItemTextures.ShovelAtlas = {
    path: "shovelAtlas.png",
    spriteWidth: 64,
    spriteHeight: 32,
    inventorySize: 1.3,
    inventoryAngle: -Math.PI / 4,
    inventoryOffset: [-4, 0],
    dimX: 4,
    dimY: 8,
}

ItemTextures.GunAtlas = {
    path: "gunAtlas.png",
    spriteWidth: 64,
    spriteHeight: 32,
    inventorySize: 1.3,
    inventoryAngle: -Math.PI / 4,
    inventoryOffset: [-4, 0],
    dimX: 4,
    dimY: 8,
}

ItemTextures.SwordAtlas = {
    path: "swordAtlas.png",
    spriteWidth: 64,
    spriteHeight: 32,
    inventorySize: 1.3,
    inventoryAngle: -Math.PI / 4,
    inventoryOffset: [-4, 0],
    dimX: 4,
    dimY: 8,
}

ItemTextures.ItemAtlas = {
    path: "itemAtlas.png",
    spriteWidth: 32,
    spriteHeight: 32,
    inventorySize: 1.0,
    inventoryAngle: 0,
    inventoryOffset: [0, 0],
    dimX: 16,
    dimY: 16,
}

ItemTextures.HatAtlas = {
    path: "hatAtlas.png",
    spriteWidth: 32,
    spriteHeight: 32,
    inventorySize: 1.0,
    inventoryAngle: 0,
    inventoryOffset: [0, 0],
    dimX: 16,
    dimY: 16,
}

ItemTextures.BlockAtlas = {
    path: "blockAtlas.png",
    spriteWidth: 32,
    spriteHeight: 32,
    offsetWidth: 32,
    offsetHeight: 0,
    initialOffsetWidth: 0,
    initialOffsetHeight: 0,
    inventorySize: 1.0,
    inventoryAngle: 0,
    inventoryOffset: [0, 0],
    equippedOffset: [0, 10],
    dimX: 16,
    dimY: 16,
}

Items.initItems = function() {
    delete Items.initItems;
    // Blocks
    var num = 0;
    for (var name in Blocks) {
        var block = Blocks[name];
        Items.Types[name] = {
            name: block.name,
            texture: ItemTextures.BlockAtlas,
            spriteId: num,
            isEquipable: true,
            isDropable: true,
            maxStackSize: 100,
            type: "tool",
            typeOfType: "block",
            blockId: num
        }
        ++num;
    }

    // Hats
    Items.Types.UglyHat = {
        name: "Ugly Hat",
        texture: ItemTextures.HatAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "hat",
    }
    Items.Types.BrokenHat = {
        name: "Broken Hat",
        texture: ItemTextures.HatAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "hat",
    }

    // Shovels
    Items.Types.RustyShovel = {
        name: "Rusty Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Shovel,
        useCooldown: 5,
        useDuration: 2,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 0.5,
        maxDigHardness: Tiles.Copper.hardness,
    }
    Items.Types.CopperShovel = {
        name: "Copper Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 1,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Shovel,
        useCooldown: 5,
        useDuration: 2,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 0.75,
        maxDigHardness: Tiles.Iron.hardness,
    }
    Items.Types.IronShovel = {
        name: "Iron Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Shovel,
        useCooldown: 5,
        useDuration: 2,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.0,
        maxDigHardness: Tiles.Iron.hardness,
    }
    Items.Types.SteelShovel = {
        name: "Steel Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Shovel,
        useCooldown: 5,
        useDuration: 2,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.0,
        maxDigHardness: Tiles.Apatite.hardness,
    }

    // Melee
    Items.Types.Knife = {
        name: "Knife",
        texture: ItemTextures.SwordAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Sword,
        useCooldown: 10,
        useDuration: 0,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.25,
        hitRadius: 0.75,
        damage: 40
    }
    Items.Types.AssasinKnife = {
        name: "Assassin Knife",
        texture: ItemTextures.SwordAtlas,
        spriteId: 1,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Sword,
        useCooldown: 10,
        useDuration: 0,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.25,
        hitRadius: 0.75,
        damage: 80
    }

    // Swords
    Items.Types.RustySword = {
        name: "Rusty Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Sword,
        useCooldown: 20,
        useDuration: 4,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 40
    }
    Items.Types.CopperSword = {
        name: "Copper Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 1,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Sword,
        useCooldown: 20,
        useDuration: 4,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 60
    }
    Items.Types.IronSword = {
        name: "Iron Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Sword,
        useCooldown: 20,
        useDuration: 4,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 80
    }
    Items.Types.SteelSword = {
        name: "Steel Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.Sword,
        useCooldown: 20,
        useDuration: 4,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 100
    }

    // Other items
    Items.Types.RottenRoot = {
        name: "Rotten Root",
        texture: ItemTextures.ItemAtlas,
        spriteId: 0,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 4,
        type: "resource",
    }
    Items.Types.SmallSticks = {
        name: "Small Sticks",
        texture: ItemTextures.ItemAtlas,
        spriteId: 1,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 100,
        type: "resource"
    }
    Items.Types.Torch = {
        name: "Torch",
        texture: ItemTextures.ItemAtlas,
        spriteId: 4,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 10,
        type: "resource"
    }
    Items.Types.Egg = {
        name: "Egg",
        texture: ItemTextures.ItemAtlas,
        spriteId: 3,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 100,
        type: "resource"
    }
    Items.Types.PotionHealth = {
        name: "Health Potion",
        texture: ItemTextures.ItemAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "potion",
        useCooldown: 30,
        useDuration: 20,
        itemFunction: Items.Functions.Potion,
        getPotionEffect: function() { return PotionEffectTypes.Healing; },
        potionDuration: 80
    }
    Items.Types.HealFriend = {
        name: "Heal Friend",
        texture: ItemTextures.ItemAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "potion",
        useCooldown: 30,
        useDuration: 20,
        itemFunction: Items.Functions.Potion,
        getPotionEffect: function() { return PotionEffectTypes.HealNearEntities; },
        potionDuration: 80
    }

    // Ranged weapons
    Items.Types.WeaponPistol = {
        name: "Pistol",
        texture: ItemTextures.GunAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.RangedWeapon,
        useCooldown: 10,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: Items.Functions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 20,
        ammoCapacity: 10,
        ammoItem: Items.Types.Egg,
        ammoMax: 100,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.Pistol,
        projectileScatter: 0.02
    }

    Items.Types.WeaponSmg = {
        name: "Smg",
        texture: ItemTextures.GunAtlas,
        spriteId: 1,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.RangedWeapon,
        useCooldown: 3,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: Items.Functions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 20,
        ammoCapacity: 25,
        ammoMax: 250,
        ammoInfinite: true,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.Smg,
        projectileScatter: 0.1
    }

    Items.Types.WeaponAssaultRifle = {
        name: "Assault Rifle",
        texture: ItemTextures.GunAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.RangedWeapon,
        useCooldown: 3,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: Items.Functions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 40,
        ammoCapacity: 35,
        ammoItem: Items.Types.Egg,
        ammoMax: 280,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.AssaultRifle,
        projectileScatter: 0.03
    }

    Items.Types.WeaponMachineGun = {
        name: "Machine Gun",
        texture: ItemTextures.GunAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.RangedWeapon,
        useCooldown: 2,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: Items.Functions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 160,
        ammoCapacity: 150,
        ammoItem: Items.Types.Egg,
        ammoMax: 300,
        numProjectiles: 1,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.MachineGun,
        projectileScatter: 0.06
    }
    Items.Types.WeaponShotgun = {
        name: "Shotgun",
        texture: ItemTextures.GunAtlas,
        spriteId: 4,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.RangedWeapon,
        useCooldown: 12,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: Items.Functions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 40,
        ammoCapacity: 8,
        ammoItem: Items.Types.Egg,
        ammoMax: 64,
        type: "tool",
        typeOfType: "rangedWeapon",
        numProjectiles: 8,
        projectileType: Projectiles.Shotgun,
        projectileScatter: 0.15
    }
    Items.Types.WeaponSniperRifle = {
        name: "Sniper Rifle",
        texture: ItemTextures.GunAtlas,
        spriteId: 5,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.RangedWeapon,
        useCooldown: 2,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: Items.Functions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 60,
        ammoCapacity: 1,
        ammoItem: Items.Types.Egg,
        ammoMax: 15,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.SniperRifle,
        projectileScatter: 0.0
    }
    Items.Types.WeaponGrenadeLauncher = {
        name: "Grenade Launcher",
        texture: ItemTextures.GunAtlas,
        spriteId: 6,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: Items.Functions.RangedWeapon,
        useCooldown: 20,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: Items.Functions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 80,
        ammoCapacity: 6,
        ammoItem: Items.Types.Egg,
        ammoMax: 6,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.GrenadeLauncher,
        projectileScatter: 0.05
    }

    // Throwable items
    Items.Types.Dynamite = {
        name: "Dynamite",
        texture: ItemTextures.ItemAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "explosive",
        //tool
        useCooldown: 4,
        useDuration: 3,
        itemFunction: Items.Functions.ThrowableDynamite,
        //throwable
        throwEntityTexture: "dynamite.png",

    }
}
