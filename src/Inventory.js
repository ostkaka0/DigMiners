
Inventory = function() {
    this.items = [];
}

Inventory.prototype.addItem = function(gameData, id, amount) {
    //console.log("adding " + amount + " " + id);
    var maxStack = gameData.itemRegister[id].maxStackSize;
    for(var i = 0; true; ++i) {
        if(amount < 0) {
            console.log("inventory bad thing happens!");
            return;
        }
        if(amount == 0)
            return;
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
}

Inventory.prototype.removeItem = function(gameData, id, amount) {
    for(var i = this.items.length - 1; i > 0; --i) {
        var currentAmount = this.items[i].amount;
        if(this.items[i].id === id && currentAmount >= 0) {
            var removed = (amount <= currentAmount ? amount : currentAmount);
            this.items[i].amount -= removed;
            amountToRemove -= removed;
        }
        if(amount < 0)
            console.log("inventory bad thing happens!");
        if(amount == 0)
            return;
    }
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
}
