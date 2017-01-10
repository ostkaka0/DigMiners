entityTemplates = {};

entityTemplates.player = function(playerId, entityId, name) {
    var entity = {};
    entity.controlledByPlayer = new ControlledByPlayer(playerId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.001, 20.0);
    entity.movement = new Movement(40.0);
    entity.nameComponent = new NameComponent(name);
    entity.inventory = new Inventory();
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();

    var feetSprite = new Sprite("feet");
    var rightArmSprite = new Sprite("rightArm");
    var leftArmSprite = new Sprite("leftArm");
    var headSprite = new Sprite("head");

    // Order of bodyparts is draw order
    // Parameters: sprite, offsetX, offsetY, offsetAngle, pivot(v2), parent name
    var bodyparts = {
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 4, 0, [10, 11], "body"),
        "leftArm": new BodyPart(leftArmSprite, 5, -4, 0, [10, 23], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "head": new BodyPart(headSprite, 1, 0, 0, null, null),
        "hat": new BodyPart(new Sprite(), 1, 0, 0, null, null)
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);
    entity.health = new Health(100, 100);
    entity.team = new Team(Teams.Human);

    return entity;
}

entityTemplates.item = function(itemId, amount) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new ItemComponent(itemId, amount);

    var itemType = gameData.itemRegister[itemId];
    var bodySprite = new Sprite(itemType.name);
    var bodyparts = {
        "body": new BodyPart(bodySprite, 0, 0, 0),
        "text": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(0);

    return entity;
}

entityTemplates.testMonster = function(entityId, pos) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0);
    entity.movement = new Movement(20.0);
    entity.nameComponent = new NameComponent(entityId);
    entity.inventory = new Inventory();
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();

    var feetSprite = new Sprite("monster/feet");
    var rightArmSprite = new Sprite("monster/rightArm");
    var leftArmSprite = new Sprite("monster/leftArm");
    var headSprite = new Sprite("monster/head");

    var bodyparts = {
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 8, 0, [10, 11], "body"),
        "leftArm": new BodyPart(leftArmSprite, 5, -8, 0, [10, 23], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "head": new BodyPart(headSprite, 1, 0, 0, null, null),
        "hat": new BodyPart(new Sprite(), 1, 0, 0, null, null)
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(100, 100);
    entity.team = new Team(Teams.Zombie);

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity));
    entity.behaviourContainer.behaviours.push(new TargetPlayerBehaviour(entity, 30.0));
    entity.behaviourContainer.behaviours.push(new RandomWalkBehaviour(entity));

    return entity;
}

entityTemplates.monsterSpawner = function(entityId, pos, entityTemplate, maxEntities, radius, duration, items, equippedItemId) {
    var entity = {};
    entity.spawner = new Spawner(entityTemplate, pos, maxEntities, radius, duration, items, equippedItemId);
    return entity;
}
