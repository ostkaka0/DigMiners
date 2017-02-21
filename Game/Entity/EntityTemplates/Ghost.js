import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import EntityControlledByPlayer from "Game/Entity/ControlledByPlayer.js";
import EntityPhysicsBody from "Game/Entity/PhysicsBody.js";
import EntityMovement from "Game/Entity/Movement.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityDrawable from "Game/Entity/Drawable.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import EntityName from "Game/Entity/Name.js";

export default function (playerId, entityId, name) {
    var entity = {};
    entity.controlledByPlayer = new EntityControlledByPlayer(playerId);
    entity.physicsBody = new EntityPhysicsBody(v2.create(0, 0), 0.001, 10.0, 1.0, 0);
    entity.movement = new EntityMovement(40.0);
    entity.name = new EntityName(name);

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

    entity.bodyparts = new EntityBodyparts(bodyparts);
    entity.drawable = new EntityDrawable(1);

    return entity;
}
