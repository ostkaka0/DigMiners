initPlayerClasses = function() {
    PlayerClasses = {
        Assault: {
            name: "Assault",
            blocks: [Items.StoneWall, Items.WoodCrate, Items.BlueForcefield],
            weapons: [Items.WeaponAssaultRifle, Items.WeaponPistol],
            speed: 1.0,
            health: 120.0,
        },
        Heavy: {
            name: "Heavy",
            blocks: [Items.StoneWall, Items.WoodCrate, Items.BlueForcefield],
            weapons: [Items.WeaponMachineGun, Items.WeaponPistol],
            speed: 0.7,
            health: 150.0,
        },
        Sniper: {
            name: "Sniper",
            blocks: [Items.StoneWall, Items.BunkerWindow, Items.BlueForcefield],
            weapons: [Items.WeaponSniperRifle, Items.WeaponPistol],
            speed: 1.2,
            health: 100.0,
        },
        Medic: {
            name: "Medic",
            blocks: [Items.StoneWall, Items.BunkerWindow, Items.HealthBox],
            weapons: [Items.WeaponShotgun, Items.WeaponSmg],
            speed: 1.0,
            health: 100.0,
        },
    }

    PlayerClassRegister = objectRegisterAddByObject([], PlayerClasses);
}
