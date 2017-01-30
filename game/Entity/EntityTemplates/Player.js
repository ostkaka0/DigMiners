var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")

var Sprite = require("engine/Animation/Sprite.js")
var BodyPart = require("engine/Animation/BodyPart.js")
var PhysicsBody = require("game/Entity/PhysicsBody.js")
var Movement = require("game/Entity/Movement.js")
var Bodyparts = require("game/Entity/Bodyparts.js")
var Drawable = require("game/Entity/Drawable.js")
var NameComponent = require("game/Entity/NameComponent.js")
var Team = require("game/Entity/Team.js")
var Health = require("game/Entity/Health.js")
var Ammo = require("game/Entity/Ammo.js")
var Inventory = require("game/Entity/Inventory.js")
var EquippedItems = require("game/Entity/EquippedItems.js")
var PotionEffects = require("game/Entity/PotionEffects.js")
var ControlledByPlayer = require("game/Entity/ControlledByPlayer.js")
var Global = require("game/Global.js")
var Interacter = require("game/Entity/Interacter.js")

/*module.exports.*/var entityTemplatePlayerZombie = function(playerId, entityId, name, pos, playerClass) {
    var entity = entityTemplateZombie(entityId, pos, Team.Enum.Zombie);
    entity.behaviourContainer = undefined;
    entity.controlledByPlayer = new ControlledByPlayer(playerId);
    entity.nameComponent = new NameComponent(name);
    return entity;
}

module.exports = function(playerId, entityId, name, playerClass, teamId) {
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
    var hatSprite = new Sprite();//((teamEnum == Team.Enum.Blue) ? "egg" : "bigEgg");

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

    playerClass.blocks.forEach(function(blockItem) {
        entity.inventory.addStaticItem(Global.gameData, blockItem.id);
    });

    return entity;
}
