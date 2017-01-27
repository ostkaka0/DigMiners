import { Serialize, Deserialize } from "engine/Serialization.js"

var CommandEntityDestroy = function(entityId) {
    this.entityId = entityId;
}
export default CommandEntityDestroy

CommandEntityDestroy.prototype.execute = function() {
    var entity = gameData.world.entityWorld.objects[this.entityId];
    if (!entity) return;
    gameData.world.entityWorld.remove(entity);
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
