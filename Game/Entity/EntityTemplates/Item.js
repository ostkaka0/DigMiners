
var entityTemplateItem = function(itemId, amount) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new EntityItem(itemId, amount);

    var itemType = RegisterItem[itemId];
    var bodySprite = new Sprite(itemType.name);
    var bodyParts = {
        "body": new BodyPart(bodySprite, 0, 0, 0),
        "text": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.bodyParts = new EntityBodyparts(bodyParts);
    entity.drawable = new EntityDrawable(0);

    return entity;
}

ObjectRegister.add(EntityTemplateRegister, entityTemplateItem);
