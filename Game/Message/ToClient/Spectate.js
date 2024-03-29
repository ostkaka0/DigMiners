




;

var MessageSpectate = function(entityId) {
    this.entityId = entityId;
}
global.MessageSpectate = MessageSpectate;
TypeRegister.add(RegisterMessage.ToClient, MessageSpectate);

MessageSpectate.prototype.execute = function() {
    global.spectateEntity = World.entities.objects[this.entityId];
    World.events.trigger("spectate", global.spectateEntity);
}

MessageSpectate.prototype.send = function(socket) {
    var serializationSize = 4;
    var byteArray = new Buffer(serializationSize);
    var counter = new IndexCounter();
    Serialize.int32(byteArray, counter, this.entityId);
    socket.emit(this.idString, byteArray);
}

MessageSpectate.prototype.receive = function(byteArray) {
    byteArray = new Uint8Array(byteArray);
    var counter = new IndexCounter();
    this.entityId = Deserialize.int32(byteArray, counter);
}
