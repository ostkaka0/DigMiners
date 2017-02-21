import {Serialize} from "Engine/Core/Serialization.js";
import {Deserialize} from "Engine/Core/Serialization.js";
import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Event from "Engine/Core/Event.js";

import Team from "Game/Entity/Team.js";
import CommandEntitySpawn from "Game/Command/CommandEntitySpawn.js";
import CommandEntityInventory from "Game/Command/CommandEntityInventory.js";
import CommandEntityEquipItem from "Game/Command/CommandEntityEquipItem.js";
import Items from "Game/Items.js";
import EntityRegister from "Engine/Register/Entity.js";

var Spawner = function(entityTemplate, pos, maxEntities, radius, duration, items, equippedItemId, randomDuration, teamId) {
    this.entityTemplate = entityTemplate;
    this.pos = v2.clone(pos);
    this.maxEntities = maxEntities;
    this.radius = radius || 1.0;
    this.duration = duration || 240;
    this.items = items || [{id: Items.Types.RustyShovel.id, quantity: 1}];
    this.equippedItemId = (equippedItemId != undefined)? equippedItemId : null;
    this.randomDuration = (randomDuration != undefined)? randomDuration : 0.5;
    this.teamId = teamId || Team.Enum.None;

    this.numEntities = 0;
    this.entityTable = {};
    this.nextSpawnTickId = global.gameData.world.tickId;

    this.initialized = false;
}
export default Spawner
EntityRegister.push(Spawner);

Spawner.prototype.name = spawner.name; function spawner() { };

Spawner.prototype.update = function(entity) {
    if (this.numEntities >= this.maxEntities) return;
    if (global.gameData.world.tickId - this.nextSpawnTickId <= 0) return;
    if (!isServer) return;

    // Lazy init
    if (!this.initialized) {
        this.initialized = true;
        Event.subscribe(global.gameData.world.entityWorld.onRemove, this, function(entity) {
            if (this.entityTable[entity.id] == undefined) return;

            if (this.numEntities == this.maxEntities)
                this.updateDuration();

            this.entityTable[entity.id] = undefined;
            this.numEntities--;
        }.bind(this));
    };

    // Spawn entity
    var monsterEntityId = global.gameData.world.idList.next();
    var monster = this.entityTemplate(monsterEntityId, [this.pos[0] + this.radius * (-1 + 2 *Math.random()), this.pos[1] + this.radius * (-1 + 2 *Math.random())], this.teamId);
    sendCommand(new CommandEntitySpawn(global.gameData, monster, monsterEntityId));

    // Add items
    if (this.items) {
        this.items.forEach(function(item) {
            sendCommand(new CommandEntityInventory(monsterEntityId, CommandEntityInventory.Actions.ADD_ITEM, item.id, item.quantity | 1));
        });
    }

    // Equip Item
    if (this.equippedItemId != null)
        sendCommand(new CommandEntityEquipItem(monsterEntityId, 0, this.equippedItemId, true));
    else if(this.items.length > 0)
        sendCommand(new CommandEntityEquipItem(monsterEntityId, 0, this.items[0].id, true));

    this.updateDuration();
    this.entityTable[monsterEntityId] = monster;
    this.numEntities++;
}

Spawner.prototype.onDestroy = function(entity) {
    Event.unsubscribe(global.gameData.world.entityWorld.onRemove, this);
}

Spawner.prototype.updateDuration = function() {
    this.nextSpawnTickId = global.gameData.world.tickId + this.duration + Math.floor(this.randomDuration * this.duration * (-0.5 + Math.random()));
}
