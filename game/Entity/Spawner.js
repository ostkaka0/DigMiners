import { Serialize, Deserialize } from "engine/Serialization.js"
import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import Event from "engine/Core/Event.js"
import Global from "game/Global.js"
import { Team, Teams } from "game/Entity/Team.js"
import CommandEntitySpawn from "game/Command/CommandEntitySpawn.js"
import { CommandEntityInventory, InventoryActions } from "game/Command/CommandEntityInventory.js"
import CommandEntityEquipItem from "game/Command/CommandEntityEquipItem.js"
import Items from "game/Items.js"

var Spawner = function(entityTemplate, pos, maxEntities, radius, duration, items, equippedItemId, randomDuration, teamId) {
    this.entityTemplate = entityTemplate;
    this.pos = v2.clone(pos);
    this.maxEntities = maxEntities;
    this.radius = radius || 1.0;
    this.duration = duration || 240;
    this.items = items || [{id: Items.RustyShovel.id, quantity: 1}];
    this.equippedItemId = (equippedItemId != undefined)? equippedItemId : null;
    this.randomDuration = (randomDuration != undefined)? randomDuration : 0.5;
    this.teamId = teamId || Teams.None;

    this.numEntities = 0;
    this.entityTable = {};
    this.nextSpawnTickId = Global.gameData.world.tickId;

    this.initialized = false;
}
export default Spawner

Spawner.prototype.name = spawner.name; function spawner() { };

Spawner.prototype.update = function(entity) {
    if (this.numEntities >= this.maxEntities) return;
    if (Global.gameData.world.tickId - this.nextSpawnTickId <= 0) return;
    if (!isServer) return;

    // Lazy init
    if (!this.initialized) {
        this.initialized = true;
        Event.subscribe(Global.gameData.world.entityWorld.onRemove, this, function(entity) {
            if (this.entityTable[entity.id] == undefined) return;

            if (this.numEntities == this.maxEntities)
                this.updateDuration();

            this.entityTable[entity.id] = undefined;
            this.numEntities--;
        }.bind(this));
    };

    // Spawn entity
    var monsterEntityId = Global.gameData.world.idList.next();
    var monster = this.entityTemplate(monsterEntityId, [this.pos[0] + this.radius * (-1 + 2 *Math.random()), this.pos[1] + this.radius * (-1 + 2 *Math.random())], this.teamId);
    sendCommand(new CommandEntitySpawn(Global.gameData, monster, monsterEntityId));

    // Add items
    if (this.items) {
        this.items.forEach(function(item) {
            sendCommand(new CommandEntityInventory(monsterEntityId, InventoryActions.ADD_ITEM, item.id, item.quantity | 1));
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
    Event.unsubscribe(Global.gameData.world.entityWorld.onRemove, this);
}

Spawner.prototype.updateDuration = function() {
    this.nextSpawnTickId = Global.gameData.world.tickId + this.duration + Math.floor(this.randomDuration * this.duration * (-0.5 + Math.random()));
}
