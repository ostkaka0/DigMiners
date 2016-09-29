
updateHUD = function(gameData) {
    // update inventory
    var inventory = document.getElementById("inventory");
    inventory.innerHTML = '<div class="inventoryHeader">Your amazing inventory</div>';
    var inventoryContent = document.createElement("div");
    inventoryContent.setAttribute("class", "inventoryContent");
    var total = 64;
    for(var i = 0; i < total; ++i) {
        var slot = document.createElement("div");
        slot.setAttribute("class", "inventorySlot");

        var slotImageContainer = document.createElement("div");
        slotImageContainer.setAttribute("class", "slotImageContainer");
        slotImageContainer.style.backgroundRepeat = "no-repeat";

        var slotTextContainer = document.createElement("div");
        slotTextContainer.setAttribute("class", "slotTextContainer");

        var item = player.inventory.items[i];
        var itemType = null;
        if(item)
            itemType = gameData.itemRegister.getById(item.id);
        while(item && itemType.isDigable) {
            ++i;
            ++total;
            item = player.inventory.items[i];
            if(item)
                itemType = gameData.itemRegister.getById(item.id);
        }
        if(item && itemType) {
            if(itemType.texture)
                slotImageContainer.style.backgroundImage = "url('data/textures/" + itemType.texture + ".png')";
            slotTextContainer.innerText = Math.round((item.amount / 256.0) * 10) / 10;
        }

        slot.appendChild(slotImageContainer);
        slot.appendChild(slotTextContainer);
        inventoryContent.appendChild(slot);
    }
    inventory.appendChild(inventoryContent);

    // update dugItems
    var dugItems = document.getElementById("dugItems");
    dugItems.innerHTML = "";
    for(var i = 0; i < player.inventory.items.length; ++i) {
        var item = player.inventory.items[i];
        var itemType = gameData.itemRegister.getById(item.id);
        if(itemType.isDigable) {
            var dugItemsEntry = document.createElement("div");
            dugItemsEntry.setAttribute("class", "dugItemsEntry");

            var dugItemsEntryImage = document.createElement("div");
            dugItemsEntryImage.setAttribute("class", "dugItemsEntryImage");
            dugItemsEntryImage.style.backgroundRepeat = "no-repeat";
            dugItemsEntryImage.style.backgroundImage = "url('data/textures/" + itemType.texture + ".png')";

            var dugItemsEntryText = document.createElement("div");
            dugItemsEntryText.setAttribute("class", "dugItemsEntryText");
            dugItemsEntryText.innerText = Math.round((item.amount / 256.0) * 10) / 10;

            dugItemsEntry.appendChild(dugItemsEntryImage);
            dugItemsEntry.appendChild(dugItemsEntryText);
            dugItems.appendChild(dugItemsEntry);
        }
    }
    var dugItemsFooter= document.createElement("div");
    dugItemsFooter.setAttribute("class", "dugItemsFooter");
    dugItems.appendChild(dugItemsFooter);
}