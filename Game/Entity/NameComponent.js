import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import TextSprite from "Engine/Animation/TextSprite.js";
import EntityRegister from "Engine/Register/Entity.js";

var NameComponent = function(entityName) {
    this.entityName = entityName + "";
}
export default NameComponent;
EntityRegister.push(NameComponent);

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
