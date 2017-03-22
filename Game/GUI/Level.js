
class HUDLevel {
    constructor() {
        this.root = $("<div>", { "text": "" });
        this.root.css({
            "position": "fixed",
            "background-color": "rgba(64, 64, 64, 0.5)",
            "left": "10px",
            "top": "10px",
            "padding": "10px",
            "z-index": "1",
            "color": "white",
        });
        this.root.appendTo("#hud");
        Event.subscribe(Player.events.onXPChange, this, (player) => this.update(player));
        this.update(global.player);
    }

    update(player) {
        if (player != global.player) return;
        this.root.text("Level " + player.level + " - xp: " + player.xp + " / " + player.getRequiredXP());
    }

    destroy() {
        Event.unsubscribeAll(Player.events);
    }
}
