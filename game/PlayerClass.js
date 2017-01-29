initPlayerClasses = function() {
    PlayerClasses = {
        Assault: {
            name: "Assault",
            blocks: [Items.StoneWall, Items.WoodCrate, Items.BlueForcefield],
            weapons: [Items.WeaponAssaultRifle, Items.WeaponPistol, Items.Knife, Items.CopperShovel],
            speed: 1.0,
            health: 120.0,
            armor: 0.3,
        },
        Heavy: {
            name: "Heavy",
            blocks: [Items.StoneWall, Items.WoodCrate, Items.BlueForcefield],
            weapons: [Items.WeaponMachineGun, Items.WeaponPistol, Items.Knife, Items.CopperShovel],
            speed: 0.5,
            health: 150.0,
            armor: 0.5,
        },
        Sniper: {
            name: "Sniper",
            blocks: [Items.StoneWall, Items.BunkerWindow, Items.BlueForcefield],
            weapons: [Items.WeaponSniperRifle, Items.WeaponPistol, Items.Knife, Items.RustyShovel],
            speed: 1.2,
            health: 100.0,
            armor: 0.0,
        },
        Medic: {
            name: "Medic",
            blocks: [Items.StoneWall, Items.BlueForcefield, Items.HealthBox, Items.AmmoBox],
            weapons: [Items.WeaponShotgun, Items.WeaponSmg, Items.IronShovel],
            speed: 1.0,
            health: 100.0,
            armor: 0.2,
        },
        Assassin: {
            name: "Assassin",
            blocks: [Items.StoneWall, Items.WoodCrate, Items.BlueForcefield],
            weapons: [Items.WeaponSmg, Items.AssasinKnife, Items.RustyShovel],
            speed: 1.5,
            health: 80.0,
            armor: 0.0,
        },
        Miner: {
            name: "Miner",
            blocks: [Items.StoneWall, Items.WoodCrate, Items.BlueForcefield, Items.PistolTurret, Items.MachineGunTurret],
            weapons: [Items.WeaponShotgun, Items.WeaponSmg, Items.SteelShovel],
            items: [[Items.Dynamite, 8]],
            speed: 1.0,
            health: 120.0,
            armor: 0.2,
        }
    }

    PlayerClassRegister = objectRegisterAddByObject([], PlayerClasses);
}
