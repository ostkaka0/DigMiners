
NameComponent = function(entityName) {
    this.entityName = entityName + "";
}

NameComponent.prototype.name = nameComponent.name; function nameComponent() { };

NameComponent.prototype.serialize = function(byteArray, index) {
    serializeUTF8(byteArray, index, this.entityName);
}

NameComponent.prototype.deserialize = function(byteArray, index) {
    this.entityName = deserializeUTF8(byteArray, index);
}

NameComponent.prototype.getSerializationSize = function() {
    return getUTF8SerializationSize(this.entityName);
}

NameComponent.prototype.destroy = function(entity) {

}

NameComponent.prototype.applyName = function(entity) {
    if (!entity.drawable) return;
    if (entity.textSprite)
        entity.drawable.removeSprite("name");
    var sprite = new TextSprite(this.entityName, "Monospace", 15, "#ffffff");
    entity.drawable.addSprite("name", sprite, v2.create(0, -47), false);
}