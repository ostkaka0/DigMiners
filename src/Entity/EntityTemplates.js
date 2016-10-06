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
    var shovelSprite = new Sprite("rustyShovel");

    var bodyparts = {
        "feet": new BodyPart(feetSprite, 0, 0, 0),
        "body": new BodyPart(null, 0, 0, 0, null, {
            "rightArm": new BodyPart(rightArmSprite, 5, 4, 0, [10, 11], {
                "itemHolder": new BodyPart(shovelSprite, -10, 15, 0, [32, 16])
            }),
            "leftArm": new BodyPart(leftArmSprite, 5, -16, 0, [10, 11])
        }),
        "head": new BodyPart(headSprite, 1, 0, 0)
    };

    entity.drawable = new Drawable(gameData, bodyparts, 1);
    var healthbarSprite = new Sprite("healthbar", null, true);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(-32, -50), false);
    player.health = healthbarSprite;
    return { 'player': player, 'entity': entity };
}

entityTemplates.item = function(entityId, itemId, amount, gameData) {
    var entity = gameData.entityWorld.add({}, entityId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new ComponentItem(itemId, amount);

    var itemType = gameData.itemRegister[itemId];
    var bodySprite = new Sprite(itemType.texture);
    var bodyparts = {
        "body": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.drawable = new Drawable(gameData, bodyparts, 0);
    return entity;
}
