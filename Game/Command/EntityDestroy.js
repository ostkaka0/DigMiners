
var CommandEntityDestroy = function(entityId) {
    this.entityId = entityId;
}
TypeRegister.add(RegisterCommand, CommandEntityDestroy);

CommandEntityDestroy.prototype.execute = function() {
    var entity = World.entities.objects[this.entityId];
    if (!entity) return;
    World.entities.remove(entity);
}

CommandEntityDestroy.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
}

CommandEntityDestroy.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
}

CommandEntityDestroy.prototype.getSerializationSize = function() {
    return 4;
}
