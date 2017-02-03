import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import PhysicsBody from "Game/Entity/PhysicsBody.js";
import Movement from "Game/Entity/Movement.js";
import Bodyparts from "Game/Entity/Bodyparts.js";
import Drawable from "Game/Entity/Drawable.js";
import NameComponent from "Game/Entity/NameComponent.js";
import Team from "Game/Entity/Team.js";
import Health from "Game/Entity/Health.js";
import Ammo from "Game/Entity/Ammo.js";
import Inventory from "Game/Entity/Inventory.js";
import EquippedItems from "Game/Entity/EquippedItems.js";
import PotionEffects from "Game/Entity/PotionEffects.js";
import BehaviourContainer from "Game/Entity/AI/BehaviourContainer.js";
import DigObstacleBehaviour from "Game/Entity/AI/DigObstacleBehaviour.js";
import TargetPlayerBehaviour from "Game/Entity/AI/TargetPlayerBehaviour.js";
import WalkToEnemyBehaviour from "Game/Entity/AI/WalkToEnemyBehaviour.js";
import RandomWalkBehaviour from "Game/Entity/AI/RandomWalkBehaviour.js";

export default function(entityId, pos, teamId) {
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
