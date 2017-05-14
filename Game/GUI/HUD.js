
var HUD = function() {
    // Stop scroll to bottom when spacebar is used
    /*$('*').keydown(function(e) {
        if (e.keyCode == 32)
            e.preventDefault();
    });*/

    $('*').contextmenu(function(e) {
        e.preventDefault();
    });

    Event.subscribe(CommandEntityInventory.Events.onInventoryChange, this, function(entity) {
        if (Client.playerEntity && Client.playerEntity.id == entity.id) {
            this.update();
        }
    }.bind(this));

    Event.trigger(HUD.Events.onInit, this);

    $('.hud').show();
}
HUD.Events = { onInit: new Map() };

HUD.prototype.update = function() {
    // update inventory
    if (this.inventory)
        this.inventory.update();

    // update dugItems
    if (this.dugItems)
        this.dugItems.update();
}

HUD.putItemImage = function(container, itemType, containerWidth, containerHeight, angle, offset, scale) {
    var backgroundScale = containerWidth / Math.max(itemType.texture.spriteWidth, itemType.texture.spriteHeight);
    if (!containerWidth || !scale)
        backgroundScale = 1.0;
    if (scale)
        backgroundScale *= scale;
    var offsetWidth = (itemType.texture.offsetWidth ? itemType.texture.offsetWidth : 0);
    var sizeX = backgroundScale * (itemType.texture.spriteWidth + offsetWidth) * (itemType.texture.dimX || 1);
    var sizeY = backgroundScale * (itemType.texture.spriteHeight + offsetWidth) * (itemType.texture.dimY || 1);
    var borderWidth = Math.floor(Math.max(0, containerWidth / 2 - backgroundScale * itemType.texture.spriteWidth / 2));
    var borderHeight = Math.floor(Math.max(0, containerHeight / 2 - backgroundScale * itemType.texture.spriteHeight / 2));
    var offset = (offset ? offset : v2.create(0, 0));
    var posX = -1 * backgroundScale * ((itemType.spriteId ? itemType.spriteId : 0) % (itemType.texture.dimX || 1)) * (itemType.texture.spriteWidth + offsetWidth) + offset[0];
    var posY = -1 * backgroundScale * (((itemType.spriteId ? itemType.spriteId : 0) / (itemType.texture.dimX || 1) >> 0) % (itemType.texture.dimY || 1)) * itemType.texture.spriteHeight + offset[1];

    $(container).css({
        "background-size": sizeX.toString() + "px " + sizeY.toString() + "px ",
        "border-left-width": borderWidth.toString() + "px",
        "border-right-width": borderWidth.toString() + "px",
        "border-top-width": borderHeight.toString() + "px",
        "border-bottom-width": borderHeight.toString() + "px",
        "border-style": "solid",
        "border-color": "rgba(0,0,0,0)",
        "background-image": "url('data/textures/" + itemType.texture.path + "')",
        "background-position": posX.toString() + "px " + posY.toString() + "px",
        "transform": (angle ? "rotate(" + (angle * 180 / Math.PI) + "deg)" : "none"),
    });
}

