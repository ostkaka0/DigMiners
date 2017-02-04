import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import Event from "Engine/Core/Event.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";
import CommandRegister from "Game/Register/Command.js";
import Health from "Game/Entity/Health.js";

var CommandEntityHealthChange = function(entityId, healthChange) {
    this.entityId = entityId;
    this.healthChange = fix.toFix(healthChange);
}
export default CommandEntityHealthChange;
CommandRegister.push(CommandEntityHealthChange);

CommandEntityHealthChange.prototype.execute = function() {
    var entity = Global.gameData.world.entityWorld.objects[this.entityId];
    if (!entity || !entity.health) return;
    if (entity.movement)
        entity.movement.disabledCooldown = 40;
    entity.health.health = (entity.health.health + this.healthChange < 0 ? 0 : entity.health.health + this.healthChange);
    Event.trigger(Health.Events.onChange, entity);
    if (entity.health.health <= 0)
        Event.trigger(Health.Events.onDeath, entity);
}

CommandEntityHealthChange.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.entityId);
    Serialize.fix(byteArray, index, this.healthChange);
}

CommandEntityHealthChange.prototype.deserialize = function(byteArray, index) {
    this.entityId = Deserialize.int32(byteArray, index);
    this.healthChange = Deserialize.fix(byteArray, index);
}

CommandEntityHealthChange.prototype.getSerializationSize = function() {
    return 8;
}
