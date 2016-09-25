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

        entity.drawable = new Drawable(stage, bodyparts, animationManager);
        player.text = new PIXI.Text("player:" + playerId + "entity:" + entityId, { fill: '#ffffff' });
        entity.drawable.addSprite("username", player.text, v2.create(- player.text.width / 2, -80), false);

        var healthbarSprite = new PIXI.Sprite(textures.healthbar);
        healthbarSprite.anchor.x = 0.5;
        healthbarSprite.anchor.y = 0.5;
        entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -50), false);
        player.health = healthbarSprite;
    }
    return { 'player': player, 'entity': entity };
}