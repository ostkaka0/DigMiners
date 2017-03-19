






var EntityName = function(entityName) {
    this.entityName = entityName + "";
}
global.EntityName = EntityName;
RegisterEntity.push(EntityName);

EntityName.prototype.name = name.name; function name() { };

EntityName.prototype.serialize = function(byteArray, index) {
    Serialize.utf8(byteArray, index, this.entityName);
}

EntityName.prototype.deserialize = function(byteArray, index) {
    this.entityName = Deserialize.utf8(byteArray, index);
}

EntityName.prototype.getSerializationSize = function() {
    return Serialize.utf8Size(this.entityName);
}

EntityName.prototype.destroy = function(entity) {

}

EntityName.prototype.applyName = function(entity) {
    if (!entity.drawable) return;
    if (entity.textSprite)
        entity.drawable.removeSprite("name");
    var sprite = new TextSprite(this.entityName, "Monospace", 15, "#ffffff");
    entity.drawable.addSprite("name", sprite, v2.create(0, -47), false);
}
