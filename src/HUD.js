
HUDClosures = [];

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
        slot.setAttribute("title", "Empty slot");

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
    for(var i = 0; i < gameData.tileRegister.length; ++i) {
        var tileType = gameData.tileRegister[i];
        var dugItemsEntry = document.createElement("div");
        dugItemsEntry.setAttribute("class", "dugItemsEntry");
        dugItemsEntry.setAttribute("id", "entry" + i);

        var dugItemsEntryImage = document.createElement("div");
        dugItemsEntryImage.setAttribute("class", "dugItemsEntryImage");
        dugItemsEntryImage.style.backgroundRepeat = "no-repeat";
        dugItemsEntryImage.style.backgroundImage = "url('data/textures/tiles/" + tileType.name + ".png')";

        var dugItemsEntryText = document.createElement("div");
        dugItemsEntryText.setAttribute("class", "dugItemsEntryText");
        dugItemsEntryText.innerText = "0.0";

        dugItemsEntry.appendChild(dugItemsEntryImage);
        dugItemsEntry.appendChild(dugItemsEntryText);
        dugItems.appendChild(dugItemsEntry);
    }
    var dugItemsFooter = document.createElement("div");
    dugItemsFooter.setAttribute("class", "dugItemsFooter");
    dugItems.appendChild(dugItemsFooter);

    var createDropFunc = function(i) {
        return function() {
            var message = new MessageRequestDropStack(i);
            message.send(socket);
        };
    }

    var createEquipFunc = function(i) {
        return function() {
            var message = new MessageRequestEquipStack(i);
            message.send(socket);
            return false;
        };
    }
    // Initialize closures
    for(var i = 0; i < 64; ++i) {
        HUDClosures[i] = [];
        HUDClosures[i][0] = createDropFunc(i);
        HUDClosures[i][1] = createEquipFunc(i);
    }
}

updateHUD = function(gameData) {
    // update inventory
    for(var i = 0; i < 64; ++i) {
        var slot = document.getElementById("slot" + i);
        slot.setAttribute("class", "inventorySlot");
        var slotImageContainer = slot.childNodes[0];
        var slotTextContainer = slot.childNodes[1];

        var item = player.inventory.items[i];
        if(item) {
            var itemType = gameData.itemRegister[item.id];
            if(itemType.texture)
                slotImageContainer.style.backgroundImage = "url('data/textures/" + itemType.texturePath + itemType.texture + ".png')";
            if(item.amount > 1)
                slotTextContainer.innerText = item.amount;
            slot.setAttribute("title", itemType.name);
            if(item.equipped)
                slot.className += " brightness";

            slot.onclick = HUDClosures[i][0];
            slot.oncontextmenu = HUDClosures[i][1];
        } else {
            slotImageContainer.style.backgroundImage = "";
            slotTextContainer.innerText = "";
            slot.setAttribute("title", "Empty slot");
            slot.onclick = null;
        }
    }

    // update dugItems
    for(var i = 0; i < gameData.tileRegister.length; ++i) {
        if(!player.oreInventory[i])
            continue;
        var dugItemsEntry = document.getElementById("entry" + i);
        var dugItemsEntryText = dugItemsEntry.childNodes[1];
        dugItemsEntryText.innerText = parseFloat(Math.floor((player.oreInventory[i] / 256.0) * 10) / 10).toFixed(1);
    }
}
