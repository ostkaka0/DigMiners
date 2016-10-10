Items = {};

initItems = function() { 
    // Hats
    Items.UglyHat = {
        name: "Ugly Hat",
        texture: "uglyHat",
        texturePath: "hats/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "hat"
    }
    Items.BrokenHat = {
        name: "Broken Hat",
        texture: "brokenHat",
        texturePath: "hats/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "hat"
    }

    // Shovels
    Items.RustyShovel = {
        name: "Rusty Shovel",
        texture: "RustyShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.0,
        maxDigHardness: Tiles.Copper.hardness
    }
    Items.CopperShovel = {
        name: "Copper Shovel",
        texture: "CopperShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.2,
        maxDigHardness: Tiles.Iron.hardness
    }
    Items.IronShovel = {
        name: "Iron Shovel",
        texture: "IronShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.6,
        maxDigHardness: Tiles.Iron.hardness
    }
    Items.SteelShovel = {
        name: "Steel Shovel",
        texture: "SteelShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 1.8,
        maxDigHardness: Tiles.Apatite.hardness
    }
    Items.ApatiteShovel = {
        name: "Apatite Shovel",
        texture: "ApatiteShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.0,
        maxDigHardness: 64
    }
    Items.LapisLazuliShovel = {
        name: "Lapis Lazuli Shovel",
        texture: "LapisLazuliShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.2,
        maxDigHardness: 64
    }
    Items.TurquoiseShovel = {
        name: "Turquoise Shovel",
        texture: "TurquoiseShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.3,
        maxDigHardness: 64
    }
    Items.MagnetiteShovel = {
        name: "Magnetite Shovel",
        texture: "MagnetiteShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.4,
        maxDigHardness: 64
    }
    Items.OlivineShovel = {
        name: "Olivine Shovel",
        texture: "OlivineShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.6,
        maxDigHardness: 64
    }
    Items.QuartzShovel = {
        name: "Quartz Shovel",
        texture: "QuartzShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 2.8,
        maxDigHardness: 64
    }
    Items.EmeraldShovel = {
        name: "Emerald Shovel",
        texture: "EmeraldShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 3.0,
        maxDigHardness: 64
    }
    Items.TopazShovel = {
        name: "Topaz Shovel",
        texture: "TopazShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 3.2,
        maxDigHardness: 64
    }
    Items.RubyShovel = {
        name: "Ruby Shovel",
        texture: "RubyShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 3.6,
        maxDigHardness: 64
    }
    Items.DiamondShovel = {
        name: "Diamond Shovel",
        texture: "DiamondShovel",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 1,
        type: "tool",
        typeOfType: "shovel",
        digSpeed: 4.0,
        maxDigHardness: 64
    }

    // Other items
    Items.Dynamite = {
        name: "Dynamite",
        texture: "Dynamite",
        texturePath: "items/",
        isEquipable: true,
        isDropable: true,
        isDigable: false,
        maxStackSize: 8,
        type: "tool",
        typeOfType: "explosive",
        digSpeed: 0.0,
        maxDigHardness: 0.0
    }
    Items.RottenRoot = {
        name: "Rotten Root",
        texture: "RottenRoot",
        texturePath: "items/",
        isEquipable: false,
        isDropable: true,
        isDigable: false,
        maxStackSize: 4,
        type: "resource"
    }
    Items.SmallSticks = {
        name: "Small Sticks",
        texture: "SmallSticks",
        texturePath: "items/",
        isEquipable: false,
        isDropable: true,
        isDigable: false,
        maxStackSize: 100,
        type: "resource"
    }
}
