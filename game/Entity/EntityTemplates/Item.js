var fix = require("engine/Core/Fix.js")
var v2 = require("engine/Core/v2.js")

var Config = require("game/Config.js")
var PhysicsBody = require("game/Entity/PhysicsBody.js")
var Bodyparts = require("game/Entity/Bodyparts.js")
var Drawable = require("game/Entity/Drawable.js")
var Sprite = require("engine/Animation/Sprite.js")
var BodyPart = require("engine/Animation/BodyPart.js")

module.exports = function(itemId, amount) {
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
