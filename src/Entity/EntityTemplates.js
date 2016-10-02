entityTemplates = {};

entityTemplates.player = function(playerId, entityId, name, gameData) {
    var player = gameData.playerWorld.add(new Player(playerId, entityId, name), playerId);
    var entity = gameData.entityWorld.add({}, entityId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);
    entity.movement = new Movement(50.0);

    if(!isServer) {
        var feetSprite = new PIXI.Sprite(textures.feet);
        feetSprite.anchor.x = 0.5;
        feetSprite.anchor.y = 0.5;

        var rightArmSprite = new PIXI.Sprite(textures.rightArm);
        rightArmSprite.anchor.x = 0.5;
        rightArmSprite.anchor.y = 1.0;

        var leftArmSprite = new PIXI.Sprite(textures.leftArm);
        leftArmSprite.anchor.x = 0.5;
        leftArmSprite.anchor.y = 0.0;

        var headSprite = new PIXI.Sprite(textures.head);
        headSprite.anchor.x = 0.5;
        headSprite.anchor.y = 0.5;

        var shovelSprite = new PIXI.Sprite(textures.shovel);
        shovelSprite.anchor.x = 1.0;
        shovelSprite.anchor.y = 0.5;

        var bodyparts = {
            "feet": new BodyPart(feetSprite, 0, 0, 0, []),
            "itemHolder": new BodyPart(shovelSprite, 5, 40, Math.PI / 2, []),
            "rightArm": new BodyPart(rightArmSprite, 0, 37, 0, []),
            "leftArm": new BodyPart(leftArmSprite, 0, -37, 0, []),
            "head": new BodyPart(headSprite, 0, 0, 0, [])
        };

        entity.drawable = new Drawable(bodyparts, animationManager, 1);
        player.setName(name + " player:" + playerId + "entity:" + entityId, gameData);

        var healthbarSprite = new PIXI.Sprite(textures.healthbar);
        entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(-32, -50), false);
        player.health = healthbarSprite;
    }
    return { 'player': player, 'entity': entity };
}

entityTemplates.item = function(entityId, itemId, amount, gameData) {
    var entity = gameData.entityWorld.add({}, entityId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);

    entity.itemId = itemId;
    entity.amount = amount;
    entity.isItem = true;

    if(!isServer) {
        var itemType = gameData.itemRegister[itemId];
        var bodySprite = new PIXI.Sprite(textures[itemType.texture]);
        bodySprite.anchor.x = 0.5;
        bodySprite.anchor.y = 0.5;
        var bodyparts = {
            "body": new BodyPart(bodySprite, 0, 0, 0, [])
        };
        entity.drawable = new Drawable(bodyparts, animationManager, 0);
    }
    return entity;
}
