var $ = require("jquery")

var Event = require("engine/Core/Event.js")

var Global = require("game/Global.js")
var Ammo = require("game/Entity/Ammo.js")

module.exports = function() {
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

    Event.subscribe(Ammo.Events.onChange, this, function(entity) {
        if (entity && entity.id == global.playerEntityId)
            this.updateFunction(entity, null)
    }.bind(this));

    Global.gameData.world.events.on("beginReload", function(entity) {
        if (entity && entity.id == global.playerEntityId)
            this.root.text("Reloading...");
    }.bind(this));

    Global.gameData.world.events.on("finishReload", function(entity, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));

    Global.gameData.world.events.on("equip", function(entity, stackId, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));

    Global.gameData.world.events.on("dequip", function(entity, stackId, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));

    Global.gameData.world.events.on("bulletFired", function(entity, itemType) {
        this.updateFunction(entity, itemType);
    }.bind(this));
}
