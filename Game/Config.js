var ObjectRegister = require("Engine/ObjectRegister.js")
var TypeRegister = require("Engine/TypeRegister.js")

var Tiles = require("Game/Tiles.js")
var Blocks = require("Game/Blocks.js")
var Items = require("Game/Items.js")
var Projectiles = require("Game/Projectiles.js")
var Particles = require("Game/Particles.js")
var ParticleFunctions = require("Game/ParticleFunctions.js")
var PotionEffectTypes = require("Game/PotionEffectTypes.js")

var Command = require("Game/Command/Command.js")
var CommandEntitySpawn = require("Game/Command/CommandEntitySpawn.js")
var CommandEntityInventory = require("Game/Command/CommandEntityInventory.js")
var CommandEntityEquipItem = require("Game/Command/CommandEntityEquipItem.js")
var CommandCollisions = require("Game/Command/CommandCollisions.js")
var CommandEntityInteractEntity = require("Game/Command/CommandEntityInteractEntity.js")
var CommandPlayerJoin = require("Game/Command/CommandPlayerJoin.js")
var CommandPlayerLeave = require("Game/Command/CommandPlayerLeave.js")

var Message = require("Game/Message/Message.js")
var MessageCommands = require("Game/Message/ToClient/MessageCommands.js")
var MessageRequestKeyStatusUpdate = require("Game/Message/ToServer/MessageRequestKeyStatusUpdate.js")
var MessageRequestPlaceBlock = require("Game/Message/ToServer/MessageRequestPlaceBlock.js")
var MessageRequestClickBlock = require("Game/Message/ToServer/MessageRequestClickBlock.js")
var MessageRequestRotate = require("Game/Message/ToServer/MessageRequestRotate.js")
var MessageRequestItemPickup = require("Game/Message/ToServer/MessageRequestItemPickup.js")
var MessageRequestSpawn = require("Game/Message/ToServer/MessageRequestSpawn.js")

var PhysicsBody = require("Game/Entity/PhysicsBody.js")
var Movement = require("Game/Entity/Movement.js")
var Drawable = require("Game/Entity/Drawable.js")
var Bodyparts = require("Game/Entity/Bodyparts.js")
var ItemComponent = require("Game/Entity/ItemComponent.js")
var Health = require("Game/Entity/Health.js")
var ControlledByPlayer = require("Game/Entity/ControlledByPlayer.js")
var NameComponent = require("Game/Entity/NameComponent.js")
var EquippedItems = require("Game/Entity/EquippedItems.js")
var Projectile = require("Game/Entity/Projectile.js")
var BlockPlacer = require("Game/Entity/BlockPlacer.js")
var PotionEffects = require("Game/Entity/PotionEffects.js")
var Team = require("Game/Entity/Team.js")
var Inventory = require("Game/Entity/Inventory.js")
var Ammo = require("Game/Entity/Ammo.js")
var Chest = require("Game/Entity/Chest.js")
var Interactable = require("Game/Entity/Interactable.js")
var Interacter = require("Game/Entity/Interacter.js")

var GameModeZombieInvasion = require("Game/GameMode/GameModeZombieInvasion.js")

var Config = exports;
//module.exports = Config

Config.init = function() {
    Command.init();
    Message.init();
    console.log(Message.Register);
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
        messagesToClient: Message.ToClient,
        messagesToServer: Message.ToServer,
        messageTypes: Message.Register,
        componentTypes: TypeRegister.addByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ItemComponent, Health, ControlledByPlayer, NameComponent,
            EquippedItems, Projectile, BlockPlacer, PotionEffects, Team, Inventory, Ammo, Chest, Interactable, Interacter]),
        gameModeRegister: TypeRegister.addByArray([], [/*GameModeBaseWar, */GameModeZombieInvasion]),
    });
}
