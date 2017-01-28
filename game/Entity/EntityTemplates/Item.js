import PhysicsBody from "game/Entity/PhysicsBody.js"
import Bodyparts from "game/Entity/Bodyparts.js"
import Drawable from "game/Entity/Drawable.js"
import Sprite from "engine/Animation/Sprite.js"
import BodyPart from "engine/Animation/BodyPart.js"
import Item from "game/Item.js"

export default function(itemId, amount) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new ItemComponent(itemId, amount);

    var itemType = Config.itemRegister[itemId];
    var bodySprite = new Sprite(itemType.name);
    var bodyparts = {
        "body": new BodyPart(bodySprite, 0, 0, 0),
        "text": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(0);

    return entity;
}
