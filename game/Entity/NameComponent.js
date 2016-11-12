
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
    if(!entity.drawable) return;
    if(entity.pixiText)
        entity.drawable.removeSprite("name");
    entity.pixiText = new PIXI.Text(this.entityName, { fontFamily: 'Monospace', fontSize: 15, fill: 0xffffff, align: 'center' });
    var sprite = new Sprite(null, entity.pixiText, true);
    entity.drawable.addSprite("name", sprite, v2.create(- entity.pixiText.width / 2, -60), false);
}