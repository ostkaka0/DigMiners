import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";

import Config from "Game/Config.js";
import ItemRegister from "Engine/Register/Item.js"
import PhysicsBody from "Game/Entity/PhysicsBody.js";
import Bodyparts from "Game/Entity/Bodyparts.js";
import Drawable from "Game/Entity/Drawable.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";

export default function(itemId, amount) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new ItemComponent(itemId, amount);

    var itemType = ItemRegister[itemId];
    var bodySprite = new Sprite(itemType.name);
    var bodyparts = {
        "body": new BodyPart(bodySprite, 0, 0, 0),
        "text": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(0);

    return entity;
}
