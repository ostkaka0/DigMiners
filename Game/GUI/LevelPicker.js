
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


        Event.subscribe(Player.events.onLevelChange, this, (player) => this.update(player));
        this.root.hide();
        this.update(global.player);
    }

    update(player) {
        if (player != global.player) return;
        this.label.text("Level " + player.level + "!");
        this.root.show();
    }

    destroy() {
        Event.unsubscribeAll(Player.events);
    }
}
