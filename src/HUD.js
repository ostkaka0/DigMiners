
var HUD = {};

HUDClosures = [];

createHUD = function(gameData) {
    // create inventory
    var inventory = document.getElementById("inventory");
    $(inventory).click(function(e) {
        e.stopPropagation();
    });
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

    // Slot describer
    $('.inventorySlot').mouseenter(function() {
        var text = $(this).find('.slotDescriber');
        text.fadeIn(50);
    }).mouseleave(function() {
        var text = $(this).find('.slotDescriber');
        text.fadeOut(50);
    });

    $('*').keydown(function(e) {
        e.stopPropagation();
        var key = e.which;
        if(key == 67) { // c
            var crafting = document.getElementById("crafting");
            if(!crafting.style.display || crafting.style.display == "none")
                openCraftingWindow(gameData);
            else
                closeCraftingWindow();
            return true;
        }
        return true;
    });

    $('*').keydown(function(e) {
        if(e.keyCode == 32)
            e.preventDefault();
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
            var backgroundScale = 32/(itemType.textureSize || Math.max(itemType.textureWidth, itemType.textureHeight));
            slotImageContainer.style.width = 34;//(itemType.textureWidth).toString() + "px";
            slotImageContainer.style.height = 34;//(itemType.textureHeight).toString() +"px";
            //slotImageContainer.style.transform = "scale(" + textureScale.toString() + ") translate(" + (-64 + 64*textureScale).toString() + "px," + (-32 + 32*textureScale + 0.5*itemType.textureWidth - 0.5*itemType.textureHeight).toString() + "px)";
            slotImageContainer.style.backgroundSize = (backgroundScale*itemType.textureWidth*(itemType.textureDimX || 1)).toString() + "px " + (backgroundScale*itemType.textureHeight*(itemType.textureDimY || 1)).toString() + "px ";//Math.floor(100*textureScale).toString() + "%";
            slotImageContainer.style.borderWidth = Math.floor(Math.max(0, 34/2 - backgroundScale*itemType.textureHeight/2)).toString() + "px " + Math.floor(Math.max(0, 34/2 - backgroundScale*itemType.textureWidth/2)).toString() + "px";
            slotImageContainer.style.borderStyle = "solid";
            slotImageContainer.style.borderColor = "black";
            if(itemType.texture) {
                slotImageContainer.style.backgroundImage = "url('data/textures/" + itemType.texturePath + itemType.texture + ".png')";
                slotImageContainer.style.backgroundPosition = (-1*backgroundScale*itemType.textureId%(itemType.textureDimX || 1)*itemType.textureWidth).toString() + "px " + (-1*backgroundScale*(itemType.textureId/(itemType.textureDimX || 1) >> 0)%(itemType.textureDimY || 1)*itemType.textureWidth).toString() + "px";
                slotImageContainerOverlay.style.margin = Math.min(0, -Math.floor(34/2 - backgroundScale*itemType.textureHeight/2)).toString() + "px " + Math.min(0, -Math.floor(34/2 - backgroundScale*itemType.textureWidth/2)).toString() + "px";
            }
            slotTextContainer.innerText = "";
            if(item.amount > 1)
                slotTextContainer.innerText = item.amount;

            slotDescriptionContainer.innerText = itemType.name;
            if(item.equipped)
                slotImageContainerOverlay.style.background = "url('data/textures/items/Equipped.png')";

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

openCraftingWindow = function(gameData) {
    // Create crafting window
    var crafting = document.getElementById("crafting");
    crafting.style.display = "block";

    $(crafting).click(function(e) {
        e.stopPropagation();
    });

    var craftingLeft = document.createElement("div");
    craftingLeft.setAttribute("class", "craftingLeft");
    crafting.appendChild(craftingLeft);

    var craftingRight = document.createElement("div");
    craftingRight.setAttribute("class", "craftingRight");
    crafting.appendChild(craftingRight);

    var craftingRightTextContainer = document.createElement("div");
    craftingRightTextContainer.setAttribute("class", "craftingRightTextContainer");
    craftingRightTextContainer.setAttribute("id", "craftingRightTextContainer");
    craftingRight.appendChild(craftingRightTextContainer);

    var craftingRightPreview = document.createElement("div");
    craftingRightPreview.setAttribute("class", "craftingRightPreview");
    craftingRight.appendChild(craftingRightPreview);

    var craftingRightPreviewTextContainer = document.createElement("div");
    craftingRightPreviewTextContainer.setAttribute("class", "craftingRightPreviewTextContainer");
    craftingRightPreview.appendChild(craftingRightPreviewTextContainer);

    var craftButton = document.createElement("div");
    craftButton.setAttribute("class", "craftButton");
    craftButton.innerText = "Craft";
    craftingRight.appendChild(craftButton);

    $(craftButton).click(function(e) {
        var recipeId = HUD.selectedRecipeId;
        if(recipeId == null || recipeId == undefined)
            return;
        var message = new MessageRequestCraft(recipeId);
        message.send(socket);
    });

    for(var i = 0; i < Recipes.length; ++i) {
        var recipe = Recipes[i];

        var craftingEntry = document.createElement("div");
        craftingEntry.setAttribute("class", "craftingEntry");
        craftingEntry.setAttribute("recipeId", i);
        craftingLeft.appendChild(craftingEntry);

        // Slot describer
        $(craftingEntry).click(function() {
            var recipeId = $(this).attr("recipeId");
            HUD.selectedRecipeId = recipeId;
            var recipe = Recipes[recipeId];

            for(var j = 0; j < recipe.item.length; ++j) {
                var resultItemType = recipe.item[j][0];
                var resultAmount = recipe.item[j][1];
                craftingRightPreview.style.backgroundImage = "url('data/textures/items/" + resultItemType.texture + ".png')";
                craftingRightPreviewTextContainer.innerText = resultItemType.name;
            }

            checkCanAffordRecipe();
        });

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
        
        // Plus between ores and items
        if(recipe.requiredOres.length > 0 && recipe.requiredItems.length > 0) {
                var plus = document.createElement("div");
                plus.setAttribute("class", "craftingEntryContentOperator");
                plus.innerText = "+";
                craftingEntryContent.appendChild(plus);
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
}

closeCraftingWindow = function() {
    var crafting = document.getElementById("crafting");
    crafting.innerHTML = "";
    crafting.style.display = "none";
}

checkCanAffordRecipe = function() {
    var recipeId = HUD.selectedRecipeId;
    if(recipeId == null || recipeId == undefined)
        return;
    var recipe = Recipes[recipeId];
    var craftingRightTextContainer = document.getElementById("craftingRightTextContainer");
    if(craftingRightTextContainer) {
        if(global.player.hasRequiredRecipeResources(recipe) === false)
            craftingRightTextContainer.innerText = "Not enough resources";
        else
            craftingRightTextContainer.innerText = "";
    }
}
