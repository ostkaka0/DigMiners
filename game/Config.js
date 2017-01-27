import ObjectRegister from "engine/ObjectRegister.js"
import TypeRegister from "engine/TypeRegister.js"

import Tiles from "game/Tiles.js"
import Blocks from "game/Blocks.js"
import Items from "game/Items.js"
import Projectiles from "game/Projectiles.js"
import Particles from "game/Particles.js"
import ParticleFunctions from "game/ParticleFunctions.js"
import PotionEffectTypes from "game/PotionEffectTypes.js"

import CommandEntityMove from "game/Command/CommandEntityMove.js"
import CommandDig from "game/Command/CommandDig.js"
import CommandEntityDig from "game/Command/CommandEntityDig.js"
import CommandEntityEquipItem from "game/Command/CommandEntityEquipItem.js"
import CommandEntityBuild from "game/Command/CommandEntityBuild.js"
import CommandEntityHealthChange from "game/Command/CommandEntityHealthChange.js"
import CommandEntitySpawn from "game/Command/CommandEntitySpawn.js"
import CommandCollisions from "game/Command/CommandCollisions.js"
import CommandEntityDestroy from "game/Command/CommandEntityDestroy.js"
import CommandPlayerJoin from "game/Command/CommandPlayerJoin.js"
import CommandPlayerLeave from "game/Command/CommandPlayerLeave.js"
import CommandPlayerSpawn from "game/Command/CommandPlayerSpawn.js"
import CommandKeyStatusUpdate from "game/Command/CommandKeyStatusUpdate.js"
import CommandEntityInventory from "game/Command/CommandEntityInventory.js"
import CommandPlayerOreInventory from "game/Command/CommandPlayerOreInventory.js"
import CommandEntityRotate from "game/Command/CommandEntityRotate.js"
import CommandBlockStrength from "game/Command/CommandBlockStrength.js"
import CommandProjectileSpawn from "game/Command/CommandProjectileSpawn.js"
import CommandParticles from "game/Command/CommandParticles.js"
import CommandPlaceBlock from "game/Command/CommandPlaceBlock.js"
import CommandEntityReloadWeapon from "game/Command/CommandEntityReloadWeapon.js"
import CommandEntityBeginReloadWeapon from "game/Command/CommandEntityBeginReloadWeapon.js"
import CommandBuild from "game/Command/CommandBuild.js"
import CommandEntityLookAtEntity from "game/Command/CommandEntityLookAtEntity.js"
import CommandPopupMessage from "game/Command/CommandPopupMessage.js"
import CommandEntityInteractEntity from "game/Command/CommandEntityInteractEntity.js"

import MessageInit from "game/Message/ToClient/MessageInit.js"
import MessageCommands from "game/Message/ToClient/MessageCommands.js"
import MessageChunk from "game/Message/ToClient/MessageChunk.js"
import MessageChangeGameMode from "game/Message/ToClient/MessageChangeGamemode.js"
import MessageSpectate from "game/Message/ToClient/MessageSpectate.js"
import MessageAmmoChange from "game/Message/ToClient/MessageAmmoChange.js"

import MessageRequestKeyStatusUpdate from "game/Message/ToServer/MessageRequestKeyStatusUpdate.js"
import MessageRequestItemPickup from "game/Message/ToServer/MessageRequestItemPickup.js"
import MessageRequestClickSlot from "game/Message/ToServer/MessageRequestClickSlot.js"
import MessageRequestCraft from "game/Message/ToServer/MessageRequestCraft.js"
import MessageRequestPlaceBlock from "game/Message/ToServer/MessageRequestPlaceBlock.js"
import MessageRequestClickEntity from "game/Message/ToServer/MessageRequestClickEntity.js"
import MessageRequestRotate from "game/Message/ToServer/MessageRequestRotate.js"
import MessageRequestClickBlock from "game/Message/ToServer/MessageRequestClickBlock.js"
import MessageRequestSpawn from "game/Message/ToServer/MessageRequestSpawn.js"

import PhysicsBody from "game/Entity/PhysicsBody.js"
import Movement from "game/Entity/Movement.js"
import Drawable from "game/Entity/Drawable.js"
import Bodyparts from "game/Entity/Bodyparts.js"
import ItemComponent from "game/Entity/ItemComponent.js"
import Health from "game/Entity/Health.js"
import ControlledByPlayer from "game/Entity/ControlledByPlayer.js"
import NameComponent from "game/Entity/NameComponent.js"
import EquippedItems from "game/Entity/EquippedItems.js"
import Projectile from "game/Entity/Projectile.js"
import BlockPlacer from "game/Entity/BlockPlacer.js"
import PotionEffects from "game/Entity/PotionEffects.js"
import Team from "game/Entity/Team.js"
import Inventory from "game/Entity/Inventory.js"
import Ammo from "game/Entity/Ammo.js"
import Chest from "game/Entity/Chest.js"
import Interactable from "game/Entity/Interactable.js"
import Interacter from "game/Entity/Interacter.js"

import GameModeZombieInvasion from "game/GameMode/GameModeZombieInvasion.js"

var messagesToClient = [MessageInit, MessageCommands, MessageChunk, MessageChangeGameMode, MessageSpectate, MessageAmmoChange];
var messagesToServer = [MessageRequestKeyStatusUpdate, MessageRequestItemPickup, MessageRequestClickSlot, MessageRequestCraft, MessageRequestPlaceBlock,
    MessageRequestClickEntity, MessageRequestRotate, MessageRequestClickBlock, MessageRequestSpawn];

export default {
    port: 3000,
    itemPickupDistance: 2.0,
    blockPlaceDistance: 96, //Pixels
    tickDuration: 1000 / 20,
    fakeLag: 0,
    fakeJitter: 0,
    respawnTime: 1,

    tileRegister: ObjectRegister.addByObject([], Tiles),
    itemRegister: ObjectRegister.addByObject([], Items),
    blockRegister: ObjectRegister.addByObject([], Blocks),
    projectileRegister: ObjectRegister.addByObject([], Projectiles),
    particleRegister: ObjectRegister.addByObject([], Particles),
    particleFunctionRegister: ObjectRegister.addByObject([], ParticleFunctions),
    potionEffectTypeRegister: ObjectRegister.addByObject([], PotionEffectTypes),
    commandTypes: TypeRegister.addByArray([], [CommandEntityMove, CommandDig, CommandEntityDig, CommandEntityEquipItem, CommandEntityBuild, CommandEntityHealthChange,
        CommandEntitySpawn, CommandCollisions, CommandEntityDestroy, CommandPlayerJoin, CommandPlayerLeave, CommandPlayerSpawn, CommandKeyStatusUpdate,
        CommandEntityInventory, CommandPlayerOreInventory, CommandEntityRotate, CommandBlockStrength, CommandProjectileSpawn, CommandParticles, CommandPlaceBlock,
        CommandEntityReloadWeapon, CommandEntityBeginReloadWeapon, CommandBuild, CommandEntityLookAtEntity, CommandPopupMessage, CommandEntityInteractEntity]),
    messagesToClient,
    messagesToServer,
    messageTypes: TypeRegister.addByArray([], messagesToClient.concat(messagesToServer)),
    componentTypes: TypeRegister.addByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ItemComponent, Health, ControlledByPlayer, NameComponent,
        EquippedItems, Projectile, BlockPlacer, PotionEffects, Team, Inventory, Ammo, Chest, Interactable, Interacter]),
    gameModeRegister: TypeRegister.addByArray([], [/*GameModeBaseWar, */GameModeZombieInvasion]),

}
