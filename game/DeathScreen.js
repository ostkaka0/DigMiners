
DeathScreen = function() {
    this.width = 320;
    this.height = 480;
    this.root = $("<div>").appendTo("body");
    this.divBackground = $("<div>").appendTo(this.root);
    this.divWindow = $("<div>", {"class": "window"}).appendTo(this.root);
    this.inputName = $("<input><br/><br/>", {"type": "input", "value": "bertil"}).appendTo(this.divWindow);
    this.btnSpawn = $("<button>", {
        "class": "button",
        "width": "128px",
        "height": "40px",
        "text": "Spawn!",
    }).appendTo(this.divWindow);
    
    this.root.css({ "z-index": "1", });
    this.divBackground.css({
        "position": "absolute",
        "width": "100%",
        "height": "100%",
        "top": "0px",
        "left": "0px",
        "background-color": "#000000",
        "opacity": "0.5",
        "z-index": "1", 
    });
    this.divWindow.css({
        "position": "fixed",
        "width": this.width + "px",
        "height": this.height + "px",
        "left": "50%",
        "top": "50%",
        "margin-left": (-this.width / 2) + "px",
        "margin-top": (-this.height / 2) + "px",
        "z-index": "1", 
    });
    
    this.btnSpawn.setDisabledCountdown = function(duration) {
        if (duration <= 0) {
            this.btnSpawn.prop("disabled", false);
            this.btnSpawn.text("Spawn!");
        } else {
            this.btnSpawn.prop("disabled", true);
            this.btnSpawn.text("Wait - " + duration);
            setTimeout(this.btnSpawn.setDisabledCountdown.bind(this, duration - 1), 1000);
        }
    }.bind(this);
    
    this.btnSpawn.click(function(event) {
        new MessageRequestSpawn(this.inputName.val()).send(socket);
    }.bind(this));
    
    gameData.entityWorld.onAdd.push(function(entity) {
        if (entity.id == global.playerEntityId)
            this.root.hide();
    }.bind(this));
    
    gameData.events.on("entityDeath", function(entity) {
        if (!entity.controlledByPlayer) return;
        if (entity.controlledByPlayer.playerId != global.player.id) return;
        
        this.root.show();
        this.btnSpawn.setDisabledCountdown(gameData.respawnTime);
    }.bind(this));
    
    this.btnSpawn.setDisabledCountdown(gameData.respawnTime)
}
