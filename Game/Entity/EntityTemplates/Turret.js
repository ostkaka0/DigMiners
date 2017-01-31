var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Sprite = require("Engine/Animation/Sprite.js")
var BodyPart = require("Engine/Animation/BodyPart.js")
var PhysicsBody = require("Game/Entity/PhysicsBody.js")
var Bodyparts = require("Game/Entity/Bodyparts.js")
var Drawable = require("Game/Entity/Drawable.js")
var Team = require("Game/Entity/Team.js")
var Health = require("Game/Entity/Health.js")
var Ammo = require("Game/Entity/Ammo.js")
var Movement = require("Game/Entity/Movement.js")
var Inventory = require("Game/Entity/Inventory.js")
var EquippedItems = require("Game/Entity/EquippedItems.js")
var PotionEffects = require("Game/Entity/PotionEffects.js")
var BehaviourContainer = require("Game/Entity/AI/BehaviourContainer.js")
var TurretBehaviour = require("Game/Entity/AI/TurretBehaviour.js")
var TurretIdleBehaviour = require("Game/Entity/AI/TurretIdleBehaviour.js")

module.exports = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1000, 0.5);
    entity.movement = new Movement(0);
    entity.inventory = Inventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EquippedItems();

    var bottomSprite = new Sprite("turret/bottom.png");

    var bodyparts = {
        "bottom": new BodyPart(bottomSprite, 0, 0, 0, null, null, true),
        "top": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), 0, 0, 0, null, "top"),
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(50, 50, 0.0);
    entity.team = new Team(teamId);
    entity.ammo = new Ammo();

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new TurretBehaviour(entity, 10.0));
    entity.behaviourContainer.behaviours.push(new TurretIdleBehaviour(entity));

    return entity;
}
