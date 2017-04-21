
class HUDLevel {
    constructor() {
        this.root = $("<div>", { "text": ""}).appendTo("#hud");
        this.root.css({
            "position": "fixed",
            "left": "10px",
            "top": "10px",
            "padding": "10px",
            "z-index": "1",
        });
        Event.subscribe(Player.events.onXPChange, this, (player) => this.update(player));
        this.update(Client.player);
    }

    update(player) {
        if (player != Client.player) return;
        this.root.text("Level " + player.level + " - xp: " + player.xp + " / " + player.getRequiredXP());
    }

    destroy() {
        Event.unsubscribeAll(Player.events);
    }
}
