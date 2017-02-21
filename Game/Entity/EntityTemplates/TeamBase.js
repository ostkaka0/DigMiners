import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import Sprite from "Engine/Animation/Sprite.js";


import Spawner from "Game/Entity/Spawner.js";
import entityTemplateMonster from "Game/Entity/EntityTemplates/Monster.js";
import PhysicsBody from "Game/Entity/PhysicsBody.js";
import Movement from "Game/Entity/Movement.js";
import Bodyparts from "Game/Entity/Bodyparts.js";
import Drawable from "Game/Entity/Drawable.js";
import NameComponent from "Game/Entity/NameComponent.js";
import Team from "Game/Entity/Team.js";
import Health from "Game/Entity/Health.js";
import EntityAmmo from "Game/Entity/Ammo.js";
import Inventory from "Game/Entity/Inventory.js";
import EquippedItems from "Game/Entity/EquippedItems.js";
import PotionEffects from "Game/Entity/PotionEffects.js";
import BehaviourContainer from "Game/Entity/AI/BehaviourContainer.js";
import DigObstacleBehaviour from "Game/Entity/AI/DigObstacleBehaviour.js";
import TargetPlayerBehaviour from "Game/Entity/AI/TargetPlayerBehaviour.js";
import WalkToEnemyBehaviour from "Game/Entity/AI/WalkToEnemyBehaviour.js";
import RandomWalkBehaviour from "Game/Entity/AI/RandomWalkBehaviour.js";

import Items from "Game/Items.js";

export default function(entityId, pos, teamId, maxEntities, radius, duration) {
    maxEntities = maxEntities || 10;
    radius = radius || 4.0;
    duration = duration || 60;

    var entity = {};
    entity.spawner = new Spawner(entityTemplateMonster, pos, maxEntities, radius, duration, null/*[{ id: Items.Types.WeaponPistol.id, quantity: 1 }, { id: Items.Types.RustyShovel.id, quantity: 1 }]*/, null, null, teamId);
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
