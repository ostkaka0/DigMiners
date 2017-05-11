
var EntityResource = function(type) {
    this.type = type;
}
TypeRegister.add(RegisterEntity, EntityResource);

EntityResource.prototype.name = entityResource.name; function entityResource() { };

EntityResource.prototype.serialize = function(byteArray, index) {
    Serialize.int8(byteArray, index, this.type);
}

EntityResource.prototype.deserialize = function(byteArray, index) {
    this.type = Deserialize.int8(byteArray, index);
}

EntityResource.prototype.getSerializationSize = function() {
    return 1;
}

var ResourceType = {
    TREE: 0,
    LOG: 1
}