import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";
import Config from "Game/Config.js";
import Global from "Game/Global.js";
import ItemRegister from "Game/Register/Item.js"
import EntityRegister from "Game/Register/Entity.js";

var Inventory = function(inventoryId, entityId, width, height) {
    this.items = [];
    this.inventoryId = inventoryId;
    this.entityId = entityId;
    this.width = width;
    this.height = height;
}
export default Inventory
EntityRegister.push(Inventory);

Inventory.createInventory = function(entityId, width, height) {
    if (!isServer)
        throw ("Tried to create inventory on client.")
    var inventoryId = Global.gameData.world.inventoryIdList.next();
    var inventory = new Inventory(inventoryId, entityId, width, height);
    Global.gameData.world.inventories[inventoryId] = inventory;
    if (!Global.gameData.world.entityInventories[entityId])
        Global.gameData.world.entityInventories[entityId] = [];
    Global.gameData.world.entityInventories[entityId].push(inventory);
    return inventory;
}

Inventory.prototype.destroy = function(entity) {
    if (isServer) {
        delete Global.gameData.world.inventories[this.inventoryId];
        var entityInventories = Global.gameData.world.entityInventories[entity.id];
        if (entityInventories) {
            var index = entityInventories.indexOf(this.inventoryId);
            if (index != -1)
                entityInventories.splice(index, 1);
        }
    }
}

Inventory.prototype.name = inventory.name; function inventory() { };

Inventory.prototype.serialize = function(byteArray, index) {
    Serialize.int32(byteArray, index, this.inventoryId);
    Serialize.int32(byteArray, index, this.width);
    Serialize.int32(byteArray, index, this.height);
    Serialize.int32(byteArray, index, this.items.length);
    for (var i = 0; i < this.items.length; ++i) {
        Serialize.int32(byteArray, index, this.items[i].id);
        Serialize.int32(byteArray, index, this.items[i].amount);
        var booleans = [this.items[i].equipped, this.items[i].static];
        Serialize.booleans(byteArray, index, booleans);
    }
}

Inventory.prototype.deserialize = function(byteArray, index) {
    this.inventoryId = Deserialize.int32(byteArray, index);
    this.width = Deserialize.int32(byteArray, index);
    this.height = Deserialize.int32(byteArray, index);
    this.items = [];
    var itemsLength = Deserialize.int32(byteArray, index);
    for (var i = 0; i < itemsLength; ++i) {
        var id = Deserialize.int32(byteArray, index);
        var amount = Deserialize.int32(byteArray, index);
        var booleans = Deserialize.booleans(byteArray, index);
        this.items[i] = {
            "id": id,
            "name": ItemRegister[id].name,
            "amount": amount,
            "equipped": booleans[0],
            "static": booleans[1]
        }
    }
}

Inventory.prototype.getSerializationSize = function() {
    return 16 + this.items.length * 9;
}

Inventory.prototype.sortItems = function() {
    this.items.sort(function(a, b) {
        var aType = ItemRegister[a.id];
        var bType = ItemRegister[b.id];

        if (aType.type == "tool" && bType.type != "tool")
            return -1;
        if (bType.type == "tool" && aType.type != "tool")
            return 1;

        if (a.id < b.id)
            return -1;

        if (a.id > b.id)
            return 1;

        return 0;
    });
}

Inventory.prototype.addItem = function(gameData, id, amount) {
    //console.log("adding " + amount + " " + id);
    var maxStack = ItemRegister[id].maxStackSize;
    for (var i = 0; i < this.width * this.height; ++i) {
        if (amount < 0) {
            console.log("inventory bad thing happens!");
            this.sortItems();
            return;
        }
        if (amount == 0) {
            this.sortItems();
            return;
        }
        if (i >= this.items.length || !this.items[i]) {
            var added = (amount <= maxStack ? amount : maxStack);
            this.items.push({ 'id': id, 'name': ItemRegister[id].name, 'amount': added });
            amount -= added;
            continue;
        }
        if (this.items[i].id === id && !this.items[i].static && this.items[i].amount < maxStack) {
            var maxToAdd = maxStack - this.items[i].amount;
            var added = (amount <= maxToAdd ? amount : maxToAdd);
            this.items[i].amount += added;
            amount -= added;
        }
    }
    this.sortItems();
}

Inventory.prototype.addStaticItem = function(gameData, id) {
    //console.log("adding " + amount + " " + id);
    this.items.push({ 'id': id, 'name': ItemRegister[id].name, 'amount': 1, 'static': true });
    this.sortItems();
}

Inventory.prototype.removeItem = function(gameData, id, amount) {
    var removedItems = [];
    for (var i = this.items.length - 1; i >= 0; --i) {
        var currentAmount = this.items[i].amount;
        if (this.items[i].id === id && !this.items[i].static && currentAmount >= 0) {
            var removed = (amount <= currentAmount ? amount : currentAmount);
            this.items[i].amount -= removed;
            if (this.items[i].amount <= 0) {
                removedItems.push([i, this.items[i]]);
                this.items.splice(i, 1);
            }
            amount -= removed;
        }
        if (amount < 0)
            console.log("inventory bad thing happens!");
        if (amount == 0) {
            this.sortItems();
            return removedItems;
        }
    }
    this.sortItems();
    return removedItems;
}

Inventory.prototype.hasItem = function(id, amount) {
    var count = 0;
    for (var i = 0; i < this.items.length; ++i) {
        if (this.items[i].id === id) {
            count += this.items[i].amount;
            if (count >= amount)
                return true;
        }
    }
    return false;
}

Inventory.prototype.getAmountById = function(id) {
    var amount = 0;
    for (var i = 0; i < this.items.length; ++i) {
        if (this.items[i].id === id)
            amount += this.items[i].amount;
    }
    return amount;
}

Inventory.prototype.removeStack = function(id) {
    var item = this.items[id];
    delete this.items[id];
    this.items.splice(id, 1);
    this.sortItems(Global.gameData);
    return item;
}

Inventory.prototype.dequipAll = function(gameData, type, arg) {
    var dequippedItems = [];
    for (var i = 0; i < this.items.length; ++i) {
        var itemType = ItemRegister[this.items[i].id];
        if (itemType.type == type && this.items[i].equipped) {
            this.items[i].equipped = false;
            dequippedItems.push([i, this.items[i].id]);
        }
    }
    this.sortItems(Global.gameData);
    return dequippedItems;
}

Inventory.prototype.getEquippedItemType = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = ItemRegister[item.id];
            if (itemType.type == type)
                return itemType;
        }
    }
}

Inventory.prototype.getEquippedStackId = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = ItemRegister[item.id];
            if (itemType.type == type)
                return i;
        }
    }
}

Inventory.prototype.getEquippedItem = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = ItemRegister[item.id];
            if (itemType.type == type)
                return item;
        }
    }
}

Inventory.prototype.findTool = function(itemFunction) {
    for (var i = 0; i < this.items.length; i++) {
        var itemType = ItemRegister[this.items[i].id];
        if (itemType.itemFunction == itemFunction)
            return i;
    }
    return -1;
}
