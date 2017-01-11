
DeathScreen = function() {
    this.width = 320;
    this.height = 200;

    this.root = $("<div>").appendTo("body");
    this.root.css({ "z-index": "1", });

    this.divBackground = $("<div>").appendTo(this.root);
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

    this.divWindow = $("<div>", {
        "class": "card col-12"
    }).appendTo(this.root);
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

    this.inputHolder = $("<div>", {
        "class": "form-group row",
    }).appendTo(this.divWindow);
    this.inputHolder.css({
        "margin-top": "10px",
    });
    this.inputLabel = $("<label>", {
        "for": "input",
        "class": "col-4 col-form-label",
        "text": "Username: ",
    }).appendTo(this.inputHolder);
    this.inputUsername = $("<input>", {
        "id": "input",
        "type": "text",
        "class": "col-7 form-control",
        "value": "bertil",
    }).appendTo(this.inputHolder);

    this.checkboxHolder = $("<div>", {
        "class": "btn-group",
        "data-toggle": "buttons",
    }).appendTo(this.divWindow);

    this.buttonLabel1 = $("<label>", {
        "class": "btn btn-primary active",
        "text": "Class 1",
    }).appendTo(this.checkboxHolder);
    this.button1Input = $("<input>", {
        "type": "radio",
        "name": "classes",
        "id": "class1",
        "checked": "true"
    }).appendTo(this.buttonLabel1);
    this.buttonLabel1.css({ "width": "33%", });

    this.buttonLabel2 = $("<label>", {
        "class": "btn btn-primary",
        "text": "Class 2",
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
    }).appendTo(this.checkboxHolder);
    this.button3Input = $("<input>", {
        "type": "radio",
        "name": "classes",
        "id": "class3",
    }).appendTo(this.buttonLabel3);
    this.buttonLabel3.css({ "width": "33%", });



    this.btnHolder = $("<div>", {
        "class": "card-block",
        "width": "160px",
        "height": "40px",
    }).appendTo(this.divWindow);
    this.btnHolder.css({
        "margin-left": "auto",
        "margin-right": "auto",
    });
    this.btnSpawn = $("<button>", {
        "type": "button",
        "class": "btn btn-success",
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
        new MessageRequestSpawn(this.inputUsername.val()).send(socket);
    }.bind(this));

    gameData.events.on("ownPlayerSpawned", function(entity) {
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
