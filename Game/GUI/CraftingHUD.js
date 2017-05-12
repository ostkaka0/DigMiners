
var CraftingHUD = function() {
    this.selectedRecipeId = null;

    // Open/close crafting window when "C" is clicked
    $('*').keydown(function(e) {
        e.stopPropagation();
        var key = e.which;
        if (key == 67) { // c
            if (!this.root.is(":visible"))
                this.openCraftingWindow();
            else
                this.closeCraftingWindow();
            return true;
        }
        return true;
    }.bind(this));

    Event.subscribe(CommandEntityInventory.Events.onInventoryChange, this, function(entity) {
        if (Client.playerEntity && Client.playerEntity.id == entity.id) {
            this.checkCanAffordRecipe();
        }
    }.bind(this));

    this.root = $("<div>").appendTo("#hud");
    this.root.css({
        "position": "fixed",
        "width": "544px",
        "height": "158px",
        "bottom": "180px",
        "marginLeft": "auto",
        "marginRight": "auto",
        "left": "0",
        "right": "0",
        "borderWidth": "4px",
        "borderStyle": "solid",
        "borderColor": "rgb(64, 64, 64)",
        "backgroundColor": "rgba(64, 64, 64, 0.5)",
        "display": "none",
        "MozUserSelect": "none",
        "KhtmlUserSelect": "none",
        "WebkitUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none"
    });
    this.root.click(function(e) {
        e.stopPropagation();
    });

    this.craftingLeft = $("<div>").appendTo(this.root);
    this.craftingLeft.css({
        "position": "relative",
        "float": "left",
        "width": "400px",
        "height": "100%",
        "overflowY": "scroll"
    });

    this.craftingRight = $("<div>").appendTo(this.root);
    this.craftingRight.css({
        "position": "relative",
        "float": "right",
        "width": "138px",
        "height": "100%",
        "borderLeftStyle": "solid",
        "borderLeftWidth": "4px",
        "borderColor": "rgb(64, 64, 64)"
    });

    this.craftingRightTextContainer = $("<div>", { "id": "craftingRightTextContainer" }).appendTo(this.craftingRight);
    this.craftingRightTextContainer.css({
        "position": "relative",
        "width": "130px",
        "height": "12px",
        "marginLeft": "5px",
        "marginTop": "5px",
        "textAlign": "center",
        "color": "red",
        "fontFamily": "Monospace",
        "fontSize": "11px"
    });

    this.craftingRightPreview = $("<div>").appendTo(this.craftingRight);
    this.craftingRightPreview.css({
        "position": "relative",
        "width": "80px",
        "height": "80px",
        "marginLeft": "25px",
        "marginTop": "8px",
        "borderStyle": "solid",
        "borderWidth": "2px",
        "borderColor": "rgb(64, 64, 64)"
    });

    this.craftingRightPreviewImageHolder = $("<div>").appendTo(this.craftingRightPreview);
    this.craftingRightPreviewImageHolder.css({
        "position": "absolute",
        "backgroundClip": "padding-box"
    });

    this.craftingRightPreviewTextContainer = $("<div>").appendTo(this.craftingRightPreview);
    this.craftingRightPreviewTextContainer.css({
        "position": "absolute",
        "width": "76px",
        "height": "12px",
        "marginLeft": "2px",
        "marginTop": "1px",
        "textAlign": "center",
        "color": "white",
        "fontFamily": "Monospace",
        "fontSize": "11px"
    });

    this.craftButton = $("<div>", { "text": "Craft" }).appendTo(this.craftingRight);
    this.craftButton.css({
        "position": "relative",
        "width": "80px",
        "height": "20px",
        "marginLeft": "25px",
        "marginTop": "10px",
        "borderStyle": "solid",
        "borderWidth": "2px",
        "borderColor": "rgb(64, 64, 64)",
        "fontFamily": "Monospace",
        "fontSize": "13px",
        "lineHeight": "20px",
        "color": "white",
        "backgroundColor": "rgba(64, 64, 64, 1.0)"
    });
    this.craftButton.hover(function() {
        $(this).css("background-color", "rgba(90, 90, 90, 1.0)");
    }, function() {
        $(this).css("background-color", "rgba(64, 64, 64, 1.0)");
    });
    this.craftButton.click(function(e) {
        var recipeId = this.selectedRecipeId;
        if (recipeId == null || recipeId == undefined)
            return;
        var message = new MessageRequestCraft(recipeId);
        message.send(Client.socket);
    }.bind(this));
}

CraftingHUD.prototype.openCraftingWindow = function() {
    // Re-generate recipe HUD
    this.craftingLeft.empty();

    for (var i = 0; i < Recipes.length; ++i) {
        var recipe = Recipes[i];

        var craftingEntry = $("<div>", { "class": "craftingEntry", "recipeId": i }).appendTo(this.craftingLeft);
        craftingEntry.css({
            "position": "relative",
            "width": "100%",
            "height": "40px"
        });

        var craftingEntryOverlay = $("<div>", { "class": "craftingEntryOverlay", }).appendTo(craftingEntry);
        craftingEntryOverlay.css({
            "position": "absolute",
            "width": "100%",
            "height": "40px",
            "boxSizing": "border-box",
            "MozBoxSizing": "border-box",
            "WebkitBoxSizing": "border-box",
            "border": "2px solid rgba(255, 215, 0, 0.5)",
            "display": "none"
        });

        // Slot describer
        var craftingHUDInstance = this;
        craftingEntry.click(function() {
            $('.craftingEntry > .craftingEntryOverlay').each(function() {
                this.style.display = "none";
            });
            var overlay = this.childNodes[0];
            overlay.style.display = "block";

            var recipeId = $(this).attr("recipeId");
            craftingHUDInstance.selectedRecipeId = recipeId;
            var recipe = Recipes[recipeId];

            for (var j = 0; j < recipe.item.length; ++j) {
                var resultItemType = recipe.item[j][0];
                var resultAmount = recipe.item[j][1];
                var imageWidth = Client.textures[resultItemType.name].width;
                var imageHeight = Client.textures[resultItemType.name].height;
                craftingHUDInstance.craftingRightPreviewImageHolder.width(imageWidth);
                craftingHUDInstance.craftingRightPreviewImageHolder.height(imageHeight);
                HUD.putItemImage(craftingHUDInstance.craftingRightPreviewImageHolder, resultItemType, 80, 80);
                craftingHUDInstance.craftingRightPreviewTextContainer.text(resultItemType.name);
            }

            craftingHUDInstance.checkCanAffordRecipe();
        });

        var craftingEntryContent = $("<div>").appendTo(craftingEntry);
        craftingEntryContent.css({
            "position": "relative",
            "width": "calc(100% - 8px)",
            "height": "32px",
            "top": "4px",
            "left": "4px"
        });

        // Required ores
        for (var j = 0; j < recipe.requiredOres.length; ++j) {
            var tileType = recipe.requiredOres[j][0];
            var amount = recipe.requiredOres[j][1];

            var imageHolder = $("<div>", { "text": amount }).appendTo(craftingEntryContent);
            imageHolder.css({
                "position": "relative",
                "float": "left",
                "height": "32px",
                "textAlign": "center",
                "color": "white",
                "fontFamily": "Monospace",
                "fontSize": "15px",
                "lineHeight": "32px",
                "background-image": "url('data/textures/tiles/" + tileType.name + ".png')",
                "width": "32px"
            });

            // Plus
            if (j < recipe.requiredOres.length - 1) {
                var plus = $("<div>", { "text": "+" }).appendTo(craftingEntryContent);
                plus.css({
                    "position": "relative",
                    "float": "left",
                    "width": "32px",
                    "height": "32px",
                    "fontFamily": "Monospace",
                    "fontSize": "30px",
                    "lineHeight": "30px",
                    "color": "white"
                });
            }
        }

        // Plus between ores and items
        if (recipe.requiredOres.length > 0 && recipe.requiredItems.length > 0) {
            var plus = $("<div>", { "text": "+" }).appendTo(craftingEntryContent);
            plus.css({
                "position": "relative",
                "float": "left",
                "width": "32px",
                "height": "32px",
                "fontFamily": "Monospace",
                "fontSize": "30px",
                "lineHeight": "30px",
                "color": "white"
            });
        }

        // Required items
        for (var j = 0; j < recipe.requiredItems.length; ++j) {
            var itemType = recipe.requiredItems[j][0];
            var amount = recipe.requiredItems[j][1];

            var imageWidth = Client.textures[itemType.name].width;
            var imageHeight = Client.textures[itemType.name].height;

            var imageHolder = $("<div>", { "text": amount }).appendTo(craftingEntryContent);
            imageHolder.css({
                "position": "relative",
                "float": "left",
                "width": imageWidth + "px",
                "height": imageHeight + "px",
                "textAlign": "center",
                "color": "white",
                "fontFamily": "Monospace",
                "fontSize": "15px",
                "lineHeight": "32px"
            });
            HUD.putItemImage(imageHolder, itemType, imageWidth, imageHeight, false, false);

            // Plus
            if (j < recipe.requiredItems.length - 1) {
                var plus = $("<div>", { "text": "+" }).appendTo(craftingEntryContent);
                plus.css({
                    "position": "relative",
                    "float": "left",
                    "width": "32px",
                    "height": "32px",
                    "fontFamily": "Monospace",
                    "fontSize": "30px",
                    "lineHeight": "30px",
                    "color": "white"
                });
            }
        }

        // Equals
        var equals = $("<div>", { "text": "=" }).appendTo(craftingEntryContent);
        equals.css({
            "position": "relative",
            "float": "left",
            "width": "32px",
            "height": "32px",
            "fontFamily": "Monospace",
            "fontSize": "30px",
            "lineHeight": "30px",
            "color": "white"
        });

        // Result items
        for (var j = 0; j < recipe.item.length; ++j) {
            var resultItemType = recipe.item[j][0];
            var resultAmount = recipe.item[j][1];

            var imageWidth = Client.textures[resultItemType.name].width;
            var imageHeight = Client.textures[resultItemType.name].height;

            var imageHolder = $("<div>").appendTo(craftingEntryContent);
            imageHolder.css({
                "position": "relative",
                "float": "left",
                "width": imageWidth + "px",
                "height": imageHeight + "px",
                "textAlign": "center",
                "color": "white",
                "fontFamily": "Monospace",
                "fontSize": "15px",
                "lineHeight": "32px"
            });

            HUD.putItemImage(imageHolder, resultItemType, imageWidth, imageHeight, false, false);
            if (resultAmount > 1)
                imageHolder.text(resultAmount);

            // Plus
            if (j < recipe.item.length - 1) {
                var plus = $("<div>", { "text": "+" }).appendTo(craftingEntryContent);
                plus.css({
                    "position": "relative",
                    "float": "left",
                    "width": "32px",
                    "height": "32px",
                    "fontFamily": "Monospace",
                    "fontSize": "30px",
                    "lineHeight": "30px",
                    "color": "white"
                });
            }
        }

        if (i < Recipes.length - 1) {
            var separator = $("<div>").appendTo(this.craftingLeft);
            separator.css({
                "position": "relative",
                "width": "100%",
                "height": "2px",
                "backgroundColor": "rgb(64, 64, 64)"
            });
        }
    }

    this.root.show();
}

CraftingHUD.prototype.closeCraftingWindow = function() {
    this.root.hide();
}

CraftingHUD.prototype.checkCanAffordRecipe = function() {
    var recipeId = this.selectedRecipeId;
    if (recipeId == null || recipeId == undefined)
        return;
    var recipe = Recipes[recipeId];
    if (Client.player.hasRequiredRecipeResources(recipe) === false)
        this.craftingRightTextContainer.text("Not enough resources");
    else
        this.craftingRightTextContainer.text("");
}