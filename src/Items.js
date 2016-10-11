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

initItems = function() {
    // Hats
    Items.UglyHat = {
        name: "Ugly Hat",
        texture: {
            path: "hats/uglyHat.png",
            spriteWidth: 32,
            spriteHeight: 32,
        },
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "hat",
    }
    Items.BrokenHat = {
        name: "Broken Hat",
        texture: {
            path: "hats/brokenHat.png",
            spriteWidth: 32,
            spriteHeight: 32,
        },
        isEquipable: true,
        isDropable: true,
        isDigable: false,
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
        isDigable: false,
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
        isDigable: false,
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
        isDigable: false,
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
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.8,
        maxDigHardness: Tiles.Apatite.hardness,
    }
    Items.ApatiteShovel = {
        name: "Apatite Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 4,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.0,
        maxDigHardness: 64,
    }
    Items.LapisLazuliShovel = {
        name: "Lapis Lazuli Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 5,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.2,
        maxDigHardness: 64,
    }
    Items.TurquoiseShovel = {
        name: "Turquoise Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 6,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.3,
        maxDigHardness: 64,
    }
    Items.MagnetiteShovel = {
        name: "Magnetite Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 7,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.4,
        maxDigHardness: 64,
    }
    Items.OlivineShovel = {
        name: "Olivine Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 8,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.6,
        maxDigHardness: 64,
    }
    Items.QuartzShovel = {
        name: "Quartz Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 9,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
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
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 3.0,
        maxDigHardness: 64,
    }
    Items.TopazShovel = {
        name: "Topaz Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 11,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 3.2,
        maxDigHardness: 64,
    }
    Items.RubyShovel = {
        name: "Ruby Shovel",
        texture: ItemTextures.ShovelAtlas,
        spriteId: 12,
        isEquipable: true,
        isDropable: true,
        isDigable: false,
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
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 4.0,
    }

    // Other items
    Items.Dynamite = {
        name: "Dynamite",
        texture: {
            path: "items/Dynamite.png",
            spriteWidth: 32,
            spriteHeight: 32,
        },
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "explosive",
        digSpeed: 0.0,
        maxDigHardness: 0.0,
    }
    Items.RottenRoot = {
        name: "Rotten Root",
        texture: {
            path: "items/RottenRoot.png",
            spriteWidth: 32,
            spriteHeight: 32,
        },
        isEquipable: false,
        isDropable: true,
        isDigable: false,
        maxStackSize: 4,
        type: "resource",
    }
    Items.SmallSticks = {
        name: "Small Sticks",
        texture: {
            path: "hats/uglyHat.png",
            spriteWidth: 32,
            spriteHeight: 32,
        },
        isEquipable: false,
        isDropable: true,
        isDigable: false,
        maxStackSize: 100,
        type: "resource",
        textureWidth: 32,
        textureHeight: 32,
        textureId: 0,
    }
    Items.Torch = {
        name: "Torch",
        texture: "SmallSticks",
        texturePath: "items/",
        isEquipable: false,
        isDropable: true,
        isDigable: false,
        maxStackSize: 10,
        type: "resource",
        textureWidth: 32,
        textureHeight: 32,
        textureId: 0,
    }
}
