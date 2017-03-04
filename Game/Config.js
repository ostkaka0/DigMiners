import ObjectRegister from "Engine/Core/ObjectRegister.js";
import TypeRegister from "Engine/Core/TypeRegister.js";

import Tiles from "Game/Tiles.js";
import Blocks from "Game/Blocks.js";
import Items from "Game/Items.js";
import Projectiles from "Game/Projectiles.js";
import Particles from "Game/Particles.js";
import ParticleFunctions from "Game/ParticleFunctions.js";
import PotionEffectTypes from "Game/PotionEffectTypes.js";

import RegisterCommand from "Engine/Register/Command.js";
import CommandEntitySpawn from "Engine/Command/EntitySpawn.js";
import CommandEntityInventory from "Engine/Command/EntityInventory.js";
import CommandEntityEquipItem from "Engine/Command/EntityEquipItem.js";
import CommandCollisions from "Engine/Command/Collisions.js";
import CommandEntityInteractEntity from "Game/Command/EntityInteractEntity.js";
import CommandPlayerJoin from "Engine/Command/PlayerJoin.js";
import CommandPlayerLeave from "Engine/Command/PlayerLeave.js";

import RegisterMessage from "Engine/Register/Message.js";
import MessageCommands from "Game/Message/ToClient/Commands.js";
import MessageRequestKeyStatusUpdate from "Game/Message/ToServer/KeyStatusUpdate.js";
import MessageRequestPlaceBlock from "Game/Message/ToServer/PlaceBlock.js";
import MessageRequestClickBlock from "Game/Message/ToServer/ClickBlock.js";
import MessageRequestRotate from "Game/Message/ToServer/Rotate.js";
import MessageRequestItemPickup from "Game/Message/ToServer/ItemPickup.js";
import MessageRequestSpawn from "Game/Message/ToServer/Spawn.js";

import RegisterEntity from "Engine/Register/Entity.js";
import EntityPhysicsBody from "Engine/Entity/PhysicsBody.js";
import EntityMovement from "Engine/Entity/Movement.js";
import EntityDrawable from "Engine/Entity/Drawable.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityItem from "Game/Entity/Item.js";
import EntityHealth from "Engine/Entity/Health.js";
import EntityControlledByPlayer from "Game/Entity/ControlledByPlayer.js";
import EntityName from "Engine/Entity/Name.js";
import EntityEquippedItems from "Engine/Entity/EquippedItems.js";
import EntityProjectile from "Game/Entity/Projectile.js";
import EntityBlockPlacer from "Game/Entity/BlockPlacer.js";
import EntityPotionEffects from "Game/Entity/PotionEffects.js";
import EntityTeam from "Engine/Entity/Team.js";
import EntityInventory from "Engine/Entity/Inventory.js";
import EntityAmmo from "Engine/Entity/Ammo.js";
import EntityChest from "Game/Entity/Chest.js";
import EntityInteractable from "Game/Entity/Interactable.js";
import EntityInteracter from "Game/Entity/Interacter.js";

import GameModeZombieInvasion from "Game/GameMode/ZombieInvasion.js";
import GameModeSurvivalWar from "Game/GameMode/SurvivalWar.js";
import GameModeBaseWar from "Game/GameMode/BaseWar.js";

export default {
    port: 3000,
    itemPickupDistance: 2.0,
    blockPlaceDistance: 96, //Pixels
    tickDuration: 1000 / 20,
    fakeLag: 0,
    fakeJitter: 0,
    respawnTime: 1,
}
