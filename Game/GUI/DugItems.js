


var DugItems = function() {
    this.dugItems = $("<div>");
    this.dugItems.css({
        "position": "fixed",
        "right": "70px",
        "top": "100px",
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
    });

    for (var i = 0; i < global.gameData.tileRegister.length; ++i) {
        var tileType = global.gameData.tileRegister[i];
        if (tileType.isOre) {
            var dugItemsEntry = $("<div>", {
                "class": "dugItemsEntry",
                "id": "entry" + i,
            }).appendTo(this.dugItems);
            dugItemsEntry.css({
                "position": "relative",
                "height": "32px",
                "margin-top": "10px",
            });

            var dugItemsEntryImage = $("<div>", {
                "class": "dugItemsEntryImage",
            }).appendTo(dugItemsEntry);
            dugItemsEntryImage.css({
                "position": "relative",
                "width": "32px",
                "height": "32px",
                "float": "left",
                "margin-left": "10px",
                "margin-right": "52px",
                "background-repeat": "no-repeat",
                "background-image": "url('data/textures/tiles/" + tileType.name + ".png')",
                "margin-top": "10px",
            });
            dugItemsEntryImage.mouseenter(function() {
                var text = $(this).parent().find('.dugItemsEntryText');
                var id = $(this).parent().attr("id").substr($(this).parent().attr("id").length - 1);
                var tileType = global.gameData.tileRegister[id];
                text.text(tileType.name);
            }).mouseleave(function() {
                global.gameData.HUD.update();
            });

            var dugItemsEntryText = $("<div>", {
                "class": "dugItemsEntryText",
                "text": "0.0",
            }).appendTo(dugItemsEntry);
            dugItemsEntryText.css({
                "position": "fixed",
                "height": "12px",
                "float": "left",
                "margin-top": "10px",
                "margin-left": "52px",
                "margin-right": "10px",
                "text-align": "center",
                "color": "white",
                "font-family": "Monospace",
                "max-width": "20px",
            });
        }
    }

    var dugItemsFooter = $("<div>", {
        "class": "dugItemsFooter",
    }).appendTo(this.dugItems);
    dugItemsFooter.css({
        "position": "relative",
        "height": "10px",
    });

    this.dugItems.appendTo("#hud");
}
global.DugItems = DugItems;

DugItems.prototype.update = function() {
    for (var i = 0; i < global.gameData.tileRegister.length; ++i) {
        var tileType = global.gameData.tileRegister[i];
        if (!tileType.isOre) continue;
        var amount = 0;
        if (global.player.oreInventory[i])
            amount = global.player.oreInventory[i];
        var dugItemsEntry = document.getElementById("entry" + i);
        var dugItemsEntryText = dugItemsEntry.childNodes[1];
        dugItemsEntryText.innerText = parseFloat(Math.floor((amount / 256.0) * 10) / 10).toFixed(1);
    }
}
