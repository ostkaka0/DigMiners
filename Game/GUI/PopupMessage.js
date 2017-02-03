import $ from "jquery";

var PopupMessage = function(text, timeout) {
    this.timeout = timeout;
    this.outer = $("<div>", {
        "id": "popup",
    });
    this.outer.css({
        "position": "absolute",
        "width": "auto",
        "left": "50%",
        "top": "25px",
        "display": "none",
    });

    this.inner = $("<div>", {
        "text": text
    }).appendTo(this.outer);
    this.inner.css({
        "position": "relative",
        "width": "auto",
        "height": "30px",
        "left": "-50%",
        "z-index": "1",
        //"background-color": "rgba(0, 0, 0, 0.5)",
        "border-radius": "5px",
        "padding-left": "10px",
        "padding-right": "10px",
        "padding-top": "5px",
        "padding-bottom": "5px",
        "color": "white",
        "fontFamily": "Monospace",
        "font-size": "24px",
        "line-height": "24px",
        "text-shadow": "1px 1px 8px #000000",
    });
}

PopupMessage.prototype.show = function() {
    var toRemove = $("#popup");
    if (toRemove)
        toRemove.remove();
    this.outer.fadeIn(0);
    this.outer.appendTo($("#hud"));
    setTimeout(function() {
        var fadeTime = 400;
        this.outer.fadeOut(fadeTime);
        setTimeout(function() {
            this.outer.remove();
        }.bind(this), fadeTime);
    }.bind(this), this.timeout);
}
export default PopupMessage
