import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import ControlledByPlayer from "game/Entity/ControlledByPlayer.js"
import PhysicsBody from "game/Entity/PhysicsBody.js"
import Movement from "game/Entity/Movement.js"
import Bodyparts from "game/Entity/Bodyparts.js"
import Drawable from "game/Entity/Drawable.js"
import BodyPart from "engine/Animation/BodyPart.js"

export default function (playerId, entityId) {
    var entity = {};
    entity.controlledByPlayer = new ControlledByPlayer(playerId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.001, 10.0, 1.0, 0);
    entity.movement = new Movement(40.0);

    var bodyparts = {
        "player": new BodyPart(new Sprite("ghost.png"), 0, 0, 0, null, null),
        "feet": new BodyPart(new Sprite(), 0, 0, 0, null, "player"),
        "leftArm": new BodyPart(new Sprite(), 5, -4, 0, [10, 23], "body"),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(new Sprite(), 5, 4, 0, [10, 11], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, "player"),
        "head": new BodyPart(new Sprite(), 1, 0, 0, null, "player"),
        "hat": new BodyPart(new Sprite(), 1, 0, 0, null, "player")
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);

    return entity;
}
