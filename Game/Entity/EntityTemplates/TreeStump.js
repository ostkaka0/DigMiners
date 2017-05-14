
var entityTemplateTreeStump = function(entityId, pos, angle) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(pos, 0.001, 20.0, 20, 0.7);
    entity.physicsBody.angle = angle;
    entity.physicsBody.angleOld = angle;

    var sprite = new Sprite("stump.png");

    // Order of bodyparts is draw order
    // Parameters: sprite, offsetX, offsetY, offsetAngle, pivot(v2), parent name
    var bodyparts = {
        "body": new BodyPart(sprite, 0, 0, 0, null, null)
    };

    entity.bodyparts = new EntityBodyparts(bodyparts);
    entity.drawable = new EntityDrawable(2);

    return entity;
}
