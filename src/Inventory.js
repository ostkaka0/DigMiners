
Inventory = function() {
    this.items = [];
}

Inventory.prototype.addItem = function(gameData, id, amount) {
    var amountToAdd = amount;
    var maxStack = gameData.itemRegister.getById(id).maxStackSize;
    for(var i = 0; true; ++i) {
        if(amountToAdd < 0) {
            console.log("inventory bad thing happens!");
            return;
        }
        if(amountToAdd == 0)
            return;
        if(i >= this.items.length) {
            var added = (amountToAdd <= maxStack ? amountToAdd : maxStack);
            this.items.push(gameData.itemRegister.createById(id, added));
            amountToAdd -= added;
            continue;
        }
        if(this.items[i].id === id && this.items[i].amount < maxStack) {
            var maxToAdd = maxStack - this.items[i].amount;
            var added = (amountToAdd <= maxToAdd ? amountToAdd : maxToAdd);
            this.items[i].amount += added;
            amountToAdd -= added;
        }
    }
}

Inventory.prototype.removeItem = function(gameData, id, amount) {
    var amountToRemove = amount;
    for(var i = this.items.length - 1; i > 0; --i) {
        var currentAmount = this.items[i].amount;
        if(this.items[i].id === id && currentAmount >= 0) {
            var removed = (amount <= currentAmount ? amount : currentAmount);
            this.items[i].amount -= removed;
            amountToRemove -= removed;
        }
        if(amountToAdd < 0)
            console.log("inventory bad thing happens!");
        if(amountToAdd == 0)
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
