import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import PhysicsBody from "game/Entity/PhysicsBody.js"
import Movement from "game/Entity/Movement.js"
import Bodyparts from "game/Entity/Bodyparts.js"
import Drawable from "game/Entity/Drawable.js"
import NameComponent from "game/Entity/NameComponent.js"
import { Team, Teams } from "game/Entity/Team.js"
import Sprite from "engine/Animation/Sprite.js"
import BodyPart from "engine/Animation/BodyPart.js"
import Health from "game/Entity/Health.js"

export default HumanBase = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, null, 1000.0);
    entity.nameComponent = new NameComponent("Base");

    var teamEnum = teamId || Teams.Human;
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

    entity.health = new Health(2000, 2000, 0.0);
    entity.team = new Team(teamEnum);
    return entity;
}
