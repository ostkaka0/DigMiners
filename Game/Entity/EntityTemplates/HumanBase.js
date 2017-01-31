var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var PhysicsBody = require("Game/Entity/PhysicsBody.js")
var Movement = require("Game/Entity/Movement.js")
var Bodyparts = require("Game/Entity/Bodyparts.js")
var Drawable = require("Game/Entity/Drawable.js")
var NameComponent = require("Game/Entity/NameComponent.js")
var Team = require("Game/Entity/Team.js")
var Sprite = require("Engine/Animation/Sprite.js")
var BodyPart = require("Engine/Animation/BodyPart.js")
var Health = require("Game/Entity/Health.js")

module.exports = HumanBase = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, null, 1000.0);
    entity.nameComponent = new NameComponent("Base");

    var teamEnum = teamId || Team.Enum.Human;
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
