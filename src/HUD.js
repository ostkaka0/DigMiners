
updateHUD = function(gameData) {
    var inventory = document.getElementById("inventory");
    inventory.innerHTML = '<div class="inventoryHeader">Your amazing inventory</div>';
    var inventoryContent = document.createElement("div");
    inventoryContent.setAttribute("class", "inventoryContent");
    for(var i = 0; i < 64; ++i) {
        var slot = document.createElement("div");
        slot.setAttribute("class", "inventorySlot");

        var slotImageContainer = document.createElement("div");
        slotImageContainer.setAttribute("class", "slotImageContainer");
        slotImageContainer.style.backgroundRepeat = "no-repeat";

        var slotTextContainer = document.createElement("div");
        slotTextContainer.setAttribute("class", "slotTextContainer");

        if(player.inventory.items[i]) {
            slotImageContainer.style.borderStyle = "solid";
            slotImageContainer.style.borderWidth = "1px";
            var item = player.inventory.items[i];
            var itemType = gameData.itemRegister.getById(item.id);
            if(itemType.texture)
                slotImageContainer.style.backgroundImage = "url('data/textures/" + itemType.texture + ".png')";
            slotTextContainer.innerText = Math.round((item.amount / 256.0) * 10) / 10;
        }

        slot.appendChild(slotImageContainer);
        slot.appendChild(slotTextContainer);
        inventoryContent.appendChild(slot);
    }
    inventory.appendChild(inventoryContent);
    //var text = new PIXI.Text('12352135235', { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center' });
    //text.position.x = 10;
    //text.position.y = 10;
    //stage.addChild(text);
}