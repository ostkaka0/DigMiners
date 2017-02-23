import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";

import Config from "Game/Config.js";
import RegisterItem from "Engine/Register/Item.js"
import EntityPhysicsBody from "Engine/Entity/PhysicsBody.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityDrawable from "Engine/Entity/Drawable.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";

export default function(itemId, amount) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(0, 0), 0.01);

    entity.item = new EntityItem(itemId, amount);

    var itemType = RegisterItem[itemId];
    var bodySprite = new Sprite(itemType.name);
    var bodyparts = {
        "body": new BodyPart(bodySprite, 0, 0, 0),
        "text": new BodyPart(bodySprite, 0, 0, 0)
    };
    entity.bodyparts = new EntityBodyparts(bodyparts);
    entity.drawable = new EntityDrawable(0);

    return entity;
}
