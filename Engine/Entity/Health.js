import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import RegisterEntity from "Engine/Register/Entity.js";

var EntityHealth = function(health, maxHealth, armor) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.armor = armor;
}
EntityHealth.Events = {};
EntityHealth.Events.onChange = [];
EntityHealth.Events.onDeath = [];
export default EntityHealth;
RegisterEntity.push(EntityHealth);

EntityHealth.prototype.name = health.name; function health() { };

EntityHealth.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.health);
    Serialize.int32(byteArray, index, this.maxHealth);
}

EntityHealth.prototype.deserialize = function(byteArray, index) {
    this.health = Deserialize.int32(byteArray, index);
    this.maxHealth = Deserialize.int32(byteArray, index);
}

EntityHealth.prototype.getSerializationSize = function() {
    return 8;
}

EntityHealth.prototype.destroy = function(entity) {

}
