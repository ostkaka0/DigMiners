
class HUDLevelPicker {
    constructor() {
        this.root = $("<div>").appendTo("#hud");
        this.root.css({
            "position": "fixed",
            "left": "10px",
            "top": "60px",
            "padding": "10px",
            "z-index": "1",
        });
        this.label = $("<p>").appendTo(this.root);
        this.buttonA = $("<button>", {"text": "+20 health"}).appendTo(this.root);
        this.buttonB = $("<button>", {"text": "+5 speed"}).appendTo(this.root);

        this.buttonA.click(() => new MessageChoosePerk(global.player.perkLevel + 1, 0).send(Client.socket));
        this.buttonB.click(() => new MessageChoosePerk(global.player.perkLevel + 1, 1).send(Client.socket));

        Event.subscribe(Player.events.onPerkChange, this, (player) => this.update(player));
        this.update(global.player);
    }

    update(player) {
        if (player != global.player) return;
        var perks = LevelPerks[player.perkLevel + 1];
        if (player.perkLevel < player.level && perks) {
            this.label.text("Make a choice!");
            this.buttonA.text(perks.aText);
            this.buttonB.text(perks.bText);
            this.root.show();
        } else {
            this.root.hide();
        }
    }

    destroy() {
        Event.unsubscribeAll(Player.events);
    }
}
