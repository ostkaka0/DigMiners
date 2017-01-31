var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")
var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize
var IndexCounter = require("Engine/IndexCounter.js")

var Global = require("Game/Global.js")
var Config = require("Game/Config.js")
var CommandEntityInventory = require("Game/Command/CommandEntityInventory.js")
var CommandPlayerOreInventory= require("Game/Command/CommandPlayerOreInventory.js")
var CommandEntityDestroy = require("Game/Command/CommandEntityDestroy.js")

var MessageRequestItemPickup = function(entityId) {
    this.entityId = entityId;
}
module.exports = MessageRequestItemPickup

MessageRequestItemPickup.prototype.execute = function(gameData, player) {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    if (entity.item && !entity.pickedUp) {
        var playerEntity = Global.gameData.world.entityWorld.objects[player.entityId];
        if (!playerEntity) return;
        var physicsBody = entity.physicsBody;
        var playerPhysicsBody = playerEntity.physicsBody;

        var dis = v2.distance(physicsBody.getPos(), playerPhysicsBody.getPos());
        if (dis <= Config.itemPickupDistance + 0.1) {
            entity.pickedUp = true;
            // Add item to player inventory
            sendCommand(new CommandEntityInventory(player.entityId, CommandEntityInventory.Actions.ADD_ITEM, entity.item.itemId, entity.item.amount));
            // Destroy entity
            sendCommand(new CommandEntityDestroy(this.entityId));
        }
    }
}

MessageRequestItemPickup.prototype.send = function(socket) {
    socket.emit(this.idString, this.entityId);
}

MessageRequestItemPickup.prototype.receive = function(gameData, data) {
    this.entityId = data;
}
