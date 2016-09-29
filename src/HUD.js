
createHUD = function(gameData) {
    // create inventory
    var inventory = document.getElementById("inventory");
    inventory.innerHTML = '<div class="inventoryHeader">Your amazing inventory</div>';
    var inventoryContent = document.createElement("div");
    inventoryContent.setAttribute("class", "inventoryContent");
    for(var i = 0; i < 64; ++i) {
        var slot = document.createElement("div");
        slot.setAttribute("class", "inventorySlot");
        slot.setAttribute("id", "slot" + i);

        var slotImageContainer = document.createElement("div");
        slotImageContainer.setAttribute("class", "slotImageContainer");
        slotImageContainer.style.backgroundRepeat = "no-repeat";

        var slotTextContainer = document.createElement("div");
        slotTextContainer.setAttribute("class", "slotTextContainer");

        slot.appendChild(slotImageContainer);
        slot.appendChild(slotTextContainer);
        inventoryContent.appendChild(slot);
    }
    inventory.appendChild(inventoryContent);

    // create dugItems
    var dugItems = document.getElementById("dugItems");
    dugItems.innerHTML = "";
    for(var i = 0; i < gameData.itemRegister.itemTypes.length; ++i) {
        var itemType = gameData.itemRegister.itemTypes[i];
        if(itemType.isDigable) {
            var dugItemsEntry = document.createElement("div");
            dugItemsEntry.setAttribute("class", "dugItemsEntry");
            dugItemsEntry.setAttribute("id", "entry" + i);

            var dugItemsEntryImage = document.createElement("div");
            dugItemsEntryImage.setAttribute("class", "dugItemsEntryImage");
            dugItemsEntryImage.style.backgroundRepeat = "no-repeat";
            dugItemsEntryImage.style.backgroundImage = "url('data/textures/" + itemType.texture + ".png')";

            var dugItemsEntryText = document.createElement("div");
            dugItemsEntryText.setAttribute("class", "dugItemsEntryText");
            dugItemsEntryText.innerText = "0.0";

            dugItemsEntry.appendChild(dugItemsEntryImage);
            dugItemsEntry.appendChild(dugItemsEntryText);
            dugItems.appendChild(dugItemsEntry);
        }
    }
    var dugItemsFooter = document.createElement("div");
    dugItemsFooter.setAttribute("class", "dugItemsFooter");
    dugItems.appendChild(dugItemsFooter);
}

updateHUD = function(gameData) {
    // update inventory
    var currentItemIndex = 0;
    for(var i = 0; i < 64; ++i) {
        var slot = document.getElementById("slot" + i);
        var slotImageContainer = slot.childNodes[0];
        var slotTextContainer = slot.childNodes[1];

        var item = player.inventory.items[currentItemIndex];
        if(!item)
            break;
        var itemType = gameData.itemRegister.getById(item.id);
        while(item && itemType.isDigable) {
            ++currentItemIndex;
            item = player.inventory.items[currentItemIndex];
            if(!item)
                break;
            itemType = gameData.itemRegister.getById(item.id);
        }
        if(item && itemType) {
            if(itemType.texture)
                slotImageContainer.style.backgroundImage = "url('data/textures/" + itemType.texture + ".png')";
            slotTextContainer.innerText = item.amount;
        }
    }

    // update dugItems
    var current = 0;
    for(var i = 0; i < gameData.itemRegister.itemTypes.length; ++i) {
        var itemType = gameData.itemRegister.itemTypes[i];
        if(itemType.isDigable) {
            var dugItemsEntry = document.getElementById("entry" + current);
            var dugItemsEntryText = dugItemsEntry.childNodes[1];
            dugItemsEntryText.innerText = parseFloat(Math.floor((player.inventory.getAmountById(itemType.id) / 256.0) * 10) / 10).toFixed(1);
            ++current;
        }
    }
}