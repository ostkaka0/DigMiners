
InventoryHUD = function() {
    /*this.dugItems = $("<div>");
    this.dugItems.css({
        "position": "fixed",
        "right": "70px",
        "top": "100px",
        "background-color": "rgba(64, 64, 64, 0.5)",
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
    });


    this.dugItems.appendTo("#hud");*/

    this.inventoryWidth = 10;
    this.inventoryHeight = 1;
    this.HUDClosures = [];

    // create inventory
    var inventory = document.getElementById("inventory");
    inventory.style.width = this.inventoryWidth * 34;
    inventory.style.height = 22 + this.inventoryHeight * 34;
    $(inventory).click(function(e) {
        e.stopPropagation();
    });
    inventory.innerHTML = '<div class="inventoryHeader">Your amazing inventory</div>';
    var inventoryContent = document.createElement("div");
    inventoryContent.setAttribute("class", "inventoryContent");
    for (var i = 0; i < this.inventoryWidth * this.inventoryHeight; ++i) {
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
        slot.appendChild(slotImageContainer);

        var slotImageContainerOverlay = document.createElement("div");
        slotImageContainerOverlay.setAttribute("class", "slotImageContainerOverlay");
        slot.appendChild(slotImageContainerOverlay);

        var slotTextContainer = document.createElement("div");
        slotTextContainer.setAttribute("class", "slotTextContainer");
        slot.appendChild(slotTextContainer);

        inventoryContent.appendChild(slot);
    }
    inventory.appendChild(inventoryContent);

    // Slot item name text visible on mouse hover
    $('.inventorySlot').mouseenter(function() {
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
