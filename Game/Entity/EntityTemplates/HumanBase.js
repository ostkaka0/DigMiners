import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import EntityPhysicsBody from "Game/Entity/PhysicsBody.js";
import EntityMovement from "Game/Entity/Movement.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityDrawable from "Game/Entity/Drawable.js";
import EntityName from "Game/Entity/Name.js";
import EntityTeam from "Game/Entity/Team.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import EntityHealth from "Game/Entity/Health.js";

export default function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(pos[0], pos[1]), 0.01, null, 1000.0);
    entity.name = new EntityName("Base");

    var teamEnum = teamId || EntityTeam.Enum.Human;
    var feetSprite = new Sprite("monster/feet.png");
    var rightArmSprite = new Sprite("monster/rightArm.png");
    var leftArmSprite = new Sprite("monster/leftArm.png");
    var headSprite = new Sprite("monster/head.png");
    var hatSprite = new Sprite((teamEnum == EntityTeam.Enum.Blue) ? "egg.png" : "bigEgg.png");

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

    entity.health = new EntityHealth(2000, 2000, 0.0);
    entity.team = new EntityTeam(teamEnum);
    return entity;
}
