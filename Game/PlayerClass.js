
var PlayerClass = {
    Assault: {
        name: "Assault",
        blocks: [Items.Types.StoneWall, Items.Types.WoodCrate, Items.Types.BunkerWindow, Items.Types.Toxin],
        weapons: [Items.Types.WeaponAssaultRifle, Items.Types.WeaponPistol, Items.Types.Knife, Items.Types.CopperShovel],
        speed: 1.0,
        health: 120.0,
        armor: 0.3,
    },
    Heavy: {
        name: "Heavy",
        blocks: [Items.Types.StoneWall, Items.Types.WoodCrate, Items.Types.BlueForcefield],
        weapons: [Items.Types.WeaponMachineGun, Items.Types.WeaponPistol, Items.Types.Knife, Items.Types.CopperShovel],
        speed: 0.5,
        health: 150.0,
        armor: 0.5,
    },
    Sniper: {
        name: "Sniper",
        blocks: [Items.Types.StoneWall, Items.Types.BunkerWindow, Items.Types.BlueForcefield],
        weapons: [Items.Types.WeaponSniperRifle, Items.Types.WeaponPistol, Items.Types.Knife, Items.Types.RustyShovel],
        speed: 1.2,
        health: 100.0,
        armor: 0.0,
    },
    Medic: {
        name: "Medic",
        blocks: [Items.Types.StoneWall, Items.Types.BlueForcefield, Items.Types.HealthBox, Items.Types.AmmoBox],
        weapons: [Items.Types.WeaponShotgun, Items.Types.WeaponSmg, Items.Types.IronShovel],
        speed: 1.0,
        health: 100.0,
        armor: 0.2,
    },
    /*Assassin: {
        name: "Assassin",
        blocks: [Items.Types.StoneWall, Items.Types.WoodCrate, Items.Types.BlueForcefield],
        weapons: [Items.Types.WeaponSmg, Items.Types.AssasinKnife, Items.Types.RustyShovel],
        speed: 1.5,
        health: 80.0,
        armor: 0.0,
    },*/
    Miner: {
        name: "Miner",
        blocks: [Items.Types.StoneWall, Items.Types.WoodCrate, Items.Types.BlueForcefield, Items.Types.MachineGunTurret],
        weapons: [Items.Types.WeaponShotgun, Items.Types.WeaponSmg, Items.Types.SteelShovel],
        items: [[Items.Types.Dynamite, 8]],
        speed: 1.0,
        health: 120.0,
        armor: 0.2,
    },
    Destroyer: {
        name: "Destroyer",
        blocks: [Items.Types.StoneWall, Items.Types.WoodCrate, Items.Types.BunkerWindow, Items.Types.SmgTurret],
        weapons: [Items.Types.WeaponSmg, Items.Types.WeaponGrenadeLauncher, Items.Types.IronShovel],
        speed: 1.0,
        health: 120.0,
        armor: 0.2,
    }
};

PlayerClassRegister = ObjectRegister.addByObject([], PlayerClass);
