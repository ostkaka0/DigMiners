import Event from "Engine/Core/Event.js";
import EntityAmmo from "Engine/Entity/Ammo.js";
import EntityEquippedItems from "Engine/Entity/EquippedItems.js";

export default function() {
    this.root = $("<div>", { "text": "No weapon equipped" });
    this.root.css({
        "position": "fixed",
        "background-color": "rgba(64, 64, 64, 0.5)",
        "right": "10px",
        "bottom": "10px",
        "padding": "10px",
        "z-index": "1",
        "color": "white",
    });
    this.root.appendTo("#hud");

    this.updateFunction = function(entity, itemType) {
        if (entity && entity.id == global.playerEntityId) {
            var item = entity.inventory.getEquippedItem("tool");
            if (item && (!itemType || itemType.typeOfType == "rangedWeapon"))
                this.root.text(item.name + " ammo: " + item.magazine + " / " + ((entity.ammo != undefined) ? entity.ammo[item.id] : -1));
            else
                this.root.text("No weapon equipped");
        }
    }

    Event.subscribe(EntityAmmo.Events.onChange, this, function(entity) {
        if (entity && entity.id == global.playerEntityId)
            this.updateFunction(entity, null)
    }.bind(this));

    global.gameData.world.events.on("beginReload", function(entity) {
        if (entity && entity.id == global.playerEntityId)
            this.root.text("Reloading...");
    }.bind(this));

    global.gameData.world.events.on("finishReload", function(entity, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));

    Event.subscribe(EntityEquippedItems.Events.onEquip, this, function(entity, stackId, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));

    Event.subscribe(EntityEquippedItems.Events.onDequip, this, function(entity, stackId, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));

    global.gameData.world.events.on("bulletFired", function(entity, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));
}
