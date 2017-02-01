var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var BodyPart = require("Engine/Animation/BodyPart.js")
var Sprite = require("Engine/Animation/Sprite.js")


var Spawner = require("Game/Entity/Spawner.js")
var entityTemplateMonster = require("Game/Entity/EntityTemplates/Monster.js")
var PhysicsBody = require("Game/Entity/PhysicsBody.js")
var Movement = require("Game/Entity/Movement.js")
var Bodyparts = require("Game/Entity/Bodyparts.js")
var Drawable = require("Game/Entity/Drawable.js")
var NameComponent = require("Game/Entity/NameComponent.js")
var Team = require("Game/Entity/Team.js")
var Health = require("Game/Entity/Health.js")
var Ammo = require("Game/Entity/Ammo.js")
var Inventory = require("Game/Entity/Inventory.js")
var EquippedItems = require("Game/Entity/EquippedItems.js")
var PotionEffects = require("Game/Entity/PotionEffects.js")
var BehaviourContainer = require("Game/Entity/AI/BehaviourContainer.js")
var DigObstacleBehaviour = require("Game/Entity/AI/DigObstacleBehaviour.js")
var TargetPlayerBehaviour = require("Game/Entity/AI/TargetPlayerBehaviour.js")
var WalkToEnemyBehaviour = require("Game/Entity/AI/WalkToEnemyBehaviour.js")
var RandomWalkBehaviour = require("Game/Entity/AI/RandomWalkBehaviour.js")

var Items = require("Game/Items.js")
var Team = require("Game/Entity/Team.js")

module.exports = function(entityId, pos, teamId, maxEntities, radius, duration) {
    maxEntities = maxEntities || 10;
    radius = radius || 4.0;
    duration = duration || 60;

    var entity = {};
    entity.spawner = new Spawner(entityTemplateMonster, pos, maxEntities, radius, duration, [{ id: Items.Types.WeaponPistol.id, quantity: 1 }, { id: Items.Types.RustyShovel.id, quantity: 1 }], null, null, teamId);
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, null, 1000.0);
    entity.nameComponent = new NameComponent("Base");

    var teamEnum = teamId;
    var feetSprite = new Sprite("monster/feet.png");
    var rightArmSprite = new Sprite("monster/rightArm.png");
    var leftArmSprite = new Sprite("monster/leftArm.png");
    var headSprite = new Sprite("monster/head.png");
    var hatSprite = new Sprite((teamEnum == Team.Enum.Blue) ? "egg.png" : "bigEgg.png");

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

    entity.health = new Health(2000, 2000, 0.0);
    entity.team = new Team(teamEnum);
    return entity;
}
