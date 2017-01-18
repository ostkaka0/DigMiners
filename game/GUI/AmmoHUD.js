
AmmoHUD = function() {

    this.root = $("<div>", { "text": "test text" });
    this.root.css({
        "position": "fixed",
        "width": "150px",
        "height": "150px",
        "background-color": "green",
        "right": "10px",
        "bottom": "10px",
        "z-index": "1",
    });

    return this.root;
}
