import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import EntityRegister from "Engine/Register/Entity.js";

var Health = function(health, maxHealth, armor) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.armor = armor;
}
Health.Events = {};
Health.Events.onChange = [];
Health.Events.onDeath = [];
export default Health;
EntityRegister.push(Health);

Health.prototype.name = health.name; function health() { };

Health.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.health);
    Serialize.int32(byteArray, index, this.maxHealth);
}

Health.prototype.deserialize = function(byteArray, index) {
    this.health = Deserialize.int32(byteArray, index);
    this.maxHealth = Deserialize.int32(byteArray, index);
}

Health.prototype.getSerializationSize = function() {
    return 8;
}

Health.prototype.destroy = function(entity) {

}
