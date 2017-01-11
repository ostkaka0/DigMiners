
DeathScreen = function() {
    this.width = 320;
    this.height = 80;
    this.root = $("<div>").appendTo("body");
    this.divBackground = $("<div>").appendTo(this.root);
    this.divWindow = $("<div>", { "class": "window" }).appendTo(this.root);

    this.inputNameHolder = $("<div>", {
        "width": "160px",
        "height": "40px",
    }).appendTo(this.divWindow);
    this.inputNameHolder.css({
        "margin-left": "auto",
        "margin-right": "auto",
    });
    this.inputName = $("<input>", {
        "type": "input",
        "value": "bertil",
    }).appendTo(this.inputHolder);

    this.checkboxHolder = $("<div>", {
        "class": "btn-group",
        "data-toggle": "buttons",
    }).appendTo(this.divWindow);

    this.buttonLabel1 = $("<label>", {
        "class": "btn btn-primary active",
        "text": "Class 1",
        "classnumber": 1
    }).appendTo(this.checkboxHolder);
    this.button1Input = $("<input>", {
        "type": "radio",
        "name": "classes",
        "id": "class1",
    }).appendTo(this.buttonLabel1);
    this.buttonLabel1.css({ "width": "33%", });

    this.buttonLabel2 = $("<label>", {
        "class": "btn btn-primary",
        "text": "Class 2",
        "classnumber": 2
    }).appendTo(this.checkboxHolder);
    this.button2Input = $("<input>", {
        "type": "radio",
        "name": "classes",
        "id": "class2",
    }).appendTo(this.buttonLabel2);
    this.buttonLabel2.css({ "width": "33%", });

    this.buttonLabel3 = $("<label>", {
        "class": "btn btn-primary",
        "text": "Class 3",
        "classnumber": 3
    }).appendTo(this.checkboxHolder);
    this.button3Input = $("<input>", {
        "type": "radio",
        "name": "classes",
        "id": "class3",
    }).appendTo(this.buttonLabel3);
    this.buttonLabel3.css({ "width": "33%", });

    this.btnHolder = $("<div>", {
        "width": "128px",
        "height": "40px",
    }).appendTo(this.divWindow);
    this.btnHolder.css({
        "margin-left": "auto",
        "margin-right": "auto",
    });
    this.btnSpawn = $("<button>", {
        "class": "button",
        "text": "Spawn!",
    }).appendTo(this.btnHolder);
    this.btnSpawn.css({
        "width": "100%",
        "height": "100%",
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
        new MessageRequestSpawn(this.inputName.val(), 3 * Math.random() >> 0).send(socket);
    }.bind(this));

    gameData.entityWorld.onAdd["DeathScreen.js"] = function(entity) {
        if (entity.id == global.playerEntityId)
            this.root.hide();
    }.bind(this);

    gameData.events.on("entityDeath", function(entity) {
        if (!entity.controlledByPlayer) return;
        if (entity.controlledByPlayer.playerId != global.player.id) return;

        this.root.show();
        this.btnSpawn.setDisabledCountdown(gameData.respawnTime);
    }.bind(this));

    this.btnSpawn.setDisabledCountdown(gameData.respawnTime)
}

DeathScreen.prototype.getClass = function() {
    var pickedClass = 1;
    var button = this.checkboxHolder.find(".active");
    if (button)
        pickedClass = button.attr("classnumber");
    return pickedClass;
}
