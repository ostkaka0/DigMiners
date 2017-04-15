
class HUDSkills {
    constructor() {
        this.root = $("<div>").appendTo("#hud");
        this.root.css({
            "position": "fixed",
            "left": "10px",
            "top": "120px",
            "padding": "10px",
            "z-index": "1",
            "width": "352px",
        });
        this.label = $("<p>").appendTo(this.root);
        this.bars = [];
        this.innerBars = [];
        this.buttons = [];
        for (var i = 0; i < PlayerSkillRegister.length; i++) {
            var label = $("<p>", { "text": PlayerSkillRegister[i].name }).appendTo(this.root);
            var bar = $("<div>").appendTo(this.root);
            var innerBar = $("<div>").appendTo(bar);
            var button = $("<div>", { "text": "+" }).appendTo(this.root);
            label.css({ "font-size": "12px", "margin": "0", "padding": "0" })
            bar.css({ "background-color": "rgba(0, 0, 0, 0.25)", "width": "320px", "height": "8px", "float": "left", "margin-top": "8px", "margin-bottom": "12px"});
            innerBar.css({ "background-color": "#AAA", "width": "0%", "height": "8px" });
            button.css({ "background-color": "rgba(0, 0, 0, 0)", "width": "32px", "height": "12px", "float": "left", "margin-bottom": "0px"});

            // Closure to pass i by value
            ((i) => button.click(() => new MessageChooseSkill(i).send(Client.socket)))(i);

            this.bars[i] = bar;
            this.innerBars[i] = innerBar
            this.buttons[i] = button;
        }

        Event.subscribe(Player.events.onSkillChange, this, (player) => this.update(player));
        this.update(global.player);
    }

    update(player) {
        if (player != global.player) return;
        if (player.skillPoints >= 1) {
            this.root.show();
            for (var i = 0; i < PlayerSkillRegister.length; i++) {
                this.innerBars[i].css({ "width": player.skillLevels[i] / 10 * 100 + "%" })
            }
        } else {
            this.root.hide();
        }
    }

    destroy() {
        Event.unsubscribeAll(Player.events);
    }
}
