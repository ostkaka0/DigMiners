import ObjectRegister from "Engine/Core/ObjectRegister.js";
import TypeRegister from "Engine/Core/TypeRegister.js";

import Tiles from "Game/Tiles.js";
import Blocks from "Game/Blocks.js";
import Items from "Game/Items.js";
import Projectiles from "Game/Projectiles.js";
import Particles from "Game/Particles.js";
import ParticleFunctions from "Game/ParticleFunctions.js";
import PotionEffectTypes from "Game/PotionEffectTypes.js";

import CommandRegister from "Engine/Register/Command.js";
import CommandEntitySpawn from "Game/Command/CommandEntitySpawn.js";
import CommandEntityInventory from "Game/Command/CommandEntityInventory.js";
import CommandEntityEquipItem from "Game/Command/CommandEntityEquipItem.js";
import CommandCollisions from "Game/Command/CommandCollisions.js";
import CommandEntityInteractEntity from "Game/Command/CommandEntityInteractEntity.js";
import CommandPlayerJoin from "Game/Command/CommandPlayerJoin.js";
import CommandPlayerLeave from "Game/Command/CommandPlayerLeave.js";

import MessageRegister from "Engine/Register/Message.js";
import MessageCommands from "Game/Message/ToClient/MessageCommands.js";
import MessageRequestKeyStatusUpdate from "Game/Message/ToServer/MessageRequestKeyStatusUpdate.js";
import MessageRequestPlaceBlock from "Game/Message/ToServer/MessageRequestPlaceBlock.js";
import MessageRequestClickBlock from "Game/Message/ToServer/MessageRequestClickBlock.js";
import MessageRequestRotate from "Game/Message/ToServer/MessageRequestRotate.js";
import MessageRequestItemPickup from "Game/Message/ToServer/MessageRequestItemPickup.js";
import MessageRequestSpawn from "Game/Message/ToServer/MessageRequestSpawn.js";

import EntityRegister from "Engine/Register/Entity.js";
import EntityPhysicsBody from "Game/Entity/PhysicsBody.js";
import EntityMovement from "Game/Entity/Movement.js";
import EntityDrawable from "Game/Entity/Drawable.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityItem from "Game/Entity/Item.js";
import EntityHealth from "Game/Entity/Health.js";
import EntityControlledByPlayer from "Game/Entity/ControlledByPlayer.js";
import EntityName from "Game/Entity/Name.js";
import EntityEquippedItems from "Game/Entity/EquippedItems.js";
import EntityProjectile from "Game/Entity/Projectile.js";
import EntityBlockPlacer from "Game/Entity/BlockPlacer.js";
import EntityPotionEffects from "Game/Entity/PotionEffects.js";
import EntityTeam from "Game/Entity/Team.js";
import EntityInventory from "Game/Entity/Inventory.js";
import EntityAmmo from "Game/Entity/Ammo.js";
import EntityChest from "Game/Entity/Chest.js";
import EntityInteractable from "Game/Entity/Interactable.js";
import EntityInteracter from "Game/Entity/Interacter.js";

import GameModeZombieInvasion from "Game/GameMode/GameModeZombieInvasion.js";
import GameModeSurvivalWar from "Game/GameMode/GameModeSurvivalWar.js";
import GameModeBaseWar from "Game/GameMode/GameModeBaseWar.js";

var Config = {};//exports;
export default Config

Config.init = function() {
    Object.assign(Config, {
        port: 3000,
        itemPickupDistance: 2.0,
        blockPlaceDistance: 96, //Pixels
        tickDuration: 1000 / 20,
        fakeLag: 0,
        fakeJitter: 0,
        respawnTime: 1,

        tileRegister: ObjectRegister.addByObject([], Tiles),
        blockRegister: ObjectRegister.addByObject([], Blocks),
        projectileRegister: ObjectRegister.addByObject([], Projectiles),
        particleRegister: ObjectRegister.addByObject([], Particles),
        particleFunctionRegister: ObjectRegister.addByObject([], ParticleFunctions),
        potionEffectTypeRegister: ObjectRegister.addByObject([], PotionEffectTypes),
        gameModeRegister: TypeRegister.addByArray([], [/*GameModeBaseWar,*/ GameModeZombieInvasion/*, GameModeSurvivalWar*/]),
        defaultGameMode: GameModeZombieInvasion
    });
}
