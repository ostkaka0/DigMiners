
var HUD = function(gameData) {
    // Open/close crafting window when "C" is clicked
    /*$('*').keydown(function(e) {
        e.stopPropagation();
        var key = e.which;
        if (key == 67) { // c
            var crafting = document.getElementById("crafting");
            if (!crafting.style.display || crafting.style.display == "none")
                gameData.HUD.openCraftingWindow();
            else
                gameData.HUD.closeCraftingWindow();
            return true;
        }
        return true;
    });*/

    // Stop scroll to bottom when spacebar is used
    /*$('*').keydown(function(e) {
        if (e.keyCode == 32)
            e.preventDefault();
    });*/

    $('*').contextmenu(function(e) {
        e.preventDefault();
    });

    this.dugItems = new DugItems();

    this.chat = new Chat();

    this.ammo = new AmmoHUD();

    $('.hud').show();
}
export default HUD

HUD.prototype.update = function() {
    // update inventory
    if (this.inventory)
        this.inventory.update();

    // update dugItems
    this.dugItems.update();
}

/*HUD.prototype.openCraftingWindow = function() {
    HUD.selectedRecipeId = null;

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

    var craftingRightPreviewImageHolder = document.createElement("div");
    craftingRightPreviewImageHolder.setAttribute("class", "craftingRightPreviewImageHolder");
    craftingRightPreview.appendChild(craftingRightPreviewImageHolder);

    var craftingRightPreviewTextContainer = document.createElement("div");
    craftingRightPreviewTextContainer.setAttribute("class", "craftingRightPreviewTextContainer");
    craftingRightPreview.appendChild(craftingRightPreviewTextContainer);

    var craftButton = document.createElement("div");
    craftButton.setAttribute("class", "craftButton");
    craftButton.innerText = "Craft";
    craftingRight.appendChild(craftButton);

    $(craftButton).click(function(e) {
        var recipeId = HUD.selectedRecipeId;
        if (recipeId == null || recipeId == undefined)
            return;
        var message = new MessageRequestCraft(recipeId);
        message.send(socket);
    });

    for (var i = 0; i < Recipes.length; ++i) {
        var recipe = Recipes[i];

        var craftingEntry = document.createElement("div");
        craftingEntry.setAttribute("class", "craftingEntry");
        craftingEntry.setAttribute("recipeId", i);
        craftingLeft.appendChild(craftingEntry);

        var craftingEntryOverlay = document.createElement("div");
        craftingEntryOverlay.setAttribute("class", "craftingEntryOverlay");
        craftingEntry.appendChild(craftingEntryOverlay);

        // Slot describer
        $(craftingEntry).click(function() {
            $('.craftingEntry > .craftingEntryOverlay').each(function() {
                this.style.display = "none";
            });
            var overlay = this.childNodes[0];
            overlay.style.display = "block";

            var recipeId = $(this).attr("recipeId");
            HUD.selectedRecipeId = recipeId;
            var recipe = Recipes[recipeId];

            for (var j = 0; j < recipe.item.length; ++j) {
                var resultItemType = recipe.item[j][0];
                var resultAmount = recipe.item[j][1];
                var imageWidth = gameData.textures[resultItemType.name].width;
                var imageHeight = gameData.textures[resultItemType.name].height;
                craftingRightPreviewImageHolder.style.width = imageWidth;
                craftingRightPreviewImageHolder.style.height = imageHeight;
                this.putItemImage(craftingRightPreviewImageHolder, resultItemType, 80, 80);
                craftingRightPreviewTextContainer.innerText = resultItemType.name;
            }

            gameData.HUD.checkCanAffordRecipe();
        }.bind(this));

        var craftingEntryContent = document.createElement("div");
        craftingEntryContent.setAttribute("class", "craftingEntryContent");
        craftingEntry.appendChild(craftingEntryContent);

        // Required ores
        for (var j = 0; j < recipe.requiredOres.length; ++j) {
            var tileType = recipe.requiredOres[j][0];
            var amount = recipe.requiredOres[j][1];

            var imageHolder = document.createElement("div");
            imageHolder.setAttribute("class", "craftingImageHolder");
            imageHolder.style.backgroundImage = "url('data/textures/tiles/" + tileType.name + ".png')";
            imageHolder.style.width = 32;
            imageHolder.innerText = amount;
            craftingEntryContent.appendChild(imageHolder);

            // Plus
            if (j < recipe.requiredOres.length - 1) {
                var plus = document.createElement("div");
                plus.setAttribute("class", "craftingEntryContentOperator");
                plus.innerText = "+";
                craftingEntryContent.appendChild(plus);
            }
        }

        // Plus between ores and items
        if (recipe.requiredOres.length > 0 && recipe.requiredItems.length > 0) {
            var plus = document.createElement("div");
            plus.setAttribute("class", "craftingEntryContentOperator");
            plus.innerText = "+";
            craftingEntryContent.appendChild(plus);
        }

        // Required items
        for (var j = 0; j < recipe.requiredItems.length; ++j) {
            var itemType = recipe.requiredItems[j][0];
            var amount = recipe.requiredItems[j][1];

            var imageWidth = gameData.textures[itemType.name].width;
            var imageHeight = gameData.textures[itemType.name].height;

            var imageHolder = document.createElement("div");
            imageHolder.setAttribute("class", "craftingImageHolder");
            imageHolder.style.width = imageWidth;
            imageHolder.style.height = imageHeight;
            this.putItemImage(imageHolder, itemType, imageWidth, imageHeight, false, false);
            imageHolder.innerText = amount;
            craftingEntryContent.appendChild(imageHolder);

            // Plus
            if (j < recipe.requiredItems.length - 1) {
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
        for (var j = 0; j < recipe.item.length; ++j) {
            var resultItemType = recipe.item[j][0];
            var resultAmount = recipe.item[j][1];

            var imageWidth = gameData.textures[resultItemType.name].width;
            var imageHeight = gameData.textures[resultItemType.name].height;

            var imageHolder = document.createElement("div");
            imageHolder.setAttribute("class", "craftingImageHolder");
            imageHolder.style.width = imageWidth;
            imageHolder.style.height = imageHeight;
            this.putItemImage(imageHolder, resultItemType, imageWidth, imageHeight, false, false);
            if (resultAmount > 1)
                imageHolder.innerText = resultAmount;
            craftingEntryContent.appendChild(imageHolder);

            // Plus
            if (j < recipe.item.length - 1) {
                var plus = document.createElement("div");
                plus.setAttribute("class", "craftingEntryContentOperator");
                plus.innerText = "+";
                craftingEntryContent.appendChild(plus);
            }
        }

        if (i < Recipes.length - 1) {
            var separator = document.createElement("div");
            separator.setAttribute("class", "craftingEntrySeparator");
            craftingLeft.appendChild(separator);
        }
    }
}

HUD.prototype.closeCraftingWindow = function() {
    var crafting = document.getElementById("crafting");
    crafting.innerHTML = "";
    crafting.style.display = "none";
}*/

HUD.prototype.checkCanAffordRecipe = function() {
    var recipeId = HUD.selectedRecipeId;
    if (recipeId == null || recipeId == undefined)
        return;
    var recipe = Recipes[recipeId];
    var craftingRightTextContainer = document.getElementById("craftingRightTextContainer");
    if (craftingRightTextContainer) {
        if (global.player.hasRequiredRecipeResources(recipe) === false)
            craftingRightTextContainer.innerText = "Not enough resources";
        else
            craftingRightTextContainer.innerText = "";
    }
}
