
var entityTemplateTree = function(entityId, pos, angle) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(pos, 0.001, 20.0, 20, 0.7);
    entity.physicsBody.angle = angle;
    entity.physicsBody.angleOld = angle;

    var treeSprite = new Sprite("tree.png");

    // Order of bodyparts is draw order
    // Parameters: sprite, offsetX, offsetY, offsetAngle, pivot(v2), parent name
    var bodyparts = {
        "body": new BodyPart(treeSprite, 0, 0, 0, null, null)
    };

    entity.bodyparts = new EntityBodyparts(bodyparts);
    entity.drawable = new EntityDrawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);
    entity.health = new EntityHealth(100, 100, 0.0);

    return entity;
}
