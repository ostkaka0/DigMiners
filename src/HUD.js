
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
        var describer = document.createElement("div");
        describer.setAttribute("class", "slotDescriber");
        slot.appendChild(describer);

        var slotImageContainer = document.createElement("div");
        slotImageContainer.setAttribute("class", "slotImageContainer");
        slotImageContainer.style.backgroundRepeat = "no-repeat";

        var slotImageContainerOverlay = document.createElement("div");
        slotImageContainerOverlay.setAttribute("class", "slotImageContainerOverlay");
        slotImageContainer.appendChild(slotImageContainerOverlay);

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
        if(tileType.isOre) {
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

    // Create crafting window
    var crafting = document.getElementById("crafting");
    var craftingLeft = document.createElement("div");
    craftingLeft.setAttribute("class", "craftingLeft");
    crafting.appendChild(craftingLeft);

    var craftingRight = document.createElement("div");
    craftingRight.setAttribute("class", "craftingRight");
    crafting.appendChild(craftingRight);

    var craftingRightPreview = document.createElement("div");
    craftingRightPreview.setAttribute("class", "craftingRightPreview");
    craftingRight.appendChild(craftingRightPreview);

    var craftButton = document.createElement("div");
    craftButton.setAttribute("class", "craftButton");
    craftButton.innerText = "Craft";
    craftingRight.appendChild(craftButton);

    for(var i = 0; i < Recipes.length; ++i) {
        var recipe = Recipes[i];

        var craftingEntry = document.createElement("div");
        craftingEntry.setAttribute("class", "craftingEntry");
        craftingLeft.appendChild(craftingEntry);

        var craftingEntryContent = document.createElement("div");
        craftingEntryContent.setAttribute("class", "craftingEntryContent");
        craftingEntry.appendChild(craftingEntryContent);

        // Required ores
        for(var j = 0; j < recipe.requiredOres.length; ++j) {
            var tileType = recipe.requiredOres[j][0];
            var amount = recipe.requiredOres[j][1];

            var imageHolder = document.createElement("div");
            imageHolder.setAttribute("class", "craftingImageHolder");
            imageHolder.style.backgroundImage = "url('data/textures/tiles/" + tileType.name + ".png')";
            imageHolder.style.width = 32;
            imageHolder.innerText = amount;
            craftingEntryContent.appendChild(imageHolder);

            // Plus
            if(j < recipe.requiredOres.length - 1) {
                var plus = document.createElement("div");
                plus.setAttribute("class", "craftingEntryContentOperator");
                plus.innerText = "+";
                craftingEntryContent.appendChild(plus);
            }
        }

        // Required items
        for(var j = 0; j < recipe.requiredItems.length; ++j) {
            var itemType = recipe.requiredItems[j][0];
            var amount = recipe.requiredItems[j][1];

            var imageWidth = textures[itemType.texture].width;
            console.log(imageWidth);

            var imageHolder = document.createElement("div");
            imageHolder.setAttribute("class", "craftingImageHolder");
            imageHolder.style.backgroundImage = "url('data/textures/items/" + itemType.texture + ".png')";
            imageHolder.style.width = imageWidth;
            imageHolder.innerText = amount;
            craftingEntryContent.appendChild(imageHolder);

            // Plus
            if(j < recipe.requiredItems.length - 1) {
                var plus = document.createElement("div");
                plus.setAttribute("class", "craftingEntryContentOperator");
                plus.innerText = "+";
                craftingEntryContent.appendChild(plus);
            }
        }

        // Equals
        var equals = document.createElement("div");
        equals.setAttribute("class", "craftingEntryContentOperator");
        equals.innerText = "=";
        //equals.style.cssFloat = "right";
        craftingEntryContent.appendChild(equals);

        // Result items
        for(var j = 0; j < recipe.item.length; ++j) {
            var resultItemType = recipe.item[j][0];
            var resultAmount = recipe.item[j][1];

            var imageWidth = textures[resultItemType.texture].width;
            console.log(imageWidth);

            var imageHolder = document.createElement("div");
            imageHolder.setAttribute("class", "craftingImageHolder");
            imageHolder.style.backgroundImage = "url('data/textures/items/" + resultItemType.texture + ".png')";
            imageHolder.style.width = imageWidth;
            if(resultAmount > 1)
                imageHolder.innerText = resultAmount;
            //imageHolder.style.cssFloat = "right";
            craftingEntryContent.appendChild(imageHolder);

            // Plus
            if(j < recipe.item.length - 1) {
                var plus = document.createElement("div");
                plus.setAttribute("class", "craftingEntryContentOperator");
                plus.innerText = "+";
                craftingEntryContent.appendChild(plus);
            }
        }

        if(i < Recipes.length - 1) {
            var separator = document.createElement("div");
            separator.setAttribute("class", "craftingEntrySeparator");
            craftingLeft.appendChild(separator);
        }
    }

    // Slot describer
    $('.inventorySlot').mouseenter(function() {
        var text = $(this).find('.slotDescriber');
        text.fadeIn(50);
    }).mouseleave(function() {
        var text = $(this).find('.slotDescriber');
        text.fadeOut(50);
    });
}

updateHUD = function(gameData) {
    // update inventory
    for(var i = 0; i < 64; ++i) {
        var slot = document.getElementById("slot" + i);
        var slotDescriptionContainer = slot.childNodes[0];
        var slotImageContainer = slot.childNodes[1];
        var slotTextContainer = slot.childNodes[2];

        var slotImageContainerOverlay = slotImageContainer.childNodes[0];
        slotImageContainerOverlay.style.backgroundImage = "";

        var item = global.player.inventory.items[i];
        if(item) {
            var itemType = gameData.itemRegister[item.id];
            if(itemType.texture)
                slotImageContainer.style.backgroundImage = "url('data/textures/" + itemType.texturePath + itemType.texture + ".png')";
            slotTextContainer.innerText = "";
            if(item.amount > 1)
                slotTextContainer.innerText = item.amount;

            slotDescriptionContainer.innerText = itemType.name;
            if(item.equipped)
                slotImageContainerOverlay.style.backgroundImage = "url('data/textures/items/Equipped.png')";

            slot.onclick = HUDClosures[i][0];
            slot.oncontextmenu = HUDClosures[i][1];
        } else {
            slotImageContainer.style.backgroundImage = "";
            slotTextContainer.innerText = "";
            slotDescriptionContainer.innerText = "";
            slot.onclick = null;
        }
    }

    // update dugItems
    for(var i = 0; i < gameData.tileRegister.length; ++i) {
        var tileType = gameData.tileRegister[i];
        if(!tileType.isOre || !global.player.oreInventory[i])
            continue;
        var dugItemsEntry = document.getElementById("entry" + i);
        var dugItemsEntryText = dugItemsEntry.childNodes[1];
        dugItemsEntryText.innerText = parseFloat(Math.floor((global.player.oreInventory[i] / 256.0) * 10) / 10).toFixed(1);
    }
}
