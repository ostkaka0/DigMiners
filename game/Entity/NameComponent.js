import { Serialize, Deserialize } from "engine/Serialization.js"
import TextSprite from "engine/Animation/TextSprite.js"

var NameComponent = function(entityName) {
    this.entityName = entityName + "";
}
export default NameComponent

NameComponent.prototype.name = nameComponent.name; function nameComponent() { };

NameComponent.prototype.serialize = function(byteArray, index) {
    Serialize.utf8(byteArray, index, this.entityName);
}

NameComponent.prototype.deserialize = function(byteArray, index) {
    this.entityName = Deserialize.utf8(byteArray, index);
}

NameComponent.prototype.getSerializationSize = function() {
    return Serialize.utf8Size(this.entityName);
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
