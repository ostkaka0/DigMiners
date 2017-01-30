var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")
var ControlledByPlayer = require("game/Entity/ControlledByPlayer.js")
var PhysicsBody = require("game/Entity/PhysicsBody.js")
var Movement = require("game/Entity/Movement.js")
var Bodyparts = require("game/Entity/Bodyparts.js")
var Drawable = require("game/Entity/Drawable.js")
var BodyPart = require("engine/Animation/BodyPart.js")

module.exports = function (playerId, entityId) {
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
