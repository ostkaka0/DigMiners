var ObjectRegister = require("engine/ObjectRegister.js")
var TypeRegister = require("engine/TypeRegister.js")

var Tiles = require("game/Tiles.js")
var Blocks = require("game/Blocks.js")
var Items = require("game/Items.js")
var Projectiles = require("game/Projectiles.js")
var Particles = require("game/Particles.js")
var ParticleFunctions = require("game/ParticleFunctions.js")
var PotionEffectTypes = require("game/PotionEffectTypes.js")

var Command = require("game/Command/Command.js")
var CommandEntitySpawn = require("game/Command/CommandEntitySpawn.js")
var CommandEntityInventory = require("game/Command/CommandEntityInventory.js")
var CommandEntityEquipItem = require("game/Command/CommandEntityEquipItem.js")
var CommandCollisions = require("game/Command/CommandCollisions.js")
var CommandEntityInteractEntity = require("game/Command/CommandEntityInteractEntity.js")
var CommandPlayerJoin = require("game/Command/CommandPlayerJoin.js")
var CommandPlayerLeave = require("game/Command/CommandPlayerLeave.js")

var MessageInit = require("game/Message/ToClient/MessageInit.js")
var MessageCommands = require("game/Message/ToClient/MessageCommands.js")
var MessageChunk = require("game/Message/ToClient/MessageChunk.js")
var MessageChangeGameMode = require("game/Message/ToClient/MessageChangeGamemode.js")
var MessageSpectate = require("game/Message/ToClient/MessageSpectate.js")
var MessageAmmoChange = require("game/Message/ToClient/MessageAmmoChange.js")

var MessageRequestKeyStatusUpdate = require("game/Message/ToServer/MessageRequestKeyStatusUpdate.js")
var MessageRequestItemPickup = require("game/Message/ToServer/MessageRequestItemPickup.js")
var MessageRequestClickSlot = require("game/Message/ToServer/MessageRequestClickSlot.js")
var MessageRequestCraft = require("game/Message/ToServer/MessageRequestCraft.js")
var MessageRequestPlaceBlock = require("game/Message/ToServer/MessageRequestPlaceBlock.js")
var MessageRequestClickEntity = require("game/Message/ToServer/MessageRequestClickEntity.js")
var MessageRequestRotate = require("game/Message/ToServer/MessageRequestRotate.js")
var MessageRequestClickBlock = require("game/Message/ToServer/MessageRequestClickBlock.js")
var MessageRequestSpawn = require("game/Message/ToServer/MessageRequestSpawn.js")

var PhysicsBody = require("game/Entity/PhysicsBody.js")
var Movement = require("game/Entity/Movement.js")
var Drawable = require("game/Entity/Drawable.js")
var Bodyparts = require("game/Entity/Bodyparts.js")
var ItemComponent = require("game/Entity/ItemComponent.js")
var Health = require("game/Entity/Health.js")
var ControlledByPlayer = require("game/Entity/ControlledByPlayer.js")
var NameComponent = require("game/Entity/NameComponent.js")
var EquippedItems = require("game/Entity/EquippedItems.js")
var Projectile = require("game/Entity/Projectile.js")
var BlockPlacer = require("game/Entity/BlockPlacer.js")
var PotionEffects = require("game/Entity/PotionEffects.js")
var Team = require("game/Entity/Team.js")
var Inventory = require("game/Entity/Inventory.js")
var Ammo = require("game/Entity/Ammo.js")
var Chest = require("game/Entity/Chest.js")
var Interactable = require("game/Entity/Interactable.js")
var Interacter = require("game/Entity/Interacter.js")

var GameModeZombieInvasion = require("game/GameMode/GameModeZombieInvasion.js")

var messagesToClient = [MessageInit, MessageCommands, MessageChunk, MessageChangeGameMode, MessageSpectate, MessageAmmoChange];
var messagesToServer = [MessageRequestKeyStatusUpdate, MessageRequestItemPickup, MessageRequestClickSlot, MessageRequestCraft, MessageRequestPlaceBlock,
    MessageRequestClickEntity, MessageRequestRotate, MessageRequestClickBlock, MessageRequestSpawn];

var Config = exports;
//module.exports = Config

Config.init = function() {
    TypeRegister.sort(Command.Register);
    console.log(Command.Register);
    Object.assign(Config, {
        port: 3000,
        itemPickupDistance: 2.0,
        blockPlaceDistance: 96, //Pixels
        tickDuration: 1000 / 20,
        fakeLag: 0,
        fakeJitter: 0,
        respawnTime: 1,

        tileRegister: ObjectRegister.addByObject([], Tiles),
        itemRegister: ObjectRegister.addByObject([], Items.Types),
        blockRegister: ObjectRegister.addByObject([], Blocks),
        projectileRegister: ObjectRegister.addByObject([], Projectiles),
        particleRegister: ObjectRegister.addByObject([], Particles),
        particleFunctionRegister: ObjectRegister.addByObject([], ParticleFunctions),
        potionEffectTypeRegister: ObjectRegister.addByObject([], PotionEffectTypes),
        commandTypes: Command.Register,
        messagesToClient,
        messagesToServer,
        messageTypes: TypeRegister.addByArray([], messagesToClient.concat(messagesToServer)),
        componentTypes: TypeRegister.addByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ItemComponent, Health, ControlledByPlayer, NameComponent,
            EquippedItems, Projectile, BlockPlacer, PotionEffects, Team, Inventory, Ammo, Chest, Interactable, Interacter]),
        gameModeRegister: TypeRegister.addByArray([], [/*GameModeBaseWar, */GameModeZombieInvasion]),
    });
}
