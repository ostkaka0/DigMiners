
TextSprite = function(text, font, fontSize, color) {
    this.text = text;
    this.font = font;
    this.fontSize = fontSize;
    this.color = color;

    this.visible = true;

    this.pos = [0, 0];
    this.scale = [1.0, 1.0];
    this.alpha = 1.0;
}

TextSprite.prototype.getSize = function() {
    if (this.frame)
        return [this.frame[2], this.frame[3]];
    return [this.texture.width, this.texture.height];
}

TextSprite.prototype.begin = function(context) {
    context.translate(this.pos[0], this.pos[1]);
    context.scale(this.scale[0], this.scale[1]);
    context.globalAlpha = this.alpha;
}

TextSprite.prototype.draw = function(context) {
    this.begin(context);
    context.font = this.fontSize + "px " + this.font;
    context.fillStyle = this.color;
    context.textAlign = "center";
    context.fillText(this.text, 0, 0);
    this.end(context);
}

TextSprite.prototype.end = function(context) {
    context.globalAlpha = 1.0;
    context.setTransform(1, 0, 0, 1, 0, 0);
}