Items = {};

ItemTextures = {};

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

initItems = function(gameData) {
    // Blocks
    var num = 0;
    for(var name in Blocks) {
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
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.8,
        maxDigHardness: Tiles.Apatite.hardness,
    }
    Items.LapisLazuliShovel = {
        name: "Lapis Lazuli Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 5,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.2,
        maxDigHardness: 64,
    }
    Items.MagnetiteShovel = {
        name: "Magnetite Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 7,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.4,
        maxDigHardness: 64,
    }
    Items.QuartzShovel = {
        name: "Quartz Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 9,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.8,
        maxDigHardness: 64,
    }
    Items.EmeraldShovel = {
        name: "Emerald Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 10,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 3.0,
        maxDigHardness: 64,
    }
    Items.RubyShovel = {
        name: "Ruby Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 12,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 3.6,
        maxDigHardness: 64,
    }
    Items.DiamondShovel = {
        name: "Diamond Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 13,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 4.0,
    }
    
    // Swords
    Items.RustySword = {
        name: "Rusty Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 0,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "sword",
        damage: 20
    }
    Items.CopperSword = {
        name: "Copper Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 1,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "sword",
        damage: 30
    }
    Items.IronSword = {
        name: "Iron Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 2,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "sword",
        damage: 40
    }
    Items.SteelSword = {
        name: "Steel Sword",
        texture: ItemTextures.SwordAtlas,
        spriteId: 3,
        isEquipable: true,
        isDropable: true,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "sword",
        damage: 50
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
        typeOfType: "explosive",
        digSpeed: 0.0,
        maxDigHardness: 0.0,
    }
    Items.Torch = {
        name: "Torch",
        texture: ItemTextures.ItemAtlas,
        spriteId: 3,
        isEquipable: false,
        isDropable: true,
        maxStackSize: 10,
        type: "resource"
    }
}
