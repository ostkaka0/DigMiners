import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import EntityRegister from "Game/Entity/Register.js";

var ItemComponent = function(itemId, amount) {
    this.itemId = itemId;
    this.amount = amount;
    this.dropped = new Date();
}
export default ItemComponent
EntityRegister.push(ItemComponent);

ItemComponent.prototype.name = item.name; function item() { };

ItemComponent.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.itemId);
    Serialize.int32(byteArray, index, this.amount);
}

ItemComponent.prototype.deserialize = function(byteArray, index) {
    this.itemId = Deserialize.int32(byteArray, index);
    this.amount = Deserialize.int32(byteArray, index);
    this.dropped = new Date();
}

ItemComponent.prototype.getSerializationSize = function() {
    return 8;
}

ItemComponent.prototype.destroy = function(entity) {

}
