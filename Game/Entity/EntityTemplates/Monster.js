





















var entityTemplateMonster = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1.0, 0.3);
    entity.movement = new EntityMovement(20.0, 0.25, 1.0, 0.5);
    entity.name = new EntityName(entityId);
    entity.inventory = EntityInventory.createInventory(entityId), 10, 1;
    entity.equippedItems = new EntityEquippedItems();
    entity.potionEffects = new EntityPotionEffects();

    var teamEnum = teamId || EntityTeam.Enum.None;
    var feetSprite = new Sprite("feet.png");
    var rightArmSprite = new Sprite("rightArm.png");
    var leftArmSprite = new Sprite("leftArm.png");
    var headSprite = new Sprite("head.png");
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

    entity.health = new EntityHealth(50, 50, 0.0);
    entity.team = new EntityTeam(teamEnum);

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new BehaviourDigObstacle(entity, 0.5));
    entity.behaviourContainer.behaviours.push(new BehaviourTargetPlayer(entity, 10.0));
    entity.behaviourContainer.behaviours.push(new BehaviourDigObstacle(entity, 1.0));
    entity.behaviourContainer.behaviours.push(new BehaviourWalkToEnemy(entity, 60.0));
    entity.behaviourContainer.behaviours.push(new BehaviourWalkToPoint(entity, [-pos[0], -pos[1]]));
    entity.behaviourContainer.behaviours.push(new BehaviourRandomWalk(entity));

    return entity;
}
