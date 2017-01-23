
initConfig = function() {
    Config = {
        port: 3000,
        itemPickupDistance: 2.0,
        blockPlaceDistance: 96, //Pixels
        tickDuration: 1000 / 20,
        fakeLag: 0,
        fakeJitter: 0,
        respawnTime: 1,
    }

    Config.tileRegister = objectRegisterAddByObject([], Tiles);
    Config.itemRegister = objectRegisterAddByObject([], Items);
    Config.blockRegister = objectRegisterAddByObject([], Blocks);
    Config.projectileRegister = objectRegisterAddByObject([], Projectiles);
    Config.particleRegister = objectRegisterAddByObject([], Particles);
    Config.potionEffectTypeRegister = objectRegisterAddByObject([], PotionEffectTypes);
    Config.commandTypes = typeRegisterAddByArray([], [CommandEntityMove, CommandDig, CommandEntityDig, CommandEntityEquipItem, CommandEntityBuild, CommandEntityHealthChange,
        CommandEntitySpawn, CommandCollisions, CommandEntityDestroy, CommandPlayerJoin, CommandPlayerLeave, CommandPlayerSpawn, CommandKeyStatusUpdate,
        CommandEntityInventory, CommandPlayerOreInventory, CommandEntityRotate, CommandBlockStrength, CommandProjectileSpawn, CommandParticles, CommandPlaceBlock,
        CommandEntityReloadWeapon, CommandEntityBeginReloadWeapon, CommandBuild, CommandEntityLookAtEntity, CommandPopupMessage, CommandEntityOpenChest]);
    Config.messagesToClient = [MessageInit, MessageCommands, MessageChunk, MessageChangeGameMode, MessageSpectate, MessageAmmoChange];
    Config.messagesToServer = [MessageRequestKeyStatusUpdate, MessageRequestItemPickup, MessageRequestClickSlot, MessageRequestCraft, MessageRequestPlaceBlock,
        MessageRequestClickEntity, MessageRequestRotate, MessageRequestClickBlock, MessageRequestSpawn];
    Config.messageTypes = typeRegisterAddByArray([], Config.messagesToClient.concat(Config.messagesToServer));
    Config.componentTypes = typeRegisterAddByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ItemComponent, Health, ControlledByPlayer, NameComponent,
        EquippedItems, Projectile, BlockPlacer, PotionEffects, Team, Inventory, Ammo, Chest]);
    Config.gameModeRegister = typeRegisterAddByArray([], [/*GameModeBaseWar, */GameModeZombieInvasion]);
}
