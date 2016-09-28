
updateHUD = function(gameData) {
    var inventory = document.getElementById("inventory");
    inventory.innerHTML = '<div class="inventoryHeader">Your amazing inventory</div>';
    var inventoryContent = document.createElement("div");
    inventoryContent.setAttribute("class", "inventoryContent");
    for(var i = 0; i < 64; ++i) {
        var slot = document.createElement("div");
        slot.setAttribute("class", "inventorySlot");

        var slotContainer = document.createElement("div");
        slotContainer.setAttribute("class", "slotContainer");
        slotContainer.style.backgroundRepeat = "no-repeat";

        if(player.inventory.items[i]) {
            var item = player.inventory.items[i];
            var name = item.name;
            var itemType = gameData.itemRegister.getById(item.id);
            if(itemType.texture)
                slotContainer.style.backgroundImage = "url('data/textures/" + itemType.texture + ".png')";
            else slotContainer.innerText = item.amount + " " + name;
            //slotContainer.innerText = Math.round((amount / 256.0) * 10) / 10 + " " + name;
        }

        slot.appendChild(slotContainer);
        inventoryContent.appendChild(slot);
    }
    inventory.appendChild(inventoryContent);
    //var text = new PIXI.Text('12352135235', { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center' });
    //text.position.x = 10;
    //text.position.y = 10;
    //stage.addChild(text);
}