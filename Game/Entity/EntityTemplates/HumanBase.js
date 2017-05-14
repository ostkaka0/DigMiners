
var entityTemplateHumanBase = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(pos[0], pos[1]), 0.01, null, 1000.0);
    entity.name = new EntityName("Base");

    var teamEnum = teamId || EntityTeam.Enum.Human;
    var feetSprite = new Sprite(Client.textures["monster/feet.png"]);
    var rightArmSprite = new Sprite(Client.textures["monster/rightArm.png"]);
    var leftArmSprite = new Sprite(Client.textures["monster/leftArm.png"]);
    var headSprite = new Sprite(Client.textures["monster/head.png"]);
    var hatSprite = new Sprite((teamEnum == EntityTeam.Enum.Blue) ? "egg.png" : "bigEgg.png");

    var bodyParts = {
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 8, 0, [10, 11], "body"),
        "leftArm": new BodyPart(leftArmSprite, 5, -8, 0, [10, 23], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "head": new BodyPart(headSprite, 1, 0, 0, null, null),
        "hat": new BodyPart(hatSprite, 1, 0, 0, null, null)
    };

    entity.bodyParts = new EntityBodyparts(bodyParts);
    entity.drawable = new EntityDrawable(1);
    var healthbarSprite = new Sprite(Client.textures["healthbar.png"]);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new EntityHealth(2000, 2000, 0.0);
    entity.team = new EntityTeam(teamEnum);
    return entity;
}

ObjectRegister.add(EntityTemplateRegister, entityTemplateHumanBase);
