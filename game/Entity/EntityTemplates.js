entityTemplates = {};



entityTemplates.player = function(playerId, entityId, name, playerClass, teamId) {
    var entity = {};
    entity.controlledByPlayer = new ControlledByPlayer(playerId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.001, 20.0, 1.0, 0.3);
    entity.movement = new Movement(playerClass.speed * 30.0);
    entity.nameComponent = new NameComponent(name);
    entity.inventory = new Inventory();
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();

    var teamEnum = teamId;
    var feetSprite = new Sprite("feet");
    var rightArmSprite = new Sprite("rightArm");
    var leftArmSprite = new Sprite("leftArm");
    var headSprite = new Sprite("head");
    var hatSprite = new Sprite((teamEnum == Teams.Blue) ? "egg" : "bigEgg");

    // Order of bodyparts is draw order
    // Parameters: sprite, offsetX, offsetY, offsetAngle, pivot(v2), parent name
    var bodyparts = {
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 4, 0, [10, 11], "body"),
        "leftArm": new BodyPart(leftArmSprite, 5, -4, 0, [10, 23], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "head": new BodyPart(headSprite, 1, 0, 0, null, null),
        "hat": new BodyPart(hatSprite, 1, 0, 0, null, null)
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);
    entity.health = new Health(playerClass.health, playerClass.health, playerClass.armor);
    entity.team = new Team(teamEnum);
    entity.ammo = new Ammo();
    
    playerClass.weapons.forEach(function(weapon) {
        entity.inventory.addStaticItem(gameData, weapon.id);
        entity.ammo[weapon.id] = weapon.ammoMax || 0;
    });
    console.log(entity.ammo);
    playerClass.blocks.forEach(function(blockItem) {
        entity.inventory.addStaticItem(gameData, blockItem.id);
    });

    return entity;
}

entityTemplates.item = function(itemId, amount) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new ItemComponent(itemId, amount);

    var itemType = Config.itemRegister[itemId];
    var bodySprite = new Sprite(itemType.name);
    var bodyparts = {
        "body": new BodyPart(bodySprite, 0, 0, 0),
        "text": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(0);

    return entity;
}

entityTemplates.testMonster = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1.0, 0.3);
    entity.movement = new Movement(20.0, 0.25, 1.0, 0.5);
    entity.nameComponent = new NameComponent(entityId);
    entity.inventory = new Inventory();
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();

    var teamEnum = teamId || Teams.None;
    var feetSprite = new Sprite("monster/feet");
    var rightArmSprite = new Sprite("monster/rightArm");
    var leftArmSprite = new Sprite("monster/leftArm");
    var headSprite = new Sprite("monster/head");
    var hatSprite = new Sprite((teamEnum == Teams.Blue) ? "egg" : "bigEgg");

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
    var healthbarSprite = new Sprite("healthbar", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(50, 50, 0.0);
    entity.team = new Team(teamEnum);

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity, 0.5));
    entity.behaviourContainer.behaviours.push(new TargetPlayerBehaviour(entity, 10.0));
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity, 1.0));
    entity.behaviourContainer.behaviours.push(new WalkToEnemyBehaviour(entity, 60.0));
    entity.behaviourContainer.behaviours.push(new WalkToPointBehaviour(entity, [-pos[0], -pos[1]]));
    entity.behaviourContainer.behaviours.push(new RandomWalkBehaviour(entity));

    return entity;
}

entityTemplates.zombie = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1.0, 0.3);
    entity.movement = new Movement(20.0, 0.25, 1.0, 0.5);
    entity.nameComponent = new NameComponent("Zombie");
    entity.inventory = new Inventory();
    entity.equippedItems = new EquippedItems();
    entity.potionEffects = new PotionEffects();

    var teamEnum = teamId || Teams.None;
    var feetSprite = new Sprite("monster/feet");
    var rightArmSprite = new Sprite("monster/rightArm");
    var leftArmSprite = new Sprite("monster/leftArm");
    var headSprite = new Sprite("monster/head");
    var hatSprite = new Sprite((teamEnum == Teams.Blue) ? "egg" : "bigEgg");

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
    var healthbarSprite = new Sprite("healthbar", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(50, 50, 0.0);
    entity.team = new Team(teamEnum);

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity, 0.5));
    entity.behaviourContainer.behaviours.push(new TargetPlayerBehaviour(entity, 20.0));
    entity.behaviourContainer.behaviours.push(new DigObstacleBehaviour(entity, 1.0));
    entity.behaviourContainer.behaviours.push(new WalkToEnemyBehaviour(entity, 1000.0));
    entity.behaviourContainer.behaviours.push(new RandomWalkBehaviour(entity));

    return entity;
}

entityTemplates.monsterSpawner = function(entityId, pos, entityTemplate, maxEntities, radius, duration, items, equippedItemId, teamId) {
    var entity = {};
    entity.spawner = new Spawner(entityTemplate, pos, maxEntities, radius, duration, items, equippedItemId, null, teamId);
    return entity;
}

entityTemplates.TeamBase = function(entityId, pos, teamId, maxEntities, radius, duration) {
    maxEntities = maxEntities || 10;
    radius = radius || 4.0;
    duration = duration || 60;

    var entity = {};
    entity.spawner = new Spawner(entityTemplates.testMonster, pos, maxEntities, radius, duration, [{ id: Items.WeaponPistol.id, quantity: 1 }, { id: Items.RustyShovel.id, quantity: 1 }, { id: Items.Egg.id, quantity: 1000 }], null, null, teamId);
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, null, 1000.0);
    entity.nameComponent = new NameComponent("Base");

    var teamEnum = teamId;
    var feetSprite = new Sprite("monster/feet");
    var rightArmSprite = new Sprite("monster/rightArm");
    var leftArmSprite = new Sprite("monster/leftArm");
    var headSprite = new Sprite("monster/head");
    var hatSprite = new Sprite((teamEnum == Teams.Blue) ? "egg" : "bigEgg");

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
    var healthbarSprite = new Sprite("healthbar", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(2000, 2000, 0.0);
    entity.team = new Team(teamEnum);
    return entity;
}

entityTemplates.humanBase = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, null, 1000.0);
    entity.nameComponent = new NameComponent("Base");

    var teamEnum = teamId || Teams.Human;
    var feetSprite = new Sprite("monster/feet");
    var rightArmSprite = new Sprite("monster/rightArm");
    var leftArmSprite = new Sprite("monster/leftArm");
    var headSprite = new Sprite("monster/head");
    var hatSprite = new Sprite((teamEnum == Teams.Blue) ? "egg" : "bigEgg");

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
    var healthbarSprite = new Sprite("healthbar", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(2000, 2000, 0.0);
    entity.team = new Team(teamEnum);
    return entity;
}
