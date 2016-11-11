
Name = function(name) {
    this.name = name;
}

Name.prototype.name = name.name; function name() { };

Name.prototype.serialize = function(byteArray, index) {
    serializeUTF8(byteArray, index, this.name);
}

Name.prototype.deserialize = function(byteArray, index) {
    this.name = deserializeUTF8(byteArray, index);
}

Name.prototype.getSerializationSize = function() {
    return getUTF8SerializationSize(this.name);
}

Name.prototype.destroy = function(entity) {

}

Name.prototype.applyName = function(entity) {
    if(entity.pixiText)
        entity.drawable.removeSprite("name");
    entity.pixiText = new PIXI.Text(this.name, { fontFamily: 'Monospace', fontSize: 15, fill: 0xffffff, align: 'center' });
    var sprite = new Sprite(null, entity.pixiText, true);
    entity.drawable.addSprite("name", sprite, v2.create(- entity.pixiText.width / 2, -60), false);
}