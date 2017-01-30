var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var Sprite = require("engine/Animation/Sprite.js")
var BodyPart = require("engine/Animation/BodyPart.js")
var PhysicsBody = require("game/Entity/PhysicsBody.js")
var Bodyparts = require("game/Entity/Bodyparts.js")
var Drawable = require("game/Entity/Drawable.js")
var Team = require("game/Entity/Team.js")
var Health = require("game/Entity/Health.js")
var Ammo = require("game/Entity/Ammo.js")
var Movement = require("game/Entity/Movement.js")
var Inventory = require("game/Entity/Inventory.js")
var EquippedItems = require("game/Entity/EquippedItems.js")
var PotionEffects = require("game/Entity/PotionEffects.js")
var BehaviourContainer = require("game/Entity/AI/BehaviourContainer.js")
var TurretBehaviour = require("game/Entity/AI/TurretBehaviour.js")
var TurretIdleBehaviour = require("game/Entity/AI/TurretIdleBehaviour.js")

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
