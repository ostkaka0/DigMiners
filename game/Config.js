
export default {
    port: 3000,
    itemPickupDistance: 2.0,
    blockPlaceDistance: 96, //Pixels
    tickDuration: 1000 / 20,
    fakeLag: 0,
    fakeJitter: 0,
    respawnTime: 1,

    tileRegister: objectRegisterAddByObject([], Tiles),
    itemRegister: objectRegisterAddByObject([], Items),
    blockRegister: objectRegisterAddByObject([], Blocks),
    projectileRegister: objectRegisterAddByObject([], Projectiles),
    particleRegister: objectRegisterAddByObject([], Particles),
    particleFunctionRegister: objectRegisterAddByObject([], ParticleFunctions),
    potionEffectTypeRegister: objectRegisterAddByObject([], PotionEffectTypes),
    commandTypes: typeRegisterAddByArray([], [CommandEntityMove, CommandDig, CommandEntityDig, CommandEntityEquipItem, CommandEntityBuild, CommandEntityHealthChange,
        CommandEntitySpawn, CommandCollisions, CommandEntityDestroy, CommandPlayerJoin, CommandPlayerLeave, CommandPlayerSpawn, CommandKeyStatusUpdate,
        CommandEntityInventory, CommandPlayerOreInventory, CommandEntityRotate, CommandBlockStrength, CommandProjectileSpawn, CommandParticles, CommandPlaceBlock,
        CommandEntityReloadWeapon, CommandEntityBeginReloadWeapon, CommandBuild, CommandEntityLookAtEntity, CommandPopupMessage, CommandEntityInteractEntity]),
    messagesToClient: [MessageInit, MessageCommands, MessageChunk, MessageChangeGameMode, MessageSpectate, MessageAmmoChange],
    messagesToServer: [MessageRequestKeyStatusUpdate, MessageRequestItemPickup, MessageRequestClickSlot, MessageRequestCraft, MessageRequestPlaceBlock,
        MessageRequestClickEntity, MessageRequestRotate, MessageRequestClickBlock, MessageRequestSpawn],
    messageTypes: typeRegisterAddByArray([], messagesToClient.concat(messagesToServer)),
    componentTypes: typeRegisterAddByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ItemComponent, Health, ControlledByPlayer, NameComponent,
        EquippedItems, Projectile, BlockPlacer, PotionEffects, Team, Inventory, Ammo, Chest, Interactable, Interacter]),
    gameModeRegister: typeRegisterAddByArray([], [/*GameModeBaseWar, */GameModeZombieInvasion]),

}
