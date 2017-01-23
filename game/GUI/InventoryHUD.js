
InventoryHUD = function(width, height, text, bottom) {
    this.inventoryWidth = width;
    this.inventoryHeight = height;
    this.HUDClosures = [];

    // create inventory
    this.inventory = $("<div>", {
        "id": "inventory"
    });
    this.inventory.css({
        "position": "fixed",
        "width": this.inventoryWidth * 34 + "px",
        "height": 22 + this.inventoryHeight * 34 + "px",
        "bottom": bottom + "px",
        "margin-left": "auto",
        "margin-right": "auto",
        "left": "0",
        "right": "0",
        "border-width": "4px",
        "border-style": "solid",
        "border-color": "rgb(64, 64, 64)",
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
        "pointer-events": "all",
    });
    this.inventory.click(function(e) {
        e.stopPropagation();
    });

    this.inventoryHeader = $("<div>", {
        "text": text,
    }).appendTo(this.inventory);
    this.inventoryHeader.css({
        "position": "relative",
        "width": "100%",
        "height": "22px",
        "background-color": "rgb(64, 64, 64)",
        "color": "rgb(200,200,200)",
        "font-family": "Monospace",
    });

    this.inventoryContent = $("<div>", {
        "class": "inventoryContent"
    });
    this.inventoryContent.css({
        "position": "relative",
    });

    for (var i = 0; i < this.inventoryWidth * this.inventoryHeight; ++i) {

        var slot = $("<div>", {
            "class": "inventorySlot",
            "id": "slot" + i,
        });
        slot.css({
            "margin-left": "0px",
            "position": "relative",
            "float": "left",
            "width": "34px",
            "height": "34px",
            "background-image": "url(\"data/textures/inventorySlotSmall2.png\")",
        });
        slot.mouseenter(function() {
            var text = $(this).find('.slotDescriber');
            text.fadeIn(50);
            var amount = $(this).find('.slotTextContainer');
            amount.fadeOut(50);
        }).mouseleave(function() {
            var text = $(this).find('.slotDescriber');
            text.fadeOut(50);
            var amount = $(this).find('.slotTextContainer');
            amount.fadeIn(50);
        });

        var describer = $("<div>", {
            "class": "slotDescriber",
        }).appendTo(slot);
        describer.css({
            "position": "absolute",
            "display": "none",
            "z-index": "50",
            "color": "white",
            "font-family": "Monospace",
            "font-size": "10px",
        });

        var slotImageContainer = $("<div>", {
            "class": "slotImageContainer",
        }).appendTo(slot);
        slotImageContainer.css({
            "position": "relative",
            "width": "32px",
            "height": "32px",
            "left": "1px",
            "margin-top": "1px",
            "box-sizing": "border-box",
            "-moz-box-sizing": "border-box",
            "-webkit-box-sizing": "border-box",
            "background-clip": "padding-box",
            "background-repeat": "no-repeat",
        });

        var slotImageContainerOverlay = $("<div>", {
            "class": "slotImageContainerOverlay",
        }).appendTo(slot);
        slotImageContainerOverlay.css({
            "position": "absolute",
            "width": "32px",
            "height": "32px",
            "top": "1",
            "left": "1",
            "box-sizing": "border-box",
            "-moz-box-sizing": "border-box",
            "-webkit-box-sizing": "border-box",
            "border": "2px solid rgba(255, 215, 0, 0.5)",
            "display": "none",
        });

        var slotTextContainer = $("<div>", {
            "class": "slotTextContainer",
        }).appendTo(slot);
        slotTextContainer.css({
            "position": "relative",
            "width": "34px",
            "height": "12px",
            "text-align": "center",
            "top": "-23px",
            "color": "white",
            "font-family": "Monospace",
        });

        slot.appendTo(this.inventoryContent);
    }
    this.inventoryContent.appendTo(this.inventory);

    var createClickSlotFunc = function(slotId, clickType, returnValue) {
        return function() {
            var message = new MessageRequestClickSlot(slotId, clickType);
            message.send(socket);
            return returnValue;
        };
    }

    // Initialize closures
    for (var i = 0; i < this.inventoryWidth * this.inventoryHeight; ++i) {
        this.HUDClosures[i] = [];
        this.HUDClosures[i][0] = createClickSlotFunc(i, InventoryClickTypes.LEFT_CLICK, true);
        this.HUDClosures[i][1] = createClickSlotFunc(i, InventoryClickTypes.RIGHT_CLICK, false);
    }

    this.inventory.appendTo("#hud");
}

InventoryHUD.prototype.update = function() {
    for (var i = 0; i < this.inventoryWidth * this.inventoryHeight; ++i) {
        var slot = document.getElementById("slot" + i);
        var slotDescriptionContainer = slot.childNodes[0];
        var slotImageContainer = slot.childNodes[1];
        var slotImageContainerOverlay = slot.childNodes[2];
        var slotTextContainer = slot.childNodes[3];

        slotImageContainerOverlay.style.backgroundImage = "";
        if (!global.playerEntity) return;
        var item = global.playerEntity.inventory.items[i];
        if (item) {
            slotImageContainer.style.width = 34;
            slotImageContainer.style.height = 34;

            var itemType = Config.itemRegister[item.id];
            InventoryHUD.putItemImage(slotImageContainer, itemType, 32, 32, itemType.texture.inventoryAngle, itemType.texture.inventoryOffset, itemType.texture.inventorySize);

            slotTextContainer.innerText = "";
            if (item.amount > 1)
                slotTextContainer.innerText = item.amount;

            slotDescriptionContainer.innerText = itemType.name;

            slotImageContainerOverlay.style.display = "none";
            if (item.equipped)
                slotImageContainerOverlay.style.display = "block";

            slot.onclick = this.HUDClosures[i][0];
            $(slot).off("contextmenu");
            $(slot).on("contextmenu", this.HUDClosures[i][1]);
        } else {
            slotImageContainer.style.backgroundImage = "";
            slotTextContainer.innerText = "";
            slotDescriptionContainer.innerText = "";
            slot.onclick = null;
        }
    }
}

InventoryHUD.putItemImage = function(container, itemType, containerWidth, containerHeight, angle, offset, scale) {
    var backgroundScale = containerWidth / Math.max(itemType.texture.spriteWidth, itemType.texture.spriteHeight);
    if (!containerWidth || !scale)
        backgroundScale = 1.0;
    if (scale)
        backgroundScale *= scale;
    var offsetWidth = (itemType.texture.offsetWidth ? itemType.texture.offsetWidth : 0);
    var sizeX = backgroundScale * (itemType.texture.spriteWidth + offsetWidth) * (itemType.texture.dimX || 1);
    var sizeY = backgroundScale * (itemType.texture.spriteHeight + offsetWidth) * (itemType.texture.dimY || 1);
    container.style.backgroundSize = sizeX.toString() + "px " + sizeY.toString() + "px ";
    var borderWidth = Math.floor(Math.max(0, containerWidth / 2 - backgroundScale * itemType.texture.spriteWidth / 2));
    var borderHeight = Math.floor(Math.max(0, containerHeight / 2 - backgroundScale * itemType.texture.spriteHeight / 2));
    container.style.borderLeftWidth = borderWidth.toString() + "px";
    container.style.borderRightWidth = borderWidth.toString() + "px";
    container.style.borderTopWidth = borderHeight.toString() + "px";
    container.style.borderBottomWidth = borderHeight.toString() + "px";
    container.style.borderStyle = "solid";
    container.style.borderColor = "rgba(0,0,0,0)";
    container.style.backgroundImage = "url('data/textures/" + itemType.texture.path + "')";
    var offset = (offset ? offset : v2.create(0, 0));
    var posX = -1 * backgroundScale * ((itemType.spriteId ? itemType.spriteId : 0) % (itemType.texture.dimX || 1)) * (itemType.texture.spriteWidth + offsetWidth) + offset[0];
    var posY = -1 * backgroundScale * (((itemType.spriteId ? itemType.spriteId : 0) / (itemType.texture.dimX || 1) >> 0) % (itemType.texture.dimY || 1)) * itemType.texture.spriteHeight + offset[1];
    container.style.backgroundPosition = posX.toString() + "px " + posY.toString() + "px";
    container.style.transform = "";
    if (angle)
        container.style.transform = "rotate(" + (angle * 180 / Math.PI) + "deg)";
}
