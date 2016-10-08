entityTemplates = {};

entityTemplates.player = function(playerId, entityId, name, gameData) {
    var player = gameData.playerWorld.add(new Player(playerId, entityId, name), playerId);
    var entity = gameData.entityWorld.add({}, entityId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);
    entity.movement = new Movement(50.0);

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
        "leftArm": new BodyPart(leftArmSprite, 5, -16, 0, [10, 11], "body"),
        "body": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "head": new BodyPart(headSprite, 1, 0, 0, null, null),
        "hat": new BodyPart(new Sprite(), 1, 0, 0, null, null)
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar", null, true);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(-32, -40), false);
    player.health = healthbarSprite;
    return { 'player': player, 'entity': entity };
}

entityTemplates.item = function(entityId, itemId, amount, gameData) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new ComponentItem(itemId, amount);

    var itemType = gameData.itemRegister[itemId];
    var bodySprite = new Sprite(itemType.texture);
    var bodyparts = {
        "body": new BodyPart(bodySprite, 0, 0, 0),
        "text": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(0);
    gameData.entityWorld.add(entity, entityId);
    return entity;
}
