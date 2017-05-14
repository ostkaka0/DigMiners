
var entityTemplatePlayerZombie = function(playerId, entityId, name, pos, playerClass) {
    var entity = entityTemplateZombie(entityId, pos, EntityTeam.Enum.Zombie);
    entity.behaviourContainer = undefined;
    entity.controlledByPlayer = new EntityControlledByPlayer(playerId);
    entity.name = new EntityName(name);
    return entity;
}

var entityTemplatePlayer = function(playerId, entityId, name, playerClass, teamId = 0) {
    var entity = {};
    entity.controlledByPlayer = new EntityControlledByPlayer(playerId);
    entity.physicsBody = new EntityPhysicsBody(v2.create(0, 0), 0.001, 20.0, 1.0, 0.45);
    entity.movement = new EntityMovement((playerClass ? playerClass.speed : 1) * 30.0);
    entity.name = new EntityName((name ? name : "no name"));
    entity.inventory = EntityInventory.createInventory(entityId, 10, 3);
    entity.equippedItems = new EntityEquippedItems();
    entity.potionEffects = new EntityPotionEffects();
    entity.interacter = new EntityInteracter(); // Server only used component

    var teamEnum = teamId;


    // Order of bodyParts is draw order
    // Parameters: sprite, offsetX, offsetY, offsetAngle, pivot(v2), parent name
    if (!isServer) {
        var feetSprite = new Sprite(Client.textures["feet.png"], null, 0, [0., 0., 0.8, 0.8, 0.]);
        var rightArmSprite = new Sprite(Client.textures["rightArm.png"]);
        var leftArmSprite = new Sprite(Client.textures["leftArm.png"]);
        var headSprite = new Sprite(Client.textures["head.png"]);
        var strHatSprite = "";
        if (teamEnum == EntityTeam.Enum.Blue) strHatSprite = "egg.png";
        if (teamEnum == EntityTeam.Enum.Red) strHatSprite = "bigEgg.png";
        var hatSprite = new Sprite(Client.textures[strHatSprite]);

        var bodyParts = {
            body: new BodyPart(null, Mat3.scale([1.5, 1.5])),
            head: new BodyPart(headSprite, Mat3.scale([0.8, 0.8])),
            leftArm: new BodyPart(leftArmSprite, Mat3.translate([0, -8])),// new DrawTransform([10, 23], 0, [1, 1], [0.5, 0.5])),
            rightArm: new BodyPart(rightArmSprite, Mat3.translate([0, 8])),// new DrawTransform([10, 11], 0, [1, 1], [0.5, 0.5])),
            feet: new BodyPart(feetSprite),
            tool: new BodyPart(null, Mat3.translate([12, 8])),
            hat: new BodyPart(null),
        }
        bodyParts.body.children.push(bodyParts.feet);
        bodyParts.body.children.push(bodyParts.leftArm);
        bodyParts.body.children.push(bodyParts.rightArm);
        bodyParts.body.children.push(bodyParts.head);
        bodyParts.rightArm.children.push(bodyParts.tool);
        bodyParts.head.children.push(bodyParts.hat);
        /*var bodyParts = {
            "player": new BodyPart(new Sprite(), 0, 0, 0, null, null),
            "feet": new BodyPart(feetSprite, 0, 0, 0, null, "player"),
            "leftArm": new BodyPart(leftArmSprite, 5, -4, 0, [10, 23], "body"),
            "tool": new BodyPart(new Sprite(), -10, 15, 0, null, "rightArm"),
            "rightArm": new BodyPart(rightArmSprite, 5, 4, 0, [10, 11], "body"),
            "body": new BodyPart(new Sprite(), 0, 0, 0, null, "player"),
            "head": new BodyPart(headSprite, 1, 0, 0, null, "player"),
            "hat": new BodyPart(hatSprite, 1, 0, 0, null, "player")
        };*/

        entity.bodyParts = new EntityBodyParts(bodyParts, bodyParts.body);
        entity.drawable = new EntityDrawable(1);
        var healthbarSprite = new Sprite(Client.textures["healthbar.png"]);
        entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);
    }
    entity.health = new EntityHealth(playerClass ? playerClass.health : 100, playerClass ? playerClass.health : 100, playerClass ? playerClass.armor : 0);
    entity.team = new EntityTeam(teamEnum);
    entity.ammo = new EntityAmmo();

    if (playerClass) {
        playerClass.weapons.forEach(function(weapon) {
            entity.inventory.addItem(weapon.id);
            entity.ammo[weapon.id] = weapon.ammoMax || 0;
        });

        playerClass.blocks.forEach(function(blockItem) {
            entity.inventory.addItem(blockItem.id);
        });
        if (playerClass.items) {
            playerClass.items.forEach(function(item) {
                entity.inventory.addItem(item[0].id, item[1]);
            });
            if (playerClass.items) {
                playerClass.items.forEach(function(item) {
                    entity.inventory.addItem(gameData, item[0].id, item[1]);
                });
            }
        }
    }

    return entity;
}

ObjectRegister.add(EntityTemplateRegister, entityTemplatePlayer);
