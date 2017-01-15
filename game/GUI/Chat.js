
Chat = function() {
    this.root = $("<div>", {
    });
    this.root.css({
        "position": "absolute",
        "width": "200px",
        "height": "400px",
        "left": "5px",
        "bottom": "5px",
        "z-index": "1",
        "padding": "0",
        "background-color": "rgba(64, 64, 64, 0.7)",
        "border-radius": "5px",
        "border": "solid 2px",
    });

    this.textOutput = $("<div>", {
    }).appendTo(this.root);
    this.textOutput.css({
        "position": "relative",
        "width": "calc(100% - 10px)",
        "height": "90%",
        "margin-top": "5px",
        "margin-left": "auto",
        "margin-right": "auto",
        "background-color": "rgba(255, 255, 255, 0.8)",
        "border-radius": "2px",
        "text-align": "left",

    });

    this.textOutputTextContainer = $("<div>", {
    }).appendTo(this.textOutput);
    this.textOutputTextContainer.css({
        "position": "relative",
        "width": "calc(100% - 10px)",
        "height": "calc(100% - 10px)",
        "margin-left": "auto",
        "margin-right": "auto",
        "top": "5px",
        "font-size": "12px",
        "line-height": "12px",
        "overflow-y": "scroll"
    });

    this.row = $("<div>", {
    }).appendTo(this.root);
    this.row.css({
        "position": "relative",
        "width": "calc(100% - 10px)",
        "height": "calc(10% - 15px)",
        "margin-top": "5px",
        "margin-left": "auto",
        "margin-right": "auto",
    });

    this.textInput = $("<div>", {
    }).appendTo(this.row);
    this.textInput.css({
        "position": "relative",
        "width": "70%",
        "height": "100%",
        "float": "left",
        "background-color": "red",
    });

    this.textInputInput = $("<input>", {
        "type": "text"
    }).appendTo(this.textInput);
    this.textInputInput.css({
        "position": "relative",
        "width": "100%",
        "height": "calc(100% - 6px)",
    });
    this.textInputInput.on('keypress', function(e) {
        if (e.which == 13)
            this.sendButton.trigger("click");
    }.bind(this));

    this.sendButton = $("<button>", {
        "text": "Send"
    }).appendTo(this.row);
    this.sendButton.css({
        "position": "relative",
        "width": "calc(30% - 6px)",
        "height": "100%",
        "float": "left",
        "padding": "0",
        "border": "0",
        "margin-left": "6px",
        "border-radius": "2px",
    });
    this.sendButton.click(function() {
        if (this.textInputInput.val().length > 0) {
            socket.emit("chat", this.textInputInput.val());
            this.textInputInput.val("");
        }
    }.bind(this));

    socket.on("chat", function(text) {
        this.write(text);
    }.bind(this));

    $("*").on('keypress', function(e) {
        if (e.which == 13) {
            if (!this.textInputInput.is(":focus"))
                this.textInputInput.focus();
        }
    }.bind(this));

    return this.root;
}

Chat.prototype.write = function(text) {
    var p = $("<p>", {
        "text": text
    }).appendTo(this.textOutputTextContainer);

    setTimeout(function() {
        this.textOutputTextContainer.animate({
            scrollTop: this.textOutputTextContainer.prop("scrollHeight")
        }, 500);
    }.bind(this), 50);
}