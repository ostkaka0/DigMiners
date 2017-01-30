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
var BehaviourContainer = require("game/Entity/AI/BehaviourContainer.js")
var DigObstacleBehaviour = require("game/Entity/AI/DigObstacleBehaviour.js")
var TargetPlayerBehaviour = require("game/Entity/AI/TargetPlayerBehaviour.js")
var WalkToEnemyBehaviour = require("game/Entity/AI/WalkToEnemyBehaviour.js")
var RandomWalkBehaviour = require("game/Entity/AI/RandomWalkBehaviour.js")

module.exports = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1.0, 0.3);
    entity.movement = new Movement(20.0, 0.25, 1.0, 0.5);
    entity.nameComponent = new NameComponent("Zombie");
    entity.inventory = Inventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();

    var teamEnum = teamId || Team.Enum.None;
    var feetSprite = new Sprite("monster/feet.png");
    var rightArmSprite = new Sprite("monster/rightArm.png");
    var leftArmSprite = new Sprite("monster/leftArm.png");
    var headSprite = new Sprite("monster/head.png");
    var hatSprite = new Sprite();//((teamEnum == Team.Enum.Blue) ? "egg" : "bigEgg");

    var bodyparts = {
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 8, 0, [10, 11], "body"),
        "leftArm": new BodyPart(leftArmSprite, 5, -8, 0, [10, 23], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "head": new BodyPart(headSprite, 1, 0, 0, null, null),
        "hat": new BodyPart(hatSprite, 1, 0, 0, null, null)
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(50, 50, 0.0);
    entity.team = new Team(teamEnum);

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity, 0.5));
    entity.behaviourContainer.behaviours.push(new TargetPlayerBehaviour(entity, 20.0));
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity, 1.0));
    entity.behaviourContainer.behaviours.push(new WalkToEnemyBehaviour(entity, 1000.0));
    entity.behaviourContainer.behaviours.push(new RandomWalkBehaviour(entity));

    return entity;
}
