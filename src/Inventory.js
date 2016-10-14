
Inventory = function() {
    this.items = [];
}

Inventory.prototype.sortItems = function() {
    this.items.sort(function(a, b) {
        if(a.id < b.id)
            return -1;

        if(a.id > b.id)
            return 1;

        return 0;
    });
}

Inventory.prototype.addItem = function(gameData, id, amount) {
    //console.log("adding " + amount + " " + id);
    var maxStack = gameData.itemRegister[id].maxStackSize;
    for(var i = 0; true; ++i) {
        if(amount < 0) {
            console.log("inventory bad thing happens!");
            this.sortItems();
            return;
        }
        if(amount == 0) {
            this.sortItems();
            return;
        }
        if(i >= this.items.length || !this.items[i]) {
            var added = (amount <= maxStack ? amount : maxStack);
            this.items.push({ 'id': id, 'name': gameData.itemRegister[id].name, 'amount': added });
            amount -= added;
            continue;
        }
        if(this.items[i].id === id && this.items[i].amount < maxStack) {
            var maxToAdd = maxStack - this.items[i].amount;
            var added = (amount <= maxToAdd ? amount : maxToAdd);
            this.items[i].amount += added;
            amount -= added;
        }
    }
    this.sortItems();
}

Inventory.prototype.removeItem = function(gameData, id, amount) {
    for(var i = this.items.length - 1; i >= 0; --i) {
        var currentAmount = this.items[i].amount;
        if(this.items[i].id === id && currentAmount >= 0) {
            var removed = (amount <= currentAmount ? amount : currentAmount);
            this.items[i].amount -= removed;
            if(this.items[i].amount <= 0)
                this.items.splice(i, 1);
            amount -= removed;
        }
        if(amount < 0)
            console.log("inventory bad thing happens!");
        if(amount == 0) {
            this.sortItems();
            return;
        }
    }
    this.sortItems();
}

Inventory.prototype.hasItem = function(id, amount) {
    var count = 0;
    for(var i = 0; i < this.items.length; ++i) {
        if(this.items[i].id === id) {
            count += this.items[i].amount;
            if(count >= amount)
                return true;
        }
    }
    return false;
}

Inventory.prototype.getAmountById = function(id) {
    var amount = 0;
    for(var i = 0; i < this.items.length; ++i) {
        if(this.items[i].id === id)
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
    for(var i = 0; i < this.items.length; ++i) {
        var itemType = gameData.itemRegister[this.items[i].id];
        if(itemType.type == type) {
            this.items[i].equipped = false;
            if(this.items[i].onDequip) {
                this.items[i].onDequip(gameData, arg);
                this.items[i].onDequip = null;
            }
        }
    }
    this.sortItems(gameData);
}

Inventory.prototype.getEquippedItemType = function(type) {
    for(var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if(item.equipped) {
            var itemType = gameData.itemRegister[item.id];
            if(itemType.type == type)
                return itemType;
        }
    }
}

Inventory.prototype.getEquippedStackId = function(type) {
    for(var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if(item.equipped) {
            var itemType = gameData.itemRegister[item.id];
            if(itemType.type == type)
                return i;
        }
    }
}
