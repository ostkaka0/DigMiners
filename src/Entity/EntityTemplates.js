entityTemplates = {};

entityTemplates.player = function(playerId, entityId, name, gameData) {
    var player = gameData.playerWorld.add(new Player(playerId, entityId, name), playerId);
    var entity = gameData.entityWorld.add({}, entityId);
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);
    entity.movement = new Movement(50.0);

    if(!isServer) {
        var sprite = new PIXI.Sprite(textures.feet);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        var bodySprite = new PIXI.Sprite(textures.dig);
        bodySprite.anchor.x = 0.5;
        bodySprite.anchor.y = 0.5;

        var bodyparts = {
            "feet": {
                "sprite": sprite
            },
            "body": {
                "sprite": bodySprite
            }
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
        var sprite = new PIXI.Sprite(textures[itemType.texture]);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        var bodyparts = {
            "body": {
                "sprite": sprite
            },
        };
        entity.drawable = new Drawable(bodyparts, animationManager, 0);
    }
    return entity;
}
