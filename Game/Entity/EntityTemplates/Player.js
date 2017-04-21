
var entityTemplatePlayerZombie = function(playerId, entityId, name, pos, playerClass) {
    var entity = entityTemplateZombie(entityId, pos, EntityTeam.Enum.Zombie);
    entity.behaviourContainer = undefined;
    entity.controlledByPlayer = new EntityControlledByPlayer(playerId);
    entity.name = new EntityName(name);
    return entity;
}

var entityTemplatePlayer = function(playerId, entityId, name, playerClass, teamId) {
    var entity = {};
    entity.controlledByPlayer = new EntityControlledByPlayer(playerId);
    entity.physicsBody = new EntityPhysicsBody(v2.create(0, 0), 0.001, 20.0, 1.0, 0.45);
    entity.movement = new EntityMovement(playerClass.speed * 30.0);
    entity.name = new EntityName(name);
    entity.inventory = EntityInventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EntityEquippedItems();
    entity.potionEffects = new EntityPotionEffects();
    entity.interacter = new EntityInteracter(); // Server only used component

    var teamEnum = teamId;
    var feetSprite = new Sprite("feet.png");
    var rightArmSprite = new Sprite("rightArm.png");
    var leftArmSprite = new Sprite("leftArm.png");
    var headSprite = new Sprite("head.png");
    var strHatSprite = "";
    if (teamEnum == EntityTeam.Enum.Blue) strHatSprite = "egg.png";
    if (teamEnum == EntityTeam.Enum.Red) strHatSprite = "bigEgg.png";
    var hatSprite = new Sprite(strHatSprite);

    // Order of bodyparts is draw order
    // Parameters: sprite, offsetX, offsetY, offsetAngle, pivot(v2), parent name
    var bodyparts = {
        "player": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "feet": new BodyPart(feetSprite, 0, 0, 0, null, "player"),
        "leftArm": new BodyPart(leftArmSprite, 5, -4, 0, [10, 23], "body"),
        "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
        "rightArm": new BodyPart(rightArmSprite, 5, 4, 0, [10, 11], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, "player"),
        "head": new BodyPart(headSprite, 1, 0, 0, null, "player"),
        "hat": new BodyPart(hatSprite, 1, 0, 0, null, "player")
    };

    entity.bodyparts = new EntityBodyparts(bodyparts);
    entity.drawable = new EntityDrawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);
    entity.health = new EntityHealth(playerClass.health, playerClass.health, playerClass.armor);
    entity.team = new EntityTeam(teamEnum);
    entity.ammo = new EntityAmmo();

    playerClass.weapons.forEach(function(weapon) {
        entity.inventory.addStaticItem(gameData, weapon.id);
        entity.ammo[weapon.id] = weapon.ammoMax || 0;
    });

    playerClass.blocks.forEach(function(blockItem) {
        entity.inventory.addStaticItem(gameData, blockItem.id);
    });
    if (playerClass.items) {
        playerClass.items.forEach(function(item) {
            entity.inventory.addItem(gameData, item[0].id, item[1]);
        });
    }

    return entity;
}
