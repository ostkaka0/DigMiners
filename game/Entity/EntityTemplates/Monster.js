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
import BehaviourContainer from "game/Entity/AI/BehaviourContainer.js"
import DigObstacleBehaviour from "game/Entity/AI/DigObstacleBehaviour.js"
import TargetPlayerBehaviour from "game/Entity/AI/TargetPlayerBehaviour.js"
import WalkToEnemyBehaviour from "game/Entity/AI/WalkToEnemyBehaviour.js"
import WalkToPointBehaviour from "game/Entity/AI/WalkToPointBehaviour.js"
import RandomWalkBehaviour from "game/Entity/AI/RandomWalkBehaviour.js"

export default function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1.0, 0.3);
    entity.movement = new Movement(20.0, 0.25, 1.0, 0.5);
    entity.nameComponent = new NameComponent(entityId);
    entity.inventory = Inventory.createInventory(entityId), 10, 1;
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();

    var teamEnum = teamId || Teams.None;
    var feetSprite = new Sprite("monster/feet.png");
    var rightArmSprite = new Sprite("monster/rightArm.png");
    var leftArmSprite = new Sprite("monster/leftArm.png");
    var headSprite = new Sprite("monster/head.png");
    var hatSprite = new Sprite((teamEnum == Teams.Blue) ? "egg.png" : "bigEgg.png");

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
    entity.behaviourContainer.behaviours.push(new TargetPlayerBehaviour(entity, 10.0));
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity, 1.0));
    entity.behaviourContainer.behaviours.push(new WalkToEnemyBehaviour(entity, 60.0));
    entity.behaviourContainer.behaviours.push(new WalkToPointBehaviour(entity, [-pos[0], -pos[1]]));
    entity.behaviourContainer.behaviours.push(new RandomWalkBehaviour(entity));

    return entity;
}
