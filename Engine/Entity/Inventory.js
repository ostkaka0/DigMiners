




var EntityInventory = function(inventoryId, entityId, width, height) {
    this.items = [];
    this.inventoryId = inventoryId;
    this.entityId = entityId;
    this.width = width;
    this.height = height;
}
global.EntityInventory = EntityInventory;
RegisterEntity.push(EntityInventory);

EntityInventory.createInventory = function(entityId, width, height) {
    if (!isServer)
        throw ("Tried to create inventory on client.")
    var inventoryId = global.gameData.world.inventoryIdList.next();
    var inventory = new EntityInventory(inventoryId, entityId, width, height);
    global.gameData.world.inventories[inventoryId] = inventory;
    if (!global.gameData.world.entityInventories[entityId])
        global.gameData.world.entityInventories[entityId] = [];
    global.gameData.world.entityInventories[entityId].push(inventory);
    return inventory;
}

EntityInventory.prototype.destroy = function(entity) {
    if (isServer) {
        delete global.gameData.world.inventories[this.inventoryId];
        var entityInventories = global.gameData.world.entityInventories[entity.id];
        if (entityInventories) {
            var index = entityInventories.indexOf(this.inventoryId);
            if (index != -1)
                entityInventories.splice(index, 1);
        }
    }
}

EntityInventory.prototype.name = inventory.name; function inventory() { };

EntityInventory.prototype.serialize = function(byteArray, index) {
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

EntityInventory.prototype.deserialize = function(byteArray, index) {
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
            "name": RegisterItem[id].name,
            "amount": amount,
            "equipped": booleans[0],
            "static": booleans[1]
        }
    }
}

EntityInventory.prototype.getSerializationSize = function() {
    return 16 + this.items.length * 9;
}

EntityInventory.prototype.sortItems = function() {
    this.items.sort(function(a, b) {
        var aType = RegisterItem[a.id];
        var bType = RegisterItem[b.id];

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

EntityInventory.prototype.addItem = function(gameData, id, amount) {
    //console.log("adding " + amount + " " + id);
    var maxStack = RegisterItem[id].maxStackSize;
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
            this.items.push({ id: id, name: RegisterItem[id].name, amount: added });
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

EntityInventory.prototype.addStaticItem = function(gameData, id) {
    //console.log("adding " + amount + " " + id);
    this.items.push({ id: id, name: RegisterItem[id].name, amount: 1, static: true });
    this.sortItems();
}

EntityInventory.prototype.removeItem = function(gameData, id, amount) {
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

EntityInventory.prototype.hasItem = function(id, amount) {
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

EntityInventory.prototype.getAmountById = function(id) {
    var amount = 0;
    for (var i = 0; i < this.items.length; ++i) {
        if (this.items[i].id === id)
            amount += this.items[i].amount;
    }
    return amount;
}

EntityInventory.prototype.removeStack = function(id) {
    var item = this.items[id];
    delete this.items[id];
    this.items.splice(id, 1);
    this.sortItems(global.gameData);
    return item;
}

EntityInventory.prototype.dequipAll = function(gameData, type, arg) {
    var dequippedItems = [];
    for (var i = 0; i < this.items.length; ++i) {
        var itemType = RegisterItem[this.items[i].id];
        if (itemType.type == type && this.items[i].equipped) {
            this.items[i].equipped = false;
            dequippedItems.push([i, this.items[i].id]);
        }
    }
    this.sortItems(global.gameData);
    return dequippedItems;
}

EntityInventory.prototype.getEquippedItemType = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = RegisterItem[item.id];
            if (itemType.type == type)
                return itemType;
        }
    }
}

EntityInventory.prototype.getEquippedStackId = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = RegisterItem[item.id];
            if (itemType.type == type)
                return i;
        }
    }
}

EntityInventory.prototype.getEquippedItem = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = RegisterItem[item.id];
            if (itemType.type == type)
                return item;
        }
    }
}

EntityInventory.prototype.findTool = function(itemFunction) {
    for (var i = 0; i < this.items.length; i++) {
        var itemType = RegisterItem[this.items[i].id];
        if (itemType.itemFunction == itemFunction)
            return i;
    }
    return -1;
}
