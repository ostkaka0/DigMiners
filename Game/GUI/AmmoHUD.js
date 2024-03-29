
var AmmoHUD = function() {
    this.root = $("<div>");
    this.root.css({
        "position": "fixed",
        "right": "10px",
        "bottom": "10px",
        "padding": "10px",
        "z-index": "1",
        "display": "none",
    });
    this.root.appendTo("#hud");

    this.updateFunction = function(entity, itemType) {
        if (entity && entity.id == Client.playerEntityId) {
            var item = entity.inventory.getEquippedItem("tool");
            if (item && (!itemType || itemType.typeOfType == "rangedWeapon")) {
                this.root.text(item.name + " ammo: " + item.magazine + " / " + ((entity.ammo != undefined) ? entity.ammo[item.id] : -1));
                this.root.show();
            } else
                this.root.hide();
        }
    }

    EntityAmmo.Events.onChange.set(this, function(entity) {
        if (entity && entity.id == Client.playerEntityId)
            this.updateFunction(entity, null)
    }.bind(this));

    Event.subscribe(WorldEvents.onInit, this, () => {
        World.events.on("beginReload", (entity) => {
            if (entity && entity.id == Client.playerEntityId)
                this.root.text("Reloading...");
        });

        World.events.on("finishReload", function(entity, itemType) {
            this.updateFunction(entity, itemType);
        }.bind(this));

        World.events.on("bulletFired", function(entity, itemType) {
            this.updateFunction(entity, itemType);
        }.bind(this));

        EntityEquippedItems.Events.onEquip.set(this, function(entity, stackId, itemType) {
            this.updateFunction(entity, itemType);
        }.bind(this));

        EntityEquippedItems.Events.onDequip.set(this, function(entity, stackId, itemType) {
            this.updateFunction(entity, itemType);
        }.bind(this));
    });
}
