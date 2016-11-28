Items = {};
ItemFunctions = {};
ItemTextures = {};

ItemFunctions.Shovel = function(entity, item) {
    if (isServer) {
        var angle = entity.physicsBody.angle;
        var dir = [Math.cos(-angle), Math.sin(-angle)];
        var toolUsePos = [entity.physicsBody.getPos()[0] + 1.0 * dir[0], entity.physicsBody.getPos()[1] + 1.0 * dir[1]];

        // Break block
        var chunkPos = [];
        var localPos = [];
        v2WorldToBlockChunk(toolUsePos, chunkPos, localPos);
        var blockChunk = gameData.blockWorld.get(chunkPos[0], chunkPos[1]);
        if (blockChunk) {
            var blockId = blockChunk.getForeground(localPos[0], localPos[1]);
            if (blockId) {
                var blockType = gameData.blockRegister[blockId];
                var strength = blockChunk.getStrength(localPos[0], localPos[1]);
                // TODO: 16 magic value
                strength -= 16 * (1 / blockType.hardness);
                var x = chunkPos[0] * BLOCK_CHUNK_DIM + localPos[0];
                var y = chunkPos[1] * BLOCK_CHUNK_DIM + localPos[1];
                sendCommand(new CommandBlockStrength(x, y, Math.max(strength, 0)));
                return;
            }
        }

        // Dig terrain
        gameData.commands.push(new CommandEntityDig(entity.id, entity.physicsBody.getPos(), dir, 1.5, Entity.getDigSpeed(entity), Entity.getMaxDigHardness(entity)));
    }
}

ItemFunctions.Sword = function(entity, item) {
    if (isServer) {
        var physicsWorld = gameData.physicsWorld;
        var bodies = [];
        var entityBodyId = entity.physicsBody.bodyId;
        var entityPos = entity.physicsBody.getPos();
        var angle = entity.physicsBody.angle;
        var dir = [Math.cos(-angle), Math.sin(-angle)];
        var hitPos = [0, 0];
        v2.mul(item.hitRange, dir, hitPos);
        v2.add(entityPos, hitPos, hitPos);
        physicsWorld.getBodiesInRadius(bodies, hitPos, item.hitRadius);

        var hitEntities = [];

        bodies.forEach(function(bodyId) {
            if (bodyId == entityBodyId) return;
            var targetEntity = gameData.physicsEntities[bodyId];
            if (!targetEntity) return;

            console.log("Entity hit!");
            hitEntities.push(targetEntity.id);
            gameData.commands.push(new CommandHurtEntity(targetEntity.id, -10));
        });

        // TODO: CommandEntityHit
        //if (isServer) {
        //    gameData.commands.push(new CommandEntityHit(entity, hitEntities));
        //}
    }
}

ItemFunctions.Potion = function(entity, item) {
    var potionEffectType = item.getPotionEffect();
    if (entity.potionEffects) {
        entity.potionEffects.add(potionEffectType, item.potionDuration);
    }
    if (entity.inventory) {
        var removed = entity.inventory.removeItem(gameData, item.id, 1);
        for (var i = 0; i < removed.length; ++i) {
            // Dequip item when removed from inventory
            var entry = removed[i];
            var stackId = entry[0];
            var item = entry[1];
            var itemType = gameData.itemRegister[item.id];
            if (item.equipped)
                Entity.onDequip(entity, stackId, itemType);
        };
        if (!isServer && global.playerEntity && entity.id == global.playerEntity.id) {
            updateHUD(gameData);
            checkCanAffordRecipe();
        }
    }
}

ItemFunctions.RangedWeapon = function(entity, itemType) {
    if (!itemType || !entity.inventory) return;
    var stackId = entity.inventory.getEquippedStackId("tool");
    if (stackId == null) return;
    var item = entity.inventory.items[stackId];
    if (!item) return;
    if (!item.magazine || item.magazine <= 0) return;
    var numProjectiles = itemType.numProjectiles ? itemType.numProjectiles : 1;
    var removedAmmo = (item.magazine >= numProjectiles ? numProjectiles : item.magazine);
    item.magazine -= removedAmmo;
    numProjectiles = removedAmmo;

    if (isServer) {
        var angle = entity.physicsBody.angle;
        var rotateAround = function(ax, ay, x, y, angle) {
            var cos = Math.cos(angle),
                sin = Math.sin(angle),
                nx = (cos * (x - ax)) + (sin * (y - ay)) + ax,
                ny = (cos * (y - ay)) - (sin * (x - ax)) + ay;
            return [nx, ny];
        }
        var dir = rotateAround(0, 0, 0, -0.6, angle);
        var maxDistance = (itemType.projectileType.hitAtCursor && entity.movement.deltaWorldCursorPos) ?
            v2.length(entity.movement.deltaWorldCursorPos) : itemType.projectileType.maxDistance;
        for (var i = 0; i < numProjectiles; i++) {
            var scatter = itemType.projectileScatter;
            var projectileAngle = angle;
            var projectileSpeed = itemType.projectileType.speed;
            var projectileMaxDistance = maxDistance;
            if (scatter > 0) {
                projectileAngle += Math.random() * 2 * scatter - scatter;
                projectileSpeed *= 1.0 - 2 * scatter + 4 * scatter * Math.random();
                projectileMaxDistance *= 1.0 - 0.5 * scatter + scatter * Math.random();
            }
            var toolUsePos = [entity.physicsBody.getPos()[0] + 0.5 * dir[0], entity.physicsBody.getPos()[1] + 0.5 * dir[1]];
            gameData.commands.push(new CommandProjectileSpawn(idList.next(), v2.clone(toolUsePos), projectileAngle, projectileSpeed, projectileMaxDistance, itemType.projectileType, entity.id));
        }
    }
}

ItemFunctions.Reload = function(entity, itemType) {
    if (isServer) {
        if (!itemType || !entity.inventory) return;
        var stackId = entity.inventory.getEquippedStackId("tool");
        if (stackId == null) return;
        var item = entity.inventory.items[stackId];
        if (!item) return;
        if (item.magazine >= itemType.ammoCapacity)
            return;
        var currentAmmo = (item.magazine != null ? item.magazine : 0);

        var ammoAmount = entity.inventory.getAmountById(itemType.ammoItem.id);
        if (ammoAmount <= 0) return;
        var amountToRemove = Math.min((itemType.ammoCapacity - currentAmmo), ammoAmount);
        if (amountToRemove <= 0) return;
        sendCommand(new CommandEntityReloadWeapon(entity.id, stackId, currentAmmo + amountToRemove));
        sendCommand(new CommandEntityInventory(entity.id, InventoryActions.REMOVE_ITEM, itemType.ammoItem.id, amountToRemove));
    }
}

ItemTextures.ShovelAtlas = {
    path: "shovelAtlas.png",
    spriteWidth: 64,
    spriteHeight: 32,
    inventorySize: 1.5,
    inventoryAngle: -Math.PI / 4,
    inventoryOffset: [-8, 0],
    dimX: 4,
    dimY: 8,
}

ItemTextures.SwordAtlas = {
    path: "swordAtlas.png",
    spriteWidth: 64,
    spriteHeight: 32,
    inventorySize: 1.5,
    inventoryAngle: -Math.PI / 4,
    inventoryOffset: [-8, 0],
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

initItems = function() {
    // Blocks
    var num = 0;
    for (var name in Blocks) {
        var block = Blocks[name];
        Items[name] = {
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
    Items.UglyHat = {
        name: "Ugly Hat",
        texture: ItemTextures.HatAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "hat",
    }
    Items.BrokenHat = {
        name: "Broken Hat",
        texture: ItemTextures.HatAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "hat",
    }

    // Shovels
    Items.RustyShovel = {
        name: "Rusty Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Shovel,
        useCooldown: 0.25,
        useDuration: 0.125,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.0,
        maxDigHardness: Tiles.Copper.hardness,
    }
    Items.CopperShovel = {
        name: "Copper Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 1,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Shovel,
        useCooldown: 0.25,
        useDuration: 0.125,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.2,
        maxDigHardness: Tiles.Iron.hardness,
    }
    Items.IronShovel = {
        name: "Iron Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Shovel,
        useCooldown: 0.25,
        useDuration: 0.125,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.6,
        maxDigHardness: Tiles.Iron.hardness,
    }
    Items.SteelShovel = {
        name: "Steel Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Shovel,
        useCooldown: 0.25,
        useDuration: 0.125,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.8,
        maxDigHardness: Tiles.Apatite.hardness,
    }

    // Swords
    Items.RustySword = {
        name: "Rusty Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Sword,
        useCooldown: 1.0,
        useDuration: 0.1,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 40
    }
    Items.CopperSword = {
        name: "Copper Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 1,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Sword,
        useCooldown: 1.0,
        useDuration: 0.2,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 60
    }
    Items.IronSword = {
        name: "Iron Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Sword,
        useCooldown: 1.0,
        useDuration: 0.2,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 80
    }
    Items.SteelSword = {
        name: "Steel Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.Sword,
        useCooldown: 1.0,
        useDuration: 0.2,
        type: "tool",
        typeOfType: "sword",
        hitRange: 0.5,
        hitRadius: 1.5,
        damage: 100
    }

    // Other items
    Items.RottenRoot = {
        name: "Rotten Root",
        texture: ItemTextures.ItemAtlas,
        spriteId: 0,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 4,
        type: "resource",
    }
    Items.SmallSticks = {
        name: "Small Sticks",
        texture: ItemTextures.ItemAtlas,
        spriteId: 1,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 100,
        type: "resource"
    }
    Items.Dynamite = {
        name: "Dynamite",
        texture: ItemTextures.ItemAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "explosive"
    }
    Items.Torch = {
        name: "Torch",
        texture: ItemTextures.ItemAtlas,
        spriteId: 4,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 10,
        type: "resource"
    }
    Items.Egg = {
        name: "Egg",
        texture: ItemTextures.ItemAtlas,
        spriteId: 3,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 100,
        type: "resource"
    }
    Items.PotionHealth = {
        name: "Health Potion",
        texture: ItemTextures.ItemAtlas,
        spriteId: 3, 
        isEquipable: true,
        isDropable: true,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "potion",
        useCooldown: 1.5,
        useDuration: 1.0,
        itemFunction: ItemFunctions.Potion,
        getPotionEffect: function() { return PotionEffectTypes.Healing; },
        potionDuration: 80
    }
    Items.HealFriend = {
        name: "Heal Friend",
        texture: ItemTextures.ItemAtlas,
        spriteId: 3, 
        isEquipable: true,
        isDropable: true,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "potion",
        useCooldown: 1.5,
        useDuration: 1.0,
        itemFunction: ItemFunctions.Potion,
        getPotionEffect: function() { return PotionEffectTypes.HealNearEntities; },
        potionDuration: 80
    }

    // Ranged weapons
    Items.WeaponPistol = {
        name: "Pistol",
        texture: ItemTextures.ItemAtlas,
        spriteId: 4,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.RangedWeapon,
        useCooldown: 0.5,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: ItemFunctions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 1.0,
        ammoCapacity: 10,
        ammoItem: Items.Egg,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.Pistol,
        projectileScatter: 0.02
    }

    Items.WeaponSmg = {
        name: "Smg",
        texture: ItemTextures.ItemAtlas,
        spriteId: 4,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.RangedWeapon,
        useCooldown: 0.12,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: ItemFunctions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 1.0,
        ammoCapacity: 25,
        ammoItem: Items.Egg,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.Smg,
        projectileScatter: 0.08
    }

    Items.WeaponAssaultRifle = {
        name: "Assault Rifle",
        texture: ItemTextures.ItemAtlas,
        spriteId: 4,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.RangedWeapon,
        useCooldown: 0.08,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: ItemFunctions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 2.0,
        ammoCapacity: 35,
        ammoItem: Items.Egg,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.AssaultRifle,
        projectileScatter: 0.03
    }

    Items.WeaponMachineGun = {
        name: "Machine Gun",
        texture: ItemTextures.ItemAtlas,
        spriteId: 4,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.RangedWeapon,
        useCooldown: 0.04,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: ItemFunctions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 8.0,
        ammoCapacity: 150,
        ammoItem: Items.Egg,
        numProjectiles: 1,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.MachineGun,
        projectileScatter: 0.06
    }
    Items.WeaponShotgun = {
        name: "Shotgun",
        texture: ItemTextures.ItemAtlas,
        spriteId: 7,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.RangedWeapon,
        useCooldown: 0.6,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: ItemFunctions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 2.0,
        ammoCapacity: 64,
        ammoItem: Items.Egg,
        type: "tool",
        typeOfType: "rangedWeapon",
        numProjectiles: 8,
        projectileType: Projectiles.Shotgun,
        projectileScatter: 0.15
    }
    Items.WeaponSniperRifle = {
        name: "Sniper Rifle",
        texture: ItemTextures.ItemAtlas,
        spriteId: 6,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.RangedWeapon,
        useCooldown: 0.1,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: ItemFunctions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 3.0,
        ammoCapacity: 1,
        ammoItem: Items.Egg,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.SniperRifle,
        projectileScatter: 0.0
    }
    Items.WeaponGrenadeLauncher = {
        name: "Grenade Launcher",
        texture: ItemTextures.ItemAtlas,
        spriteId: 5,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        itemFunction: ItemFunctions.RangedWeapon,
        useCooldown: 1.0,
        useDuration: 0,
        useCycle: "rightArmGun",
        canReload: true,
        reloadFunction: ItemFunctions.Reload,
        reloadCycleRightArm: "rightArmGunReload",
        reloadCycleLeftArm: "leftArmGunReload",
        reloadCycleGun: "gunReload",
        reloadCooldown: 4.0,
        ammoCapacity: 6,
        ammoItem: Items.Egg,
        type: "tool",
        typeOfType: "rangedWeapon",
        projectileType: Projectiles.GrenadeLauncher,
        projectileScatter: 0.05
    }
}
