
Inventory = function(inventoryId, entityId, width, height) {
    this.items = [];
    this.inventoryId = inventoryId;
    this.entityId = entityId;
    this.width = width;
    this.height = height;
}

Inventory.createInventory = function(entityId, width, height) {
    if (!isServer)
        throw ("Tried to create inventory on client.")
    var inventoryId = gameData.world.inventoryIdList.next();
    var inventory = new Inventory(inventoryId, entityId, width, height);
    gameData.world.inventories[inventoryId] = inventory;
    if (!gameData.world.entityInventories[entityId])
        gameData.world.entityInventories[entityId] = [];
    gameData.world.entityInventories[entityId].push(inventory);
    return inventory;
}

Inventory.prototype.destroy = function(entity) {
    if (isServer) {
        delete gameData.world.inventories[this.inventoryId];
        var entityInventories = gameData.world.entityInventories[entity.id];
        if (entityInventories) {
            var index = entityInventories.indexOf(this.inventoryId);
            if (index != -1)
                entityInventories.splice(index, 1);
        }
    }
}

Inventory.prototype.name = inventory.name; function inventory() { };

Inventory.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, this.inventoryId);
    serializeInt32(byteArray, index, this.width);
    serializeInt32(byteArray, index, this.height);
    serializeInt32(byteArray, index, this.items.length);
    for (var i = 0; i < this.items.length; ++i) {
        serializeInt32(byteArray, index, this.items[i].id);
        serializeInt32(byteArray, index, this.items[i].amount);
        var booleans = [this.items[i].equipped, this.items[i].static];
        serializeBooleans(byteArray, index, booleans);
    }
}

Inventory.prototype.deserialize = function(byteArray, index) {
    this.inventoryId = deserializeInt32(byteArray, index);
    this.width = deserializeInt32(byteArray, index);
    this.height = deserializeInt32(byteArray, index);
    this.items = [];
    var itemsLength = deserializeInt32(byteArray, index);
    for (var i = 0; i < itemsLength; ++i) {
        var id = deserializeInt32(byteArray, index);
        var amount = deserializeInt32(byteArray, index);
        var booleans = deserializeBooleans(byteArray, index);
        this.items[i] = {
            "id": id,
            "name": Config.itemRegister[id].name,
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
        var aType = Config.itemRegister[a.id];
        var bType = Config.itemRegister[b.id];

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
    var maxStack = Config.itemRegister[id].maxStackSize;
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
            this.items.push({ 'id': id, 'name': Config.itemRegister[id].name, 'amount': added });
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
    this.items.push({ 'id': id, 'name': Config.itemRegister[id].name, 'amount': 1, 'static': true });
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
    this.sortItems(gameData);
    return item;
}

Inventory.prototype.dequipAll = function(gameData, type, arg) {
    var dequippedItems = [];
    for (var i = 0; i < this.items.length; ++i) {
        var itemType = Config.itemRegister[this.items[i].id];
        if (itemType.type == type && this.items[i].equipped) {
            this.items[i].equipped = false;
            dequippedItems.push([i, this.items[i].id]);
        }
    }
    this.sortItems(gameData);
    return dequippedItems;
}

Inventory.prototype.getEquippedItemType = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = Config.itemRegister[item.id];
            if (itemType.type == type)
                return itemType;
        }
    }
}

Inventory.prototype.getEquippedStackId = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = Config.itemRegister[item.id];
            if (itemType.type == type)
                return i;
        }
    }
}

Inventory.prototype.getEquippedItem = function(type) {
    for (var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if (item.equipped) {
            var itemType = Config.itemRegister[item.id];
            if (itemType.type == type)
                return item;
        }
    }
}

Inventory.prototype.findTool = function(itemFunction) {
    for (var i = 0; i < this.items.length; i++) {
        var itemType = Config.itemRegister[this.items[i].id];
        if (itemType.itemFunction == itemFunction)
            return i;
    }
    return -1;
}
