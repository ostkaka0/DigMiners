var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")

var Config = require("Game/Config.js")
var PhysicsBody = require("Game/Entity/PhysicsBody.js")
var Bodyparts = require("Game/Entity/Bodyparts.js")
var Drawable = require("Game/Entity/Drawable.js")
var Sprite = require("Engine/Animation/Sprite.js")
var BodyPart = require("Engine/Animation/BodyPart.js")

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
