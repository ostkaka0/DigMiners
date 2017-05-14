




;

var MessageRequestClickEntity = function(entityId, clickType) {
    this.entityId = entityId;
    this.clickType = clickType;
}
global.MessageRequestClickEntity = MessageRequestClickEntity;
TypeRegister.add(RegisterMessage.ToServer, MessageRequestClickEntity);

MessageRequestClickEntity.prototype.execute = function(player) {
    var entity = World.entities.objects[this.entityId];
    if (!entity) return;
    console.log("player " + player.playerId + " clicked entity " + this.entityId + ", clicktype: " + this.clickType);
}

MessageRequestClickEntity.prototype.send = function(socket) {
    socket.emit(this.idString, [this.entityId, this.clickType]);
}

MessageRequestClickEntity.prototype.receive = function(data) {
    this.entityId = data[0];
    this.clickType = data[1];
}
