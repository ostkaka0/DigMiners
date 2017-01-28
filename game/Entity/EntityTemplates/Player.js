import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"

import Sprite from "engine/Animation/Sprite.js"
import BodyPart from "engine/Animation/BodyPart.js"
import PhysicsBody from "game/Entity/PhysicsBody.js"
import Movement from "game/Entity/Movement.js"
import Bodyparts from "game/Entity/Bodyparts.js"
import Drawable from "game/Entity/Drawable.js"
import NameComponent from "game/Entity/NameComponent.js"
import { Team, Teams } from "game/Entity/Team.js"
import Health from "game/Entity/Health.js"
import Ammo from "game/Entity/Ammo.js"
import Inventory from "game/Entity/Inventory.js"
import EquippedItems from "game/Entity/EquippedItems.js"
import PotionEffects from "game/Entity/PotionEffects.js"
import ControlledByPlayer from "game/Entity/ControlledByPlayer.js"
import Global from "game/Global.js"
import Interacter from "game/Entity/Interacter.js"

export var entityTemplatePlayerZombie = function(playerId, entityId, name, pos, playerClass) {
    var entity = entityTemplateZombie(entityId, pos, Teams.Zombie);
    entity.behaviourContainer = undefined;
    entity.controlledByPlayer = new ControlledByPlayer(playerId);
    entity.nameComponent = new NameComponent(name);
    return entity;
}

export var entityTemplatePlayer = function(playerId, entityId, name, playerClass, teamId) {
    var entity = {};
    entity.controlledByPlayer = new ControlledByPlayer(playerId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.001, 20.0, 1.0, 0.45);
    entity.movement = new Movement(playerClass.speed * 30.0);
    entity.nameComponent = new NameComponent(name);
    entity.inventory = Inventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();
    entity.interacter = new Interacter(); // Server only used component

    var teamEnum = teamId;
    var feetSprite = new Sprite("feet.png");
    var rightArmSprite = new Sprite("rightArm.png");
    var leftArmSprite = new Sprite("leftArm.png");
    var headSprite = new Sprite("head.png");
    var hatSprite = new Sprite();//((teamEnum == Teams.Blue) ? "egg" : "bigEgg");

    // Order of bodyparts is draw order
    // Parameters: sprite, offsetX, offsetY, offsetAngle, pivot(v2), parent name
    var bodyparts = {
        "player": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, "player"),
        "leftArm": new BodyPart(leftArmSprite, 5, -4, 0, [10, 23], "body"),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 4, 0, [10, 11], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, "player"),
        "head": new BodyPart(headSprite, 1, 0, 0, null, "player"),
        "hat": new BodyPart(hatSprite, 1, 0, 0, null, "player")
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);
    entity.health = new Health(playerClass.health, playerClass.health, playerClass.armor);
    entity.team = new Team(teamEnum);
    entity.ammo = new Ammo();

    playerClass.weapons.forEach(function(weapon) {
        entity.inventory.addStaticItem(Global.gameData, weapon.id);
        entity.ammo[weapon.id] = weapon.ammoMax || 0;
    });
    console.log(playerClass);
    playerClass.blocks.forEach(function(blockItem) {
        console.log(blockItem );
        entity.inventory.addStaticItem(Global.gameData, blockItem.id);
    });

    return entity;
}

export default entityTemplatePlayer;
