
LoadingScreen = function() {

    this.root = $("<div>").appendTo("body");
    this.root.css({
        "z-index": "1",
    });

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
        "class": "window"
    }).appendTo(this.root);
    this.divWindow.css({
        "position": "fixed",
        "width": "70%",
        "height": "24px",
        "left": "50%",
        "top": "50%",
        "margin-left": "-35%",
        "margin-top": (-24 / 2) + "px",
        "z-index": "1",
        "padding": "0px",
    });

    this.progress = $("<div>", {
        "class": "progress",
    }).appendTo(this.divWindow);

    this.progressbar = $("<div>", {
        "class": "progress-bar bg-success",
        "role": "progressbar",
        "aria-valuenow": "70",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
    }).appendTo(this.progress);
    this.progressbar.css({
        "position": "absolute",
        "width": "10%",
    })

    this.resize = function(percentage) {
        this.progressbar.css({ "width": (percentage + "%") });
        this.progressbar.text(percentage + "%");
    }.bind(this);

    this.root.hide();

    gameData.world.events.on("texturesBeginLoading", function() {
        this.root.show();
    }.bind(this));

    gameData.world.events.on("texturesLoadProgress", function(name, file, progress) {
        this.resize(progress);
    }.bind(this));

    gameData.world.events.on("texturesLoaded", function(textures) {
        this.root.hide();
    }.bind(this));
}