import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import EntityPhysicsBody from "Game/Entity/PhysicsBody.js";
import EntityMovement from "Game/Entity/Movement.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityDrawable from "Game/Entity/Drawable.js";
import EntityName from "Game/Entity/Name.js";
import EntityTeam from "Game/Entity/Team.js";
import EntityHealth from "Game/Entity/Health.js";
import EntityAmmo from "Game/Entity/Ammo.js";
import EntityInventory from "Game/Entity/Inventory.js";
import EntityEquippedItems from "Game/Entity/EquippedItems.js";
import EntityPotionEffects from "Game/Entity/PotionEffects.js";
import BehaviourContainer from "Game/Entity/AI/Container.js";
import BehaviourDigObstacle from "Game/Entity/AI/DigObstacle.js";
import BehaviourTargetPlayer from "Game/Entity/AI/TargetPlayer.js";
import BehaviourWalkToEnemy from "Game/Entity/AI/WalkToEnemy.js";
import BehaviourRandomWalk from "Game/Entity/AI/RandomWalk.js";

export default function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1.0, 0.3);
    entity.movement = new EntityMovement(20.0, 0.25, 1.0, 0.5);
    entity.name = new EntityName("Zombie");
    entity.inventory = EntityInventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EntityEquippedItems();
    entity.potionEffects = new EntityPotionEffects();

    var teamEnum = teamId || EntityTeam.Enum.None;
    var feetSprite = new Sprite("monster/feet.png");
    var rightArmSprite = new Sprite("monster/rightArm.png");
    var leftArmSprite = new Sprite("monster/leftArm.png");
    var headSprite = new Sprite("monster/head.png");
    var hatSprite = new Sprite();//((teamEnum == EntityTeam.Enum.Blue) ? "egg" : "bigEgg");

    var bodyparts = {
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 8, 0, [10, 11], "body"),
        "leftArm": new BodyPart(leftArmSprite, 5, -8, 0, [10, 23], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "head": new BodyPart(headSprite, 1, 0, 0, null, null),
        "hat": new BodyPart(hatSprite, 1, 0, 0, null, null)
    };

    entity.bodyparts = new EntityBodyparts(bodyparts);
    entity.drawable = new EntityDrawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new EntityHealth(50, 50, 0.0);
    entity.team = new EntityTeam(teamEnum);

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new BehaviourDigObstacle(entity, 0.5));
    entity.behaviourContainer.behaviours.push(new BehaviourTargetPlayer(entity, 20.0));
    entity.behaviourContainer.behaviours.push(new BehaviourDigObstacle(entity, 1.0));
    entity.behaviourContainer.behaviours.push(new BehaviourWalkToEnemy(entity, 1000.0));
    entity.behaviourContainer.behaviours.push(new BehaviourRandomWalk(entity));

    return entity;
}
