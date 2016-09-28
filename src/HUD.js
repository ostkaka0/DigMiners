
updateHUD = function(gameData) {
    var inventory = document.getElementById("inventory");
    inventory.innerHTML = '<div class="inventoryHeader">Your amazing empty inventory</div>';
    var inventoryContent = document.createElement("div");
    inventoryContent.setAttribute("class", "inventoryContent");
    for(var i = 0; i < 64; ++i) {
        var slot = document.createElement("div");
        slot.setAttribute("class", "inventorySlot");
        inventoryContent.appendChild(slot);
    }
    inventory.appendChild(inventoryContent);
    //var text = new PIXI.Text('12352135235', { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center' });
    //text.position.x = 10;
    //text.position.y = 10;
    //stage.addChild(text);
}